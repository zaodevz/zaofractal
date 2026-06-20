import React, { useEffect, useState } from 'react';
import { ORNODE_URL, ZAO_CONTRACTS } from '../lib/constants';
import { displayName, shortAddr, formatRespect, explorerLink } from '../lib/format';

interface Member {
  address: string;
  respect: number;
}

export default function LeaderboardTab() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${ORNODE_URL}/respectHolders?limit=100`)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.holders ?? [];
        setMembers(list.sort((a: Member, b: Member) => b.respect - a.respect));
        setLoading(false);
      })
      .catch(() => {
        setError('Could not reach ZAO ornode.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="empty-state"><p>Loading leaderboard…</p></div>;

  if (error || !members.length) return (
    <div className="empty-state">
      <h3>{error ? 'Ornode unreachable' : 'No data yet'}</h3>
      <p style={{ marginBottom: '1rem' }}>
        {error ?? 'Respect holders will appear here once ornode is synced.'}
      </p>
      <a
        href={`https://optimistic.etherscan.io/token/${ZAO_CONTRACTS.ZOR_RESPECT}#balances`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary"
      >
        View ZOR Holders on Etherscan ↗
      </a>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ margin: 0 }}>Respect Leaderboard</h2>
        <span className="pill pill-orange">{members.length} members</span>
      </div>

      <div className="leaderboard">
        {members.map((m, i) => {
          const name = KNOWN_MEMBERS_FALLBACK(m.address);
          return (
            <div key={m.address} className="leader-row">
              <span className={`leader-rank ${i < 3 ? 'top' : ''}`}>#{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                {name !== shortAddr(m.address)
                  ? <div className="leader-name">{name}</div>
                  : null}
                <a
                  href={explorerLink(m.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leader-addr"
                >
                  {shortAddr(m.address)}
                </a>
              </div>
              <span className="leader-respect">{formatRespect(m.respect)}</span>
              <span className="pill pill-gold" style={{ fontSize: '0.72rem' }}>ZOR</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Inline fallback until KNOWN_MEMBERS is populated
function KNOWN_MEMBERS_FALLBACK(addr: string) {
  return displayName(addr);
}
