import React from 'react';
import { shortAddr } from '../lib/format';

interface Props {
  wallet: string | null;
  onConnect: (addr: string) => void;
  onDisconnect: () => void;
}

export default function Topbar({ wallet, onConnect, onDisconnect }: Props) {
  const handleConnect = () => {
    // Placeholder — replace with Privy or WalletConnect flow
    const mock = prompt('Enter wallet address (dev mode):');
    if (mock?.startsWith('0x')) onConnect(mock);
  };

  return (
    <header className="topbar">
      <div className="topbar-brand">
        ZAO <span>DAO</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <a
          href="https://zao.frapps.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
        >
          frapps ↗
        </a>
        {wallet ? (
          <button className="btn btn-secondary" onClick={onDisconnect} style={{ fontSize: '0.82rem' }}>
            {shortAddr(wallet)} ✕
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleConnect}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
