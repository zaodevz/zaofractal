import React, { useState } from 'react';
import Topbar from './components/Topbar';
import TabNav from './components/TabNav';
import ProposalsTab from './pages/ProposalsTab';
import LeaderboardTab from './pages/LeaderboardTab';
import AboutTab from './pages/AboutTab';

type Tab = 'proposals' | 'leaderboard' | 'about';

export default function App() {
  const [tab, setTab] = useState<Tab>('proposals');
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <div className="app-shell">
      <Topbar wallet={wallet} onConnect={setWallet} onDisconnect={() => setWallet(null)} />
      <TabNav active={tab} onChange={(t) => setTab(t as Tab)} tabs={[
        { id: 'proposals', label: 'Proposals' },
        { id: 'leaderboard', label: 'Leaderboard' },
        { id: 'about', label: 'About ZAO' },
      ]} />
      <main className="content">
        {tab === 'proposals'   && <ProposalsTab wallet={wallet} />}
        {tab === 'leaderboard' && <LeaderboardTab />}
        {tab === 'about'       && <AboutTab />}
      </main>
    </div>
  );
}
