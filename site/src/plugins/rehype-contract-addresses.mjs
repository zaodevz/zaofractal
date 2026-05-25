// Rehype plugin: detect Ethereum/EVM 0x... addresses in text nodes and wrap them
// in an anchor pointing to Optimistic Etherscan with copy + chain badge.
//
// Adds class "contract-address" so the global stylesheet can style the link.
// Excludes any addresses already inside an <a> tag (don't double-wrap).

import { visit, SKIP } from 'unist-util-visit';

const ADDR_RE = /(0x[a-fA-F0-9]{40})/g;

// Known ZAO contract metadata - drives the chain badge + tooltip label.
const KNOWN = new Map([
  ['0xcB05F9254765CA521F7698e61E0A6CA6456Be532'.toLowerCase(), { label: 'OREC', chain: 'optimism' }],
  ['0x34cE89baA7E4a4B00E17F7E4C0cb97105C216957'.toLowerCase(), { label: 'OG Respect', chain: 'optimism' }],
  ['0x9885CCeEf7E8371Bf8d6f2413723D25917E7445c'.toLowerCase(), { label: 'ZOR Respect', chain: 'optimism' }],
  ['0x3bc1A0Ad72417f2d411118085256fC53CBdDd137'.toLowerCase(), { label: 'ZAO', chain: 'optimism' }],
]);

function explorerUrl(chain, address) {
  if (chain === 'base') return `https://basescan.org/address/${address}`;
  return `https://optimistic.etherscan.io/address/${address}`;
}

export default function rehypeContractAddresses() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;
      // Skip if inside an <a>, <code> with parent <pre>, or already a contract-address span
      if (parent.type === 'element' && parent.tagName === 'a') return;
      const value = node.value;
      if (!value || !ADDR_RE.test(value)) return;
      ADDR_RE.lastIndex = 0;

      const segments = [];
      let lastIndex = 0;
      let match;
      while ((match = ADDR_RE.exec(value)) !== null) {
        const [addr] = match;
        const start = match.index;
        if (start > lastIndex) {
          segments.push({ type: 'text', value: value.slice(lastIndex, start) });
        }
        const meta = KNOWN.get(addr.toLowerCase());
        const chain = meta?.chain ?? 'optimism';
        const label = meta?.label;
        const url = explorerUrl(chain, addr);
        const short = `${addr.slice(0, 6)}…${addr.slice(-4)}`;
        segments.push({
          type: 'element',
          tagName: 'a',
          properties: {
            href: url,
            class: 'contract-address',
            'data-address': addr,
            'data-chain': chain,
            target: '_blank',
            rel: 'noopener noreferrer',
            title: label ? `${label} - ${addr}` : addr,
          },
          children: [
            label
              ? {
                  type: 'element',
                  tagName: 'span',
                  properties: { class: 'ca-label' },
                  children: [{ type: 'text', value: label }],
                }
              : null,
            {
              type: 'element',
              tagName: 'code',
              properties: { class: 'ca-addr' },
              children: [{ type: 'text', value: short }],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: { class: 'ca-badge' },
              children: [{ type: 'text', value: chain }],
            },
          ].filter(Boolean),
        });
        lastIndex = start + addr.length;
      }
      if (lastIndex < value.length) {
        segments.push({ type: 'text', value: value.slice(lastIndex) });
      }
      parent.children.splice(index, 1, ...segments);
      return [SKIP, index + segments.length];
    });
  };
}
