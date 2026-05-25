// Rehype plugin: append a copy button to every <pre> block, and add `has-copy` class.
// The button is a static <button> with an inline icon; the click handler is wired
// via the global script in BaseLayout.

import { visit } from 'unist-util-visit';

export default function rehypeCopyButton() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre') return;
      // Avoid double-wrapping if re-run
      const cls = (node.properties?.className ?? []);
      const classList = Array.isArray(cls) ? cls : [cls];
      if (classList.includes('has-copy')) return;
      classList.push('has-copy');
      node.properties = { ...(node.properties ?? {}), className: classList };

      node.children.push({
        type: 'element',
        tagName: 'button',
        properties: {
          class: 'copy',
          type: 'button',
          'aria-label': 'Copy code',
          title: 'Copy',
        },
        children: [
          // SVG icon (clipboard) - swapped via JS when copied
          {
            type: 'element',
            tagName: 'svg',
            properties: {
              xmlns: 'http://www.w3.org/2000/svg',
              width: 14, height: 14, viewBox: '0 0 24 24',
              fill: 'none', stroke: 'currentColor',
              'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
              'aria-hidden': 'true',
            },
            children: [
              { type: 'element', tagName: 'rect', properties: { x: 9, y: 9, width: 13, height: 13, rx: 2, ry: 2 }, children: [] },
              { type: 'element', tagName: 'path', properties: { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }, children: [] },
            ],
          },
        ],
      });
    });
  };
}
