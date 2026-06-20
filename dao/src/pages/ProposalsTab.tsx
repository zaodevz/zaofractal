import React, { useEffect, useState } from 'react';
import { ORNODE_URL, FRAPPS_URL } from '../lib/constants';
import { shortAddr, formatDate } from '../lib/format';

interface Proposal {
  id: string;
  title: string;
  status: 'active' | 'passed' | 'vetoed' | 'executed';
  yesWeight: number;
  noWeight: number;
  createTime: number;
  memo?: string;
}

interface Props { wallet: string | null; }

export default function ProposalsTab({ wallet }: Props) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${ORNODE_URL}/proposals?limit=20`)
      .then((r) => r.json())
      .then((data) => {
        setProposals(Array.isArray(data) ? data : data.proposals ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not reach ZAO ornode. It may be offline.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="empty-state"><p>Loading proposals…</p></div>;

  if (error) return (
    <div className="empty-state">
      <h3>Ornode unreachable</h3>
      <p style={{ marginBottom: '1.25rem' }}>{error}</p>
      <a href={`${FRAPPS_URL}/proposals`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
        View on frapps.xyz ↗
      </a>
    </div>
  );

  if (!proposals.length) return (
    <div className="empty-state">
      <h3>No proposals yet</h3>
      <p style={{ marginBottom: '1.25rem' }}>Be the first to submit a governance proposal.</p>
      <a href={`${FRAPPS_URL}/newProposal`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        New Proposal ↗
      </a>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ margin: 0 }}>Active Proposals</h2>
        <a href={`${FRAPPS_URL}/newProposal`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          + New Proposal
        </a>
      </div>

      <div className="proposal-list">
        {proposals.map((p) => {
          const total = p.yesWeight + p.noWeight || 1;
          const yesPct = Math.round((p.yesWeight / total) * 100);
          return (
            <div key={p.id} className="card proposal-card">
              <div className="proposal-header">
                <div style={{ flex: 1 }}>
                  <div className="proposal-title">{p.title || p.memo || `Proposal ${shortAddr(p.id)}`}</div>
                  <div className="proposal-meta">
                    <span className={`pill pill-${p.status === 'active' ? 'cyan' : p.status === 'passed' || p.status === 'executed' ? 'orange' : 'dim'}`}>
                      {p.status}
                    </span>
                    {p.createTime && (
                      <span className="text-dim">{formatDate(p.createTime)}</span>
                    )}
                  </div>
                </div>
                <a
                  href={`${FRAPPS_URL}/proposal/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem', flexShrink: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Vote ↗
                </a>
              </div>
              <div className="vote-bar">
                <div className="vote-bar-fill" style={{ width: `${yesPct}%` }} />
              </div>
              <div className="vote-counts">
                <span>YES — {p.yesWeight.toLocaleString()} Respect ({yesPct}%)</span>
                <span>NO — {p.noWeight.toLocaleString()} Respect</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
