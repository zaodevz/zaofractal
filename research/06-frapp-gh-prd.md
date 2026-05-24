---
topic: governance
type: decision
status: research-complete
last-validated: 2026-05-24
tier: DEEP
original-query: "Full PRD for Frapp-GH GitHub-native async fractal MVP - build-ready spec"
---

# 06 - Frapp-GH PRD: GitHub-Native Async Fractal Governance

> **Goal:** Specification-ready build plan for Frapp-GH (codename: "Fractal Actions"), a GitHub-native async governance tool that brings the ZAO Respect Game onto GitHub Discussions, Issues, PRs, and Projects. This PRD is sufficient for a developer to ship Phase 1 (async ranking, no on-chain) in 3-5 focused days, using Hono on Vercel + GitHub App webhook handlers + Respect aggregation logic.

---

## 1. Problem Statement

### The Gap

ZAO Fractal has run 100+ consecutive weeks of **live, synchronous** governance (Monday 6pm EST voice calls, breakout groups, on-chain Respect distribution). This proves peer-consensus + soulbound tokens work at scale. But:

1. **Time-zone friction:** Contributors in EU/APAC must wake up for Monday 6pm EST
2. **Single-track model:** One async tool (Optimystics Respect.Games beta) exists but is generic-web-app. No GitHub-native option.
3. **Developer alignment:** Open-source communities live in GitHub (Issues, PRs, Discussions). Governance should follow.
4. **Verifiability gap:** Today's async contribution claims are self-reported text. PRs and commits offer immutable attribution.
5. **Composability gap:** A GitHub-native fractal can be dropped into any open-source project as a governance overlay. Discord-based tools cannot.

### Who This Is For

1. **Open-source maintainers** running large communities (100+ contributors) where consensus-based governance beats BDFL
2. **Contributors to those projects** who want async ranking without time-zone lock-in
3. **ORDAO operators** (DAOs like ZAO, Optimism Fractal, Eden Fractal, COC Concertz) wanting to experiment with GitHub as a substrate
4. **Zaal's ZAO incubator** - a reference implementation that generalizes to any community fork

---

## 2. Goals + Non-Goals

### IN SCOPE (MVP Phase 1)

- Async contribution submission (Issues labeled `week-N-contribution`)
- Manual voting via Projects board drag-and-drop (order = rank)
- Automated Respect calculation (2x Fibonacci: 110, 68, 42, 26, 16, 10)
- Multi-voter aggregation (Borda count, default; median-of-medians optional)
- Results posted to Discussion as a comment
- Read-only public leaderboard + history
- GitHub App (not OAuth) for easy per-repo installation
- TypeScript + Hono + Vercel serverless (edge functions)
- Week-cycle cron trigger (Monday 6pm EST by default, configurable)

### OUT OF SCOPE (Phase 2+)

- On-chain Respect issuance (Phase 2, ORDAO bridge)
- Snapshot.org mirror voting (Phase 2)
- Multi-repo aggregation / federation (Phase 3)
- AI agent ranking (Phase 2 decision)
- Advanced Sybil detection (Gitcoin Passport stamps) - Phase 2 optional
- Farcaster SIWF binding (Phase 2 optional)

### INTENTIONAL NON-GOALS

- Real-time voting UI (use Projects board, not a custom interface)
- Mobile app (GitHub web is sufficient)
- Fork-specific UI customization (use GitHub Wiki for rules, same repo + config)
- Support for non-GitHub-native work (PRs optional; written issue claims are primary)

---

## 3. User Personas

### Persona A: Ava the Open-Source Maintainer

- **Role:** Project lead (e.g., Ethereum client, Farcaster FIP discussion)
- **Problem:** 50+ contributors. Weekly async input needed but no governance tool that fits GitHub workflow.
- **Wants:** Lightweight ranking, no setup beyond installing an app, on-chain submission optional.
- **Measure of Success:** First governance cycle completes in 1 week; 30+ contributions ranked in 2 hours.

### Persona B: Berk the Async Contributor

- **Role:** Distributed team member (APAC timezone, cannot do Monday 6pm EST)
- **Problem:** Cannot attend live sessions; wants to contribute + be ranked peer-to-peer.
- **Wants:** Submit work async (link to PR), see ranking appear by Sunday, Respect awarded.
- **Measure of Success:** Week 1, submits 3 contributions, ranks peers, earns 68 Respect via OREC proposal.

### Persona C: Chen the ORDAO Operator

- **Role:** DAO governance designer (ZAO, COC Concertz, ZABAL Games)
- **Problem:** Live fractal works, but need async toggle for global contributors.
- **Wants:** Deploy Frapp-GH into a repo, configure Respect curve + vote thresholds, push to on-chain Respect.
- **Measure of Success:** Parallel async + live cycles coexist; leaderboard aggregates both.

---

## 4. The Week-Cycle Flow

### Monday 6pm EST (Session Open)

**Action:** GitHub Action (cron-triggered) opens a new Discussion:

```
Title: "Week 52 Fractal Session (May 24 - May 31)"
Body:
[PINNED]

## How This Works
1. Mon-Fri: Submit contributions as Issues (label: week-52-contribution)
   - Title: What did you ship / help with / onboard?
   - Body: Link to PR (optional), screenshot, summary
   - Assignee: self (for org view)

2. Saturday EOD: Vote on Projects board
   - Drag Issues into rank order (1 = highest value)
   - GH Action snapshots the order at EOD

3. Sunday EOD: Results posted here + sent on-chain (if configured)

## Contribution Criteria
[Config from repo settings]
- Vision: Long-term thinking, strategy
- Contribution: Code, content, ops work
- Collaboration: Helped others, mentorship
- Innovation: New ideas, experiments
- Onboarding: Onboarded new members

Voting opens at [timestamp]. Good luck!
```

**Action:** GitHub Action creates Projects board (v2 standard):
- Auto-populated with filter: `label:week-52-contribution`
- All fields visible, custom field for "Rank" (drag order is rank)

---

### Monday-Friday (Contribution Submission)

**Contributors:** Open an Issue labeled `week-52-contribution`:

```
Title: "Shipped fractal MVP Phase 1"

Body:
## What I Did
- Built Hono endpoint for webhook handlers (~400 lines)
- Deployed to Vercel + tested edge function
- Integrated with GitHub Projects API v2

## Evidence
- PR: bettercallzaal/frapp-gh#12 (5 commits, 40 files)
- Screenshot: [image]

## Criteria Tags
[Vision, Contribution]

---
*This issue will be ranked by community members on Saturday.*
```

**GitHub App:** Webhook listener (issue.opened, issue.edited) validates and logs submission timestamp.

---

### Saturday 6pm EST (Voting Window Closes)

**Voters:** Members drag Issues on the Projects board into rank order. Each voter submits their own ranking (no shared board state - each voter has a view of their own ranking).

**GitHub Action (cron at Saturday 6pm EST + 23:59:59):**
1. Polls GitHub Projects board ordering via REST API
2. Snapshots the state: `{ voter_account: { issue_ids: [1, 4, 3, 2, 5, 6, ...] } }`
3. Stores snapshot in `/vote-snapshots/week-52.json` (committed to repo)

**Note:** GitHub Projects API v2 does **not** return a global board order. Instead:
- Each voter must rank Issues in their own custom view (drag within their board view)
- Frapp-GH reads the card order from the "field" position in the API response
- Aggregation happens in Step 2 Sunday (combining all voter views into one consensus rank)

---

### Sunday 6pm EST (Tally + Results)

**GitHub Action (cron Sunday 6pm EST):**

1. **Load voter snapshots:** Read `/vote-snapshots/week-52.json` (all voters' rankings)

2. **Aggregate rankings:**
   - **Default (Borda Count):** For each Issue, sum its rank positions across all voters. Lower score = higher consensus.
   - **Example:** Issue #4 ranked 1st by voter A, 2nd by voter B, 3rd by voter C → Borda score = 1+2+3 = 6 (lower is better)
   - **Sorting:** Sort Issues by Borda score ascending
   - **Output:** Final rank order [issue_id, issue_id, issue_id, ...]

   - **Alternative (Median-of-Medians):** Group voters into breakout teams (4-6 per group), compute median rank per group, then median of medians across groups. (Closer to live fractal model; more complex; Phase 1 uses Borda, Phase 2 can add toggle)

3. **Calculate Respect:**
   - ZAO 2x Fibonacci: Rank 1 = 110, Rank 2 = 68, Rank 3 = 42, Rank 4 = 26, Rank 5 = 16, Rank 6 = 10
   - Lookup author GitHub username for each Issue, associate Respect amount
   - Build payload: `{ username: amount, username: amount, ... }`

4. **Post Results to Discussion:**
   ```
   Week 52 Results (May 24 - May 31)
   
   Respect Distribution (2x Fibonacci):
   1. @alice: 110 (Issue #4 - Shipped fractal MVP Phase 1)
   2. @bob: 68 (Issue #6 - Fixed critical bug in ranking logic)
   3. @charlie: 42 (Issue #5 - Wrote test suite)
   4. @diana: 26 (Issue #2 - Onboarded 3 new members)
   5. @eve: 16 (Issue #3 - Mentored junior dev)
   6. @frank: 10 (Issue #1 - Helped with docs)
   
   Tally Method: Borda Count (sum of rank positions, lower = better)
   Votes Counted: 5 participants
   
   Results ready for on-chain submission (if configured). React with +1 to confirm.
   ```

5. **(Phase 2) On-Chain Submission:** If ORDAO bridge enabled, call `orclient.proposeBreakoutResult()` with rankings + Respect amounts. Voting period opens.

6. **Close Week N, Prepare Week N+1:** Archive the Discussion, label with `completed`. Queue next Monday's open.

---

## 5. GitHub Primitive Mapping

| GitHub Object | Fractal Analogue | Implementation | Query Method |
|---|---|---|---|
| **Discussion** | Fractal session (weekly cohort) | Auto-created, pinned, contains rules + results | GET /repos/{owner}/{repo}/discussions (filter by body + timestamp) |
| **Issue** | Contribution claim | Opened by contributor, labeled `week-N-contribution` | GET /repos/{owner}/{repo}/issues (filter by label) |
| **PR** | Verifiable work (optional, linked in Issue body) | Issue body contains PR URLs as evidence | Issue body parsing (regex) |
| **Reactions** | Soft voting signal (future use) | thumbs-up / heart / rocket on Discussion comment | GET /repos/{owner}/{repo}/issues/{issue_number}/reactions (for future Phase 2) |
| **Projects (v2)** | Ranking UI (drag-and-drop per voter) | Auto-filtered by week label; each voter drags to rank | GET /repos/{owner}/{repo}/projects/{project_number}/items (field ordering via API) |
| **GitHub Actions** | Tally bot (cron-driven) | Scheduled cron jobs (Mon open, Sat snapshot, Sun tally) | `.github/workflows/` YAML (standard GH Actions) |
| **Wiki / README** | Governance constitution | Versioned rules, voting criteria, Respect formula | Raw wiki content (markdown) |
| **Forks** | Fractal spinouts | Each fork inherits rules + config, can customize | Fork = independent repo with inherited GitHub App |

---

## 6. Identity Tiers

### Tier 1: Lightweight (GitHub Account + Age)

- **Requirements:** GitHub account created 2+ weeks before voting
- **Sybil Resistance:** MEDIUM (requires account age history)
- **On-Chain Binding:** NO
- **Use Case:** Any open-source community using Frapp-GH
- **Implementation:** Read account `created_at` via GitHub API; reject if account < 14 days old
- **Example:** EOL check in webhook handler (line ~45)

```typescript
// Pseudocode
const accountAge = Date.now() - new Date(user.created_at).getTime();
if (accountAge < 14 * 24 * 60 * 60 * 1000) {
  return { error: "Account too new. Must be 2+ weeks old to rank." };
}
```

### Tier 2: Medium (GitHub + Farcaster FID)

- **Requirements:** GitHub account linked to Farcaster FID (optional, Phase 2)
- **Sybil Resistance:** HIGH (FID has on-chain history, ~6-month age typically required by Farcaster)
- **On-Chain Binding:** NO (identity only)
- **Use Case:** Higher-stakes governance (DAO spinouts, cross-community fractals)
- **Implementation:** GitHub App OAuth flow captures GitHub username; optional Farcaster SIWF flow (Sign In With Farcaster) links to FID
- **Note:** DEFER to Phase 2 (adds complexity; Phase 1 uses Tier 1 only)

### Tier 3: Strong (GitHub + Farcaster + Wallet)

- **Requirements:** All of Tier 2, plus Ethereum wallet binding
- **Sybil Resistance:** VERY HIGH (wallet is on-chain identity, verifiable)
- **On-Chain Binding:** YES (for Respect issuance to wallet)
- **Use Case:** ORDAO bridge submission, on-chain Respect minting
- **Implementation:** EIP-191 signed message (GitHub username + wallet address) stored in user metadata
- **Note:** Required for Phase 2 (on-chain). Phase 1 MVP skips (ranking stays off-chain).

### Tier 4: OG Trust (Seed List)

- **Requirements:** Explicitly added to repo config (e.g., ZAO week 1-12 members, or community-decided seed)
- **Sybil Resistance:** EXTREME (early members have proven track record)
- **On-Chain Binding:** OPTIONAL (can use for vote weighting in Phase 2)
- **Use Case:** Preventing Sybil attacks in public Frapp-GH instances (any GitHub user can join)
- **Implementation:** Config option `seedList: ["github_username_1", "github_username_2", ...]`; optional `seedWeight: 1.5` for voting
- **Note:** Phase 1 skips (MVP assumes trusted community). Phase 2 adds as optional anti-Sybil.

---

## 7. Architecture

### Component Overview

```
┌─────────────────────────────────────────────────┐
│  GitHub (Repo)                                  │
│                                                 │
│  ├─ Discussion (session template)               │
│  ├─ Issues (contributions, labeled)             │
│  ├─ Projects v2 (voter ranking board)           │
│  ├─ Webhooks (issue.opened, etc.)               │
│  └─ Actions (cron jobs, Mon/Sat/Sun)            │
│                                                 │
└──────────────────┬──────────────────────────────┘
                   │ webhooks + cron triggers
                   ▼
┌─────────────────────────────────────────────────┐
│  Frapp-GH Backend (Hono + Vercel)               │
│                                                 │
│  ├─ POST /webhook/github                        │
│  │  (handles issue.opened, issue.edited)        │
│  │                                              │
│  ├─ GET /api/v1/votes/{week}                    │
│  │  (returns snapshot of Projects board state)  │
│  │                                              │
│  ├─ POST /api/v1/tally/{week}                   │
│  │  (runs Borda count, posts results comment)   │
│  │                                              │
│  ├─ GET /api/v1/leaderboard                     │
│  │  (returns public Respect scores by member)   │
│  │                                              │
│  └─ Scheduled cron handlers                     │
│     (openSession, snapshotVotes, tallyResults)  │
│                                                 │
└──────────────────┬──────────────────────────────┘
                   │ REST API calls to GitHub
                   ▼
┌─────────────────────────────────────────────────┐
│  GitHub REST API v3 + GraphQL                   │
│                                                 │
│  ├─ GET /repos/.../discussions                  │
│  ├─ POST /repos/.../discussions (create)        │
│  ├─ GET /repos/.../issues (filter by label)     │
│  ├─ GET /repos/.../projects/{num}/items         │
│  │  (read card ordering from field values)      │
│  ├─ POST /repos/.../issues/.../comments         │
│  │  (post tally results)                        │
│  └─ GET /users/{username} (verify account age)  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Data Flow

```
Monday 6pm EST
  ├─ GH Action cron triggers
  └─> Hono handler: openSession()
       ├─ Create Discussion with template body
       ├─ Create Projects v2 board (filtered by label:week-N)
       └─ POST comment in Discussion: "Session open, submit until Friday"

Friday (Async)
  ├─ Contributors submit Issues (label: week-N-contribution)
  └─> Webhook POST /webhook/github
       ├─ Validate issue format
       ├─ Confirm label = week-N-contribution
       └─ Log submission (timestamp, author, PR link if present)

Saturday 6pm EST (Voting close)
  ├─ GH Action cron triggers
  └─> Hono handler: snapshotVotes()
       ├─ Call GET /repos/.../projects/{num}/items
       ├─ For each voter, read card field positions
       ├─ Build snapshot: { voter_1: [issue_1, issue_4, issue_3, ...], voter_2: [...] }
       ├─ Commit snapshot to /vote-snapshots/week-N.json (in repo)
       └─ POST comment in Discussion: "Voting closed. Results incoming Sunday."

Sunday 6pm EST (Tally)
  ├─ GH Action cron triggers
  └─> Hono handler: tallyResults()
       ├─ Load /vote-snapshots/week-N.json
       ├─ Run Borda count algorithm
       ├─ Assign Respect (110, 68, 42, 26, 16, 10 per rank)
       ├─ POST results comment in Discussion
       ├─ (Phase 2) Call orclient.proposeBreakoutResult() if ORDAO enabled
       └─ Archive Discussion, prep Week N+1

Ongoing (Public)
  ├─ Public web UI queries GET /api/v1/leaderboard
  └─> Hono handler returns aggregate Respect scores
       └─ Cached in Vercel KV or Supabase (optional, Phase 2)
```

### Technology Stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Hono 4.x (TypeScript) | Ultra-lightweight, edge-runtime native, same stack as ZAO OS |
| **Runtime** | Vercel Edge Functions | Free tier sufficient for MVP, auto-scales, no cold starts |
| **Auth** | GitHub App (not OAuth) | Installable per-repo, webhooks automatic, minimal user interaction |
| **GitHub API** | REST v3 (not GraphQL) | Simpler for webhook handlers, better for cron scheduling |
| **Secrets** | Vercel Environment Variables | GitHub App private key, webhook secret |
| **Testing** | Jest + Hono test utilities | Fast unit tests, middleware testing built-in |
| **CI/CD** | GitHub Actions (standard) | Already in repo, no 3rd party required |
| **Database** | None (Phase 1) | GitHub is the source of truth; snapshots in repo git |
| **Frontend** | Static HTML + fetch() | No build step, Tailwind v4 for styling (ZAO design system) |
| **Deployment** | `git push` to main | Vercel auto-deploys, GitHub App auto-updates webhook URL |

### GitHub App Scopes (Minimal Required)

| Scope | Permission | Why |
|---|---|---|
| `contents:read` | Read repo contents | Read webhook secrets, repo config |
| `issues:read,write` | Read/write Issues | Create + modify contribution Issues |
| `discussions:read,write` | Read/write Discussions | Create session Discussion, post results comment |
| `projects:read,write` | Read/write Projects | Create v2 board, read card order |
| `webhook` | Webhooks | Receive push, issue.opened, issue.edited, discussion.created events |

**Intentionally NOT Requesting:**
- `pull_requests:read` - PRs are optional (Issue body contains links)
- `repository_hooks:write` - webhooks managed by app manifest, not via API
- `code:read` - we don't analyze commit content

### Configuration File (frapp-gh.config.json)

```json
{
  "community": "The ZAO",
  "sessionSchedule": {
    "startDay": "Monday",
    "startTime": "18:00", // 6pm EST
    "timezone": "US/Eastern",
    "cycleLength": 7 // days
  },
  "ranking": {
    "algorithm": "borda", // or "median-of-medians"
    "respectScores": [110, 68, 42, 26, 16, 10], // 2x Fibonacci
    "minVoters": 2,
    "voterEligibility": "tier-1" // "tier-1", "tier-2", "tier-3"
  },
  "github": {
    "owner": "bettercallzaal",
    "repo": "frapp-gh-zao-test",
    "issueLabel": "week-{N}-contribution",
    "discussionCategory": "Fractal Sessions"
  },
  "ordao": {
    "enabled": false, // Phase 2: set to true to enable on-chain bridge
    "respectContractAddress": "0x9885CCeEf7E8371Bf8d6f2413723D25917E7445c",
    "orecContractAddress": "0xcB05F9254765CA521F7698e61E0A6CA6456Be532",
    "chainId": 10 // Optimism OP Mainnet
  },
  "contributionCriteria": [
    { "label": "Vision", "description": "Long-term thinking, strategy, direction" },
    { "label": "Contribution", "description": "Code, content, ops work shipped" },
    { "label": "Collaboration", "description": "Helped others, mentorship, teamwork" },
    { "label": "Innovation", "description": "New ideas, experiments, exploration" },
    { "label": "Onboarding", "description": "Onboarded new members, documented processes" }
  ],
  "seedList": ["zaal", "tadas", "dan"] // Optional: OG members (Phase 2 anti-Sybil)
}
```

---

## 8. Data Model

### Per-Repo State (frapp-gh.config.json)

Stored in repo root, versioned in git:

```typescript
interface FrameworkConfig {
  community: string;
  sessionSchedule: {
    startDay: "Monday" | "Tuesday" | ... | "Sunday";
    startTime: string; // "18:00"
    timezone: string; // "US/Eastern"
    cycleLength: number; // days (typically 7)
  };
  ranking: {
    algorithm: "borda" | "median-of-medians" | "breakout-random";
    respectScores: number[]; // [110, 68, 42, 26, 16, 10]
    minVoters: number; // e.g., 2
    voterEligibility: "tier-1" | "tier-2" | "tier-3";
  };
  github: {
    owner: string;
    repo: string;
    issueLabel: string; // "week-{N}-contribution", {N} = week number
    discussionCategory: string;
  };
  ordao?: {
    enabled: boolean;
    respectContractAddress: string; // ERC-1155
    orecContractAddress: string; // Governor
    chainId: number; // 10 = Optimism
  };
  contributionCriteria: Array<{ label: string; description: string }>;
  seedList?: string[]; // GitHub usernames, for OG trust (optional)
}
```

### Per-Week State (/.github/frapp-gh/{week}/state.json)

Stored in repo, committed by bot:

```typescript
interface WeekState {
  weekNumber: number; // e.g., 52
  status: "open" | "voting-closed" | "completed" | "archived";
  discussionId: string; // GitHub Discussion ID
  discussionUrl: string;
  projectId: string; // GitHub Projects v2 board ID
  startedAt: ISO8601; // e.g., "2026-05-24T18:00:00Z"
  votingClosedAt?: ISO8601;
  tallyCompletedAt?: ISO8601;
  contributionCount: number;
  voterCount: number;
  respectDistributed: Record<string, number>; // { github_username: 110, ... }
  tallyMethod: "borda" | "median-of-medians";
  ordaoProposalId?: string; // Phase 2: OREC proposal ID, if on-chain
}
```

### Per-Issue (Contribution) State

GitHub Issue = single contribution claim. Metadata stored in Issue body + labels:

```typescript
interface ContributionIssue {
  // GitHub Issue fields (auto-populated)
  id: string; // Issue ID
  number: number; // Issue #123
  title: string; // "Shipped fractal MVP Phase 1"
  body: string; // Contribution details (user-written)
  labels: string[]; // ["week-52-contribution"]
  author: string; // GitHub username
  createdAt: ISO8601;
  
  // Computed by Frapp-GH (metadata in issue body via bot comment)
  finalRank?: number; // 1-6, set at tally time
  respectAwarded?: number; // 110, 68, 42, etc.
  tallyCommentUrl?: string; // Link to tally results comment
}
```

### Vote Snapshot (Per Voter)

File: `/.github/frapp-gh/vote-snapshots/week-52.json`

```typescript
interface VoteSnapshot {
  week: number;
  snapshotTimestamp: ISO8601; // When Projects board was read
  voters: Record<string, VoterRanking>; // { github_username: { ... } }
}

interface VoterRanking {
  githubUsername: string;
  accountAge: number; // days
  eligibleTier: "tier-1" | "tier-2" | "tier-3";
  ranking: {
    issueIds: number[]; // e.g., [4, 6, 5, 2, 3, 1] (rank 1 to 6)
    issueNumbers: number[];
  };
  submittedAt: ISO8601;
}
```

### Leaderboard (Cached)

File: `/public/leaderboard.json` (regenerated at tally time)

```typescript
interface LeaderboardEntry {
  rank: number;
  githubUsername: string;
  totalRespect: number;
  recentActivity: Array<{
    week: number;
    respectAwarded: number;
    contribution: string; // Issue title
  }>;
  tier: "tier-1" | "tier-2" | "tier-3";
  accountAge: number; // days
  joinedAt: ISO8601;
}

interface Leaderboard {
  asOf: ISO8601;
  community: string;
  totalRespectDistributed: number;
  entries: LeaderboardEntry[];
}
```

---

## 9. The GitHub Action Tally Script (Pseudocode)

### Phase 1 MVP: Borda Count (Default)

**File:** `.github/workflows/fractal-tally.yml`

Trigger: Manual dispatch (run Sunday 6pm EST manually, or cron `0 22 * * 0` = Sunday 10pm UTC = 6pm EDT)

```yaml
name: Fractal Tally

on:
  workflow_dispatch:
  schedule:
    - cron: "0 22 * * 0" # Sunday 22:00 UTC (6pm EDT)

jobs:
  tally:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Tally (Borda Count)
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FRAPP_GH_SECRET: ${{ secrets.FRAPP_GH_SECRET }}
        run: |
          npx ts-node scripts/tally.ts --method borda
```

**Pseudocode (TypeScript):** `scripts/tally.ts`

```typescript
import { Octokit } from "@octokit/rest";
import * as fs from "fs";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function tallyResults(weekNumber: number, method: "borda" | "median-of-medians") {
  // 1. Load config + vote snapshot
  const config = JSON.parse(fs.readFileSync("frapp-gh.config.json", "utf-8"));
  const weekDir = `.github/frapp-gh/week-${weekNumber}`;
  const snapshot = JSON.parse(fs.readFileSync(`${weekDir}/vote-snapshots.json`, "utf-8"));
  
  // 2. Validate snapshot (minimum voters check)
  const voters = Object.keys(snapshot.voters);
  if (voters.length < config.ranking.minVoters) {
    console.log(`ERROR: Only ${voters.length} voters, need >= ${config.ranking.minVoters}`);
    return;
  }
  
  // 3. Fetch all contribution Issues for this week
  const issues = await octokit.rest.issues.listForRepo({
    owner: config.github.owner,
    repo: config.github.repo,
    labels: `week-${weekNumber}-contribution`,
    state: "open",
  });
  
  const issueMap = new Map(issues.data.map(i => [i.number, i]));
  
  // 4. BORDA COUNT ALGORITHM
  // For each issue, sum its rank positions across all voters
  // Lower score = higher consensus
  
  const bordaScores = new Map<number, number>(); // issue_id => sum of ranks
  
  for (const voter of Object.values(snapshot.voters)) {
    const ranking = voter.ranking.issueIds; // [4, 6, 5, 2, 3, 1] (1st to 6th)
    
    ranking.forEach((issueId, rankIndex) => {
      const rank = rankIndex + 1; // 1-based rank
      const currentScore = bordaScores.get(issueId) || 0;
      bordaScores.set(issueId, currentScore + rank);
    });
  }
  
  // 5. Sort by Borda score (ascending = best)
  const rankedIssues = Array.from(bordaScores.entries())
    .sort(([_, scoreA], [_, scoreB]) => scoreA - scoreB)
    .map(([issueId], rank) => ({
      issueId,
      rank: rank + 1, // 1-based final rank
      respectAwarded: config.ranking.respectScores[rank] || 0,
    }));
  
  // 6. Build results table
  let resultsMarkdown = `# Week ${weekNumber} Fractal Results\n\n`;
  resultsMarkdown += `Tally Method: Borda Count\n`;
  resultsMarkdown += `Voters: ${voters.length}\n`;
  resultsMarkdown += `Contributions Ranked: ${rankedIssues.length}\n\n`;
  resultsMarkdown += `| Rank | Issue | Author | Respect | Contribution |\n`;
  resultsMarkdown += `|---|---|---|---|---|\n`;
  
  let totalRespect = 0;
  for (const { issueId, rank, respectAwarded } of rankedIssues) {
    const issue = issueMap.get(issueId);
    const author = issue?.user?.login || "unknown";
    resultsMarkdown += `| ${rank} | #${issueId} | @${author} | ${respectAwarded} | ${issue?.title} |\n`;
    totalRespect += respectAwarded;
  }
  
  // 7. Post results as comment on Discussion
  const discussionId = snapshot.discussionId || (await findDiscussionByWeek(weekNumber));
  
  await octokit.rest.issues.createComment({
    owner: config.github.owner,
    repo: config.github.repo,
    issue_number: discussionId, // Discussion = Issue in REST API
    body: resultsMarkdown,
  });
  
  // 8. Save state
  const weekState = {
    weekNumber,
    status: "completed",
    tallyCompletedAt: new Date().toISOString(),
    respectDistributed: buildRespectMap(rankedIssues, issueMap),
    tallyMethod: "borda",
    totalRespectAwarded: totalRespect,
  };
  
  fs.writeFileSync(`${weekDir}/state.json`, JSON.stringify(weekState, null, 2));
  
  // 9. (Phase 2) If ORDAO enabled, call proposeBreakoutResult()
  if (config.ordao?.enabled) {
    await submitToOrdao(config, weekState, rankedIssues, issueMap);
  }
  
  // 10. Commit state to repo
  // (Use actions/github-script or `git` CLI)
  console.log("Tally complete. Results posted.");
}

function buildRespectMap(
  rankedIssues: Array<{ issueId: number; rank: number; respectAwarded: number }>,
  issueMap: Map<number, any>
): Record<string, number> {
  const result: Record<string, number> = {};
  
  for (const { issueId, respectAwarded } of rankedIssues) {
    const issue = issueMap.get(issueId);
    const author = issue?.user?.login;
    
    if (author) {
      result[author] = (result[author] || 0) + respectAwarded;
    }
  }
  
  return result;
}

async function findDiscussionByWeek(weekNumber: number): Promise<number> {
  // Query Discussions, filter by body containing "Week {weekNumber}"
  // Return first match's ID
  // Pseudocode: search for Discussion with title "Week {weekNumber} Fractal Session"
  // (Actual implementation uses GraphQL or REST search)
}

async function submitToOrdao(config: any, weekState: any, rankedIssues: any, issueMap: Map<number, any>) {
  // Phase 2: Use orclient to call proposeBreakoutResult()
  // Requires wallet binding + signature
  // For now, stub.
  console.log("Phase 2: On-chain submission would happen here.");
}

tallyResults(52, "borda");
```

**Pseudocode complexity estimate:**
- **Borda Count logic:** ~20 lines (sum ranks, sort)
- **Results markdown generation:** ~15 lines
- **GitHub API calls:** ~10 lines (fetch issues, post comment)
- **Total:** ~50-70 lines of actual logic (rest is boilerplate)

**Runtime estimate (Phase 1):**
- Fetch 50 Issues: ~500ms
- Process votes (5 voters x 6 issues): ~50ms
- Post comment: ~200ms
- **Total:** ~1 second (edge function is fast)

---

## 10. On-Chain Integration (Phase 2)

### When to Push Results

**Option A (Automatic every Sunday evening):** GitHub Action calls orclient immediately after tally

**Option B (Manual):** Zaal reviews results, signs off, then triggers on-chain push

**Recommendation:** Option B for MVP (more conservative), Option A in Phase 2 after testing

### The orclient Bridge

**File:** `src/lib/ordao-bridge.ts` (TypeScript, to be written in Phase 2)

```typescript
import { createOrclient } from "@ordao/orclient";
import type { Signer } from "ethers";

export async function submitBreakoutToOrdao(
  config: FrameworkConfig,
  weekState: WeekState,
  respectMap: Record<string, number>, // { github_username: respect_amount, ... }
  signer: Signer // Phase 2: user provides wallet signer
): Promise<{ propId: string; txHash: string }> {
  
  const orclient = createOrclient({
    respectedAddress: config.ordao.respectContractAddress,
    orecAddress: config.ordao.orecContractAddress,
    chainId: config.ordao.chainId,
    signer,
  });
  
  // 1. Resolve GitHub usernames to wallets (UNKNOWN - requires user binding in Phase 2)
  // For now: assume 1:1 mapping via user metadata (stored in GH App installation)
  const rankings = await resolveUsernamestoWallets(respectMap);
  
  // 2. Call proposeBreakoutResult
  const proposal = await orclient.proposeBreakoutResult({
    meetingNum: weekState.weekNumber,
    groupNum: 1, // All contributors are one "group" in async model
    rankings: rankings, // { [address]: respectAmount }
  });
  
  // 3. Return proposal ID for leaderboard
  return {
    propId: proposal.id,
    txHash: proposal.txHash,
  };
}

async function resolveUsernamestoWallets(
  respectMap: Record<string, number>
): Promise<Record<string, number>> {
  // Phase 2: Look up wallet for each GitHub username
  // Possible sources:
  //   - GitHub user profile (ENS name in bio + resolve to address)
  //   - Frapp-GH user metadata (stored in GitHub App installation context)
  //   - Manual mapping in frapp-gh.config.json
  
  // For MVP: UNKNOWN. Return placeholder.
  return respectMap; // TODO
}
```

**orclient Integration Points:**
- `orclient.proposeBreakoutResult()` - Creates OREC proposal
- `orclient.vote(propId, "Yes")` - Voters vote on proposal
- `orclient.execute(propId)` - Mints Respect1155 tokens after passing
- `orclient.getRespectOf(address)` - Query balance (for leaderboard cache)

### Gas Cost Estimate

| Operation | Chain | Cost (USD) | Notes |
|---|---|---|---|
| `proposeBreakoutResult()` (Optimism) | OP Mainnet | ~$0.05 | 1 proposal, 1 group, 6 recipients |
| `vote(propId, Yes)` | OP Mainnet | ~$0.02 | Per voter (5-10 voters = $0.10-0.20 total) |
| `execute(propId)` | OP Mainnet | ~$0.10 | Mints ERC-1155 tokens (6 recipients) |
| **Total per week** | OP Mainnet | ~$0.20-0.30 | Very affordable |

**Comparison:** Snapshot gas cost = FREE (off-chain voting). Frapp-GH Phase 1 = FREE (async ranking, no on-chain). Phase 2 on-chain cost = negligible due to Optimism L2.

---

## 11. MVP Scope (Phases)

### Phase 1: Async Ranking (Weeks 1-2)

**Core Feature:**
- Monday open Discussion + Projects board
- Contributors submit Issues (Mon-Fri)
- Voters rank via Projects drag-and-drop (Sat EOD snapshot)
- Tally + results posted to Discussion (Sun EOD)
- Read-only public leaderboard

**Not Included:**
- On-chain Respect issuance
- Farcaster FID linking
- Sybil detection (rely on GitHub account age)
- Wallet binding
- Multi-repo federation

**Build Estimate:** 15-20 hours of focused dev work (3-5 day sprint with pair)

**Success Metric:** First Frapp-GH cycle completes at ZAO with 5+ contributors, 3+ voters, results posted to Discord for validation

---

### Phase 2: On-Chain Bridge (Week 3-4)

**New Feature:**
- Wallet binding (EIP-191 signed messages)
- orclient integration (proposeBreakoutResult)
- OREC voting + execution
- Respect1155 minting
- Optional: Farcaster SIWF linking (Tier 2 identity)

**Build Estimate:** 10-15 hours (3-5 additional days)

**Success Metric:** Phase 1 results feed to OREC, community votes, Respect mints on-chain

---

### Phase 3: Federation + Docs (Week 5-6)

**New Features:**
- Fork support (inherit rules, customize repo config)
- Cross-repo leaderboard aggregation (ZABAL Games + COC Concertz + ZAO)
- Community docs + setup guide
- GitHub Marketplace listing (if desired)

**Build Estimate:** 15-20 hours (1 week)

**Success Metric:** Frapp-GH forked into 2+ communities, each running independent cycles

---

## 12. Effort Estimate (Per Phase)

### Phase 1: Async Ranking MVP

| Task | Effort | Notes |
|---|---|---|
| **Backend (Hono)** | 6 days | webhook handlers + cron functions + GitHub API integration |
| Webhook: issue.opened validation | 2 days | Parse Issue body, validate format, store metadata |
| Cron: openSession (Mon 6pm) | 1 day | Create Discussion from template, Projects board |
| Cron: snapshotVotes (Sat EOD) | 1.5 days | Read Projects board ordering, save vote snapshot |
| Cron: tallyResults (Sun EOD) | 1.5 days | Borda count logic, post results comment |
| Tests + edge cases | 1 day | Jest unit tests, mock GitHub API responses |
| **Frontend (Public Leaderboard)** | 2 days | Static HTML + CSS, fetch leaderboard.json, Tailwind styling |
| Leaderboard UI | 1.5 days | List view, sort by Respect, show recent activity |
| Week detail view | 0.5 days | Show contributions + rankings for a specific week |
| **Deployment** | 1 day | Vercel setup, GitHub App manifest, environment secrets |
| GitHub App registration + manifest | 0.5 days | Create app, set scopes, configure webhooks |
| Vercel project setup + deploy | 0.5 days | Connect repo, set env vars, test edge functions |
| **Testing (Manual)** | 2 days | Alpha run at ZAO (1 cycle = 1 week) |
| Setup test repo | 0.5 days | Fork Frapp-GH into test repo, install app |
| Run 1 full cycle (Mon-Sun) | 1 day | Manual testing, bug fixes |
| Docs + inline comments | 0.5 days | README, deployment guide, API reference |
| **Total Phase 1** | ~11-12 days | ~2.5 sprint-weeks with pair programming, or 3-4 weeks solo |

### Phase 2: On-Chain Bridge

| Task | Effort |
|---|---|
| Wallet binding (EIP-191 signature) | 3 days |
| orclient integration | 2 days |
| Farcaster SIWF (optional) | 2 days |
| Testing + gas cost validation | 1 day |
| **Total Phase 2** | ~8 days |

### Phase 3: Federation + Docs

| Task | Effort |
|---|---|
| Fork support + config inheritance | 2 days |
| Cross-repo aggregation | 2 days |
| Community setup guide | 3 days |
| Video walkthrough | 1 day |
| **Total Phase 3** | ~8 days |

**Grand Total MVP:** ~27 days (3-4 sprint-weeks), or ~6-8 weeks solo development

---

## 13. Open Questions + Decisions for Zaal

### Decision 1: Ranking Algorithm (Default)

**Options:**
- **Borda Count** (default): Simple, proven, "rank 1 = 1 point, rank 2 = 2 points, sum". Fast to compute. Does NOT reflect "group consensus" like live fractal.
- **Median-of-Medians**: More aligned with live fractal (random breakout groups). Voters split into 4-6 person groups, each group votes internally, then aggregate medians. Complex; ~50 lines of code.
- **Random Breakout Aggregation**: Shuffle voters into groups, each group produces single ranking, then aggregate across groups. Truest to fractal philosophy. Most complex.

**Recommendation:** **Use Borda Count for Phase 1.** It's simple, fast, and async-first projects (Snapshot, Aragon) use similar aggregation. Phase 2 can add toggle for Median-of-Medians if ZAO prefers.

**Zaal's Call:** Confirm algorithm choice before coding.

---

### Decision 2: Soft Enforcement vs. Hard Validation (Labels)

**Options:**
- **Soft enforcement**: Issue without `week-N-contribution` label still appears on Projects board, but bot posts warning comment.
- **Hard validation**: Issue without label is auto-closed with message "Add label to participate in this week's session."

**Recommendation:** **Soft enforcement for Phase 1.** Easier on contributors, less gatekeeping friction. Phase 2 can add hard validation if spam becomes problem.

**Zaal's Call:** Confirm enforcement mode.

---

### Decision 3: GitHub App Scopes (Minimal Risk)

**Question:** Should Frapp-GH request `pull_requests:read` to verify PR links in Issue bodies, or trust Issue body text?

**Options:**
- **Minimal scopes (current plan):** Trust text, don't read PR details. Issue link like "see PR #123" is sufficient evidence.
- **Extra scope:** Verify PR #123 actually exists + was authored by Issue creator. Higher friction for app approval.

**Recommendation:** **Keep minimal scopes for Phase 1.** PR existence verification is a nice-to-have, not MVP. Phase 2 can add if desired.

**Zaal's Call:** Confirm scope minimalism.

---

### Decision 4: Farcaster Integration (Phase 2)

**Question:** Should Frapp-GH optionally link GitHub usernames to Farcaster FIDs for identity enrichment?

**Options:**
- **Skip Phase 1**: Use GitHub account age only.
- **Phase 2 Tier 2**: Add optional Farcaster SIWF linking (Sign In With Farcaster).

**Recommendation:** **Skip Phase 1, add Phase 2 optional.** Adds auth flow complexity; not needed for MVP.

**Zaal's Call:** Confirm Tier 2 timing.

---

### Decision 5: Wallet Binding for ORDAO (Phase 2 Blocker)

**Question:** How do we resolve GitHub usernames to Ethereum wallets when submitting to ORDAO?

**Options:**
- **GitHub user profile field**: Contributors set ENS name in GitHub bio, bot resolves to address.
- **Manual mapping**: Zaal maintains CSV of username -> wallet in repo.
- **Farcaster bridge**: Contributors link GitHub -> Farcaster FID -> resolve FID to wallet.
- **EIP-191 signed message**: Contributors sign message with their wallet, bot stores signature -> address mapping.

**Recommendation:** **Option 4 (EIP-191 signed message) for Phase 2.** Most trustless, one-time setup per user. EIP-191 is standard (e.g., SIWF uses it).

**Zaal's Call:** Confirm wallet binding strategy before Phase 2.

---

### Decision 6: AI Agent Participation (Deferred)

**Question:** Can AI agents (bots) submit contributions + participate in ranking?

**Options:**
- **No bots in Phase 1**: Humans only. Simple rule.
- **Bots can submit**: Issues authored by bot OK, but only humans can vote.
- **Bots can vote**: Seed trust score to certain bots (e.g., VAULT, BANKER).

**Recommendation:** **No bots in Phase 1.** Humans-only governance avoids legitimacy questions. Phase 2+ can revisit per arcabotai's Farcaster FIP #19 note (Doc 664).

**Zaal's Call:** Confirm AI stance.

---

### Decision 7: Multi-Repo Aggregation Strategy (Phase 3 Blocker)

**Question:** When ZABAL Games, COC Concertz, and The ZAO each run Frapp-GH cycles, should their Respect leaderboards aggregate into one cross-repo ranking?

**Options:**
- **Per-repo leaderboards only**: Each community's Respect stays siloed.
- **Cross-repo leaderboard**: Aggregate by GitHub username across repos, with "origin repo" metadata.
- **Federated graph**: Respect scores weighted by seniority (week 1 members score higher).

**Recommendation:** **Defer to Phase 3. Skip MVP.** Too complex. Phase 3 can design federation after Phase 1 + 2 ship and we have real data.

**Zaal's Call:** Confirm timeline for federation.

---

## 14. Comparison vs. Existing Tools

| Feature | Frapp-GH | Snapshot + Discourse | Tally | Aragon | Optimystics Respect.Games |
|---|---|---|---|---|---|
| **Async Voting** | YES (72-hour window) | YES (4-7 days) | YES (7+ days) | YES (configurable) | YES (7+ days) |
| **Off-Chain Cost** | FREE (GitHub free tier) | FREE (IPFS voting) | FREE (ScopeLift-hosted) | Paid (SaaS $X/month) | FREE (IPFS) |
| **On-Chain Submission** | YES (Phase 2, ORDAO) | Manual or custom bridge | Manual or custom bridge | YES (native) | YES (optional) |
| **Developer-Native** | **YES** (GitHub native) | NO (web app) | NO (web app) | NO (web app) | NO (generic web) |
| **Verifiable Work** | **YES** (PRs + commits) | NO (claim-based) | NO (claim-based) | NO (claim-based) | NO (claim-based) |
| **Community Forks** | **YES** (git clone, customize) | NO (proprietary UI) | NO (proprietary UI) | Limited (contract-level) | NO (proprietary UI) |
| **Sybil Resistance** | GitHub account age + OG seed list | Token-weighted (Sybil-heavy) | Token-weighted (Sybil-heavy) | Token-weighted (Sybil-heavy) | Respect-weighted (proof-of-work) |
| **Fractal-Specific** | **YES** (Borda count, 2x Fibonacci) | NO (generic governance) | NO (generic governance) | NO (generic governance) | **YES** (Respect Game protocol) |
| **Setup Friction** | **Minimal** (install app) | Medium (create space, invite users) | Medium (register DAO, invite voters) | High (deploy contracts, configure) | Medium (join community, link wallet) |
| **GitHub Integration** | **Native** (Issues, Discussions, Projects) | NO (embed links) | NO (webhook integrations) | NO (webhook integrations) | NO (GitHub integration) |

**Verdict:** Frapp-GH is the ONLY tool that is (1) GitHub-native, (2) verifiable via PRs, (3) forkable, (4) fractal-specific. Best-in-class for open-source governance. Complementary to Optimystics Respect.Games (Frapp-GH = GitHub substrate, Respect.Games = generic-web substrate).

---

## 15. Risks + Mitigations

### Risk 1: Sybil Attacks (Fake GitHub Accounts)

**Threat:** Attacker creates 10 new GitHub accounts, votes 10 times per week, inflates Respect.

**Mitigation (Phase 1):** Require GitHub account age >= 2 weeks. Limits fresh accounts but doesn't prevent old-account farms.

**Mitigation (Phase 2):** Add OG seed list + EigenTrust seeding. Seed list = founding members (e.g., ZAO weeks 1-12). Only seed-list members have voting weight > 1.0. New accounts inherit low weight.

**Mitigation (Phase 3):** Integrate Gitcoin Passport stamps (GitHub, Twitter, ENS, Worldcoin) as optional anti-Sybil layer for public Frapp-GH instances.

**Acceptance:** MVP accepts low Sybil risk in closed communities (ZAO, Optimism Fractal). Public instances (any GitHub user) need Phase 2+ hardening.

---

### Risk 2: Voter Apathy / Low Turnout

**Threat:** Only 1-2 voters rank contributions. Results lack legitimacy. Aggregation meaningless.

**Mitigation (Phase 1):** Require `minVoters: 3` (configurable). Tally fails if fewer than 3 voters. Bot posts warning: "Low participation. Retry next week."

**Mitigation (Phase 2):** Add incentive: Respect awarded to voters themselves (e.g., Rank N voters in the voter pool, give Respect for accurate voting). [See Respect Game philosophy: "voting IS contribution".]

**Mitigation (Process):** Facilitator (Zaal) manually posts reminder in Discussion Friday (48 hours before voting close).

**Acceptance:** MVP relies on community norm (ZAO has 100+ weeks of experience). If turnout drops, escalate to manual intervention.

---

### Risk 3: Contributors Dropout Mid-Week

**Threat:** 6 contributors submit Monday, but only 2 complete the full cycle. Others abandon after Tue.

**Mitigation (Process):** Facilitator posts daily checklist in Discussion ("Have you submitted your contributions yet?"). Peer pressure + community culture.

**Mitigation (Phase 2):** Optional: Contributors who submit but don't vote earn reduced Respect (e.g., 50% penalty). Encourages participation throughout cycle.

**Acceptance:** MVP relies on ZAO's proven culture. If dropout becomes pattern, revisit in Phase 2.

---

### Risk 4: GitHub API Rate Limits

**Threat:** Too many webhook events (100 Issues submitted Mon-Fri) exhaust GitHub API quota.

**Mitigation (Phase 1):** Batch API calls. Use GraphQL for efficiency. Cache issue list locally in function.

**Mitigation (Operations):** Monitor API quota in Vercel dashboard. Alert if usage exceeds 80%.

**Mitigation (Design):** Webhook handlers do minimal work (validate + log). Heavy lifting (tally) happens in cron job, not real-time.

**Acceptance:** GitHub API quota is ~5000 req/hour for app auth. MVP expects < 100 requests/week. Safe.

---

### Risk 5: GitHub Projects v2 API Instability

**Threat:** GitHub Projects v2 API is relatively new. Bugs or breaking changes could break ranking.

**Mitigation (Phase 1):** Fallback to manual vote submission (bot asks voters to reply in Discussion comment with their ranking). Lower friction than Projects board, but less visual.

**Mitigation (Phase 2):** If needed, pivot to custom frontend for voting UI (drag-and-drop Svelte component). Use GitHub REST API to store votes in Issue custom fields instead of Projects.

**Acceptance:** MVP relies on Projects v2 API. If it breaks, manual fallback is low-friction.

---

### Risk 6: Wallet Resolution (Phase 2 Blocker)

**Threat:** Can't resolve GitHub username to wallet address when submitting to ORDAO.

**Mitigation (Phase 2):** Use EIP-191 signed message. Contributors sign once with wallet, bot stores signature -> address mapping. One-time setup per contributor.

**Mitigation (Alternative):** Manual mapping (Zaal maintains CSV). Operational burden but trustless.

**Acceptance:** MVP (Phase 1) skips on-chain submission. Phase 2 will solve via signed message.

---

## 16. Sources

### Primary Sources (FULL)

| # | Source | Content | Status |
|---|--------|---------|--------|
| 1 | Doc 664 (GitHub-native fractal spec) | Frapp-GH brainstorm, tech stack, MVP spec | FULL [READ] |
| 2 | Doc 04 (Async fractal landscape) | Optimystics Respect.Games, Fractal Circles, async patterns | FULL [READ] |
| 3 | Doc 056 (ORDAO + Respect system) | Respect scoring, 2x Fibonacci, OREC mechanics, orclient SDK | FULL [READ] |
| 4 | GitHub App Docs (authentication) | App auth, OAuth flow, webhook handlers, scopes | FULL [FETCHED] |
| 5 | GitHub Projects API v2 (REST) | List projects, get items, field ordering, ordering | FULL [FETCHED] |
| 6 | Hono Framework Docs | TypeScript edge framework, Vercel deployment, middleware | FULL [FETCHED] |
| 7 | Borda Count (Wikipedia + academic) | Voting aggregation algorithm, implementation examples | FULL [KNOWN] |
| 8 | Snapshot Governance (docs.snapshot.org) | Async voting, off-chain, IPFS, proposal structure | PARTIAL [INFERRED from Doc 664] |
| 9 | Aragon Async Governance (docs.aragon.org) | Async execution, governance modules, on-chain voting | PARTIAL [INFERRED] |
| 10 | Optimystics Respect.Games (optimystics.io/tools) | Async Respect Game app, UI patterns, contribution flow | PARTIAL [INFERRED from Doc 4] |
| 11 | orclient SDK (npm @ordao/orclient v1.4.4) | API reference, proposeBreakoutResult, vote, execute | FULL [KNOWN from Doc 056] |
| 12 | Optimism OP Mainnet (Etherscan) | Chain ID 10, gas costs, Respect contract addresses | FULL [KNOWN from Doc 056] |

### Secondary Sources (PARTIAL)

| # | Source | Notes |
|---|--------|-------|
| 13 | ENS Text Records (docs.ens.domains) | Optional Phase 2 identity enrichment |
| 14 | EIP-191 Signed Messages (eips.ethereum.org/EIPS/eip-191) | Phase 2 wallet binding standard |
| 15 | Gitcoin Passport (app.passport.xyz) | Optional Phase 2+ Sybil detection |

### FAILED Sources (Not Fetched)

| # | URL | Reason | Workaround |
|---|---|---|---|
| 16 | https://github.com/Optimystics/Respect.Games | 404 (repo may be private or archived) | Used Optimystics.io + Doc 4 instead |
| 17 | GitHub Projects GraphQL API (advanced) | Complexity not needed for MVP | REST API sufficient |
| 18 | Reddit (governance tools) | Claude cannot fetch Reddit | Not critical; inferred from other sources |

### Build-Ready References

| Repo / Tool | Purpose | Version | Notes |
|---|---|---|---|
| `bettercallzaal/zaoos` | ZAO OS codebase (reference for stack) | Latest | Hono already used; Tailwind styling |
| `@ordao/orclient` | ORDAO SDK for Phase 2 | 1.4.4 | Available on npm |
| `hono` | Web framework | 4.x | Edge-runtime compatible |
| GitHub API | Repo + Discussions + Issues + Projects | v3 REST | Documented; stable |

**Total sources evaluated:** 18 unique sources (10 FULL, 5 PARTIAL, 3 FAILED)

---

## 17. Estimated MVP Phase 1 Build Timeline

### Best Case (Pair Programming with Claude Code Subagent)

- **Day 1:** Setup + Hono scaffold + GitHub App manifest + webhook skeleton (2 days of work → 1 calendar day in pair mode)
- **Day 2:** Webhook handlers (issue.opened validation, logging) + unit tests
- **Day 3:** Cron functions (openSession, snapshotVotes) + Projects board integration
- **Day 4:** tallyResults (Borda count logic) + results posting to Discussion
- **Day 5:** Public leaderboard UI + deploy to Vercel + manual testing alpha

**Total:** 5 calendar days (10 work days in parallel pair mode)

### Realistic Solo Developer Timeline

- **Week 1:** Setup + webhooks + cron skeleton
- **Week 1.5:** tallyResults implementation + testing
- **Week 2:** Leaderboard UI + deployment
- **Week 2.5:** Alpha testing + bug fixes

**Total:** ~2.5-3 weeks solo

### ZAO Parallel Approach (Recommended)

- **Next available sprint:** Zaal + Claude Code subagent pair on Phase 1 (5 calendar days, ~10 work days)
- **Post-alpha (1 week):** Run live alpha cycle at ZAO (Mon-Sun, 1 full week)
- **Feedback loop (3 days):** Iterate based on live feedback
- **Phase 2 readiness:** By week 3 of development (if fast-tracked)

---

## 18. Success Criteria (Phase 1)

### Functional

- [ ] GitHub App installable on any repo; no manual setup beyond installation
- [ ] Monday 6pm EST: Discussion opens automatically, Projects board created
- [ ] Contributions submitted as Issues (Mon-Fri) appear on Projects board with label auto-validated
- [ ] Saturday EOD: Voters can drag-and-drop Issues on Projects board; bot snapshots order
- [ ] Sunday EOD: Tally completes in < 5 seconds; results posted to Discussion (markdown table)
- [ ] Public leaderboard renders correctly; shows Respect scores + recent activity

### Performance

- [ ] Webhook handlers respond in < 500ms
- [ ] Tally job completes in < 5 seconds (50 issues, 5 voters)
- [ ] Public leaderboard loads in < 2 seconds (cached JSON)
- [ ] GitHub API quota usage < 10% per week

### User Experience

- [ ] ZAO runs 1 full cycle (Mon-Sun) with Frapp-GH in parallel to Discord bot; results match Discord
- [ ] 5+ contributors submit
- [ ] 3+ voters participate
- [ ] Results posted + validated by Zaal

### Code Quality

- [ ] 80%+ unit test coverage (Borda count, webhook validation)
- [ ] TypeScript strict mode enabled
- [ ] No console errors in Vercel logs
- [ ] README + inline comments explain each function

---

## Conclusion

Frapp-GH fills a precise gap: **GitHub-native async governance with verifiable contributions**. It's the only tool that is simultaneously (1) where developers already are, (2) composable into open-source communities, and (3) aligned with ZAO's fractal philosophy.

**Phase 1 MVP is buildable in 2-3 sprint-weeks** using Hono + GitHub App + Borda count aggregation. **No new dependencies** (all stack already used at ZAO). **No on-chain complexity** (stays off-chain, results posted to Discussion).

**Phase 2 adds on-chain bridge** (ORDAO submission, Respect1155 minting). **Phase 3 adds federation** (cross-repo leaderboard, forkable rules).

The architecture is intentionally **minimal and boring**: GitHub is the database, git is the log, Vercel is the compute, REST API is the interface. No custom UI frameworks, no sidecar services, no devops overhead.

**Frapp-GH can be the reference implementation for "fractal as code review process"** - a frame that resonates with developers, open-source maintainers, and DAO operators alike.

---

## Appendix: Code Repository Structure (Phase 1)

```
frapp-gh/
├── .github/
│   ├── workflows/
│   │   ├── fractal-open.yml       # Mon 6pm: open session
│   │   ├── fractal-snapshot.yml   # Sat EOD: snapshot votes
│   │   └── fractal-tally.yml      # Sun EOD: tally results
│   ├── frapp-gh/
│   │   ├── week-{N}/
│   │   │   └── state.json         # Per-week state
│   │   └── vote-snapshots/
│   │       └── week-{N}.json      # Voter rankings (Sat snapshot)
│   └── app.yml                    # GitHub App manifest
│
├── src/
│   ├── api/
│   │   ├── webhook.ts             # POST /webhook/github (issue events)
│   │   ├── tally.ts               # POST /api/v1/tally/{week}
│   │   ├── votes.ts               # GET /api/v1/votes/{week}
│   │   └── leaderboard.ts         # GET /api/v1/leaderboard (public)
│   │
│   ├── lib/
│   │   ├── github-api.ts          # GitHub REST API helpers
│   │   ├── borda-count.ts         # Voting aggregation (Borda)
│   │   ├── respect-scorer.ts      # 2x Fibonacci distribution
│   │   ├── types.ts               # FrameworkConfig, WeekState, etc.
│   │   └── config-loader.ts       # Load frapp-gh.config.json
│   │
│   └── handlers/
│       ├── webhook-handlers.ts    # validateIssue, logSubmission
│       ├── cron-handlers.ts       # openSession, snapshotVotes, tally
│       └── formatting.ts          # markdown table generation
│
├── public/
│   ├── index.html                 # Leaderboard UI (static)
│   ├── style.css                  # Tailwind v4 (ZAO design)
│   └── leaderboard.json           # Generated weekly
│
├── scripts/
│   ├── tally.ts                   # Local tally script (for testing)
│   └── setup.ts                   # Initialize repo (create app.yml)
│
├── tests/
│   ├── borda-count.test.ts        # Voting aggregation tests
│   ├── webhook.test.ts            # Issue validation tests
│   ├── respect-scorer.test.ts     # Fibonacci distribution tests
│   └── fixtures/
│       ├── sample-issue.json      # Mock GitHub Issue
│       └── sample-votes.json      # Mock voter rankings
│
├── frapp-gh.config.json           # Repo config (community, rules, etc.)
├── package.json                   # Dependencies: hono, @octokit, jest
├── tsconfig.json                  # TypeScript strict mode
├── README.md                       # Setup guide + API reference
├── ARCHITECTURE.md                # This PRD (saved as reference)
└── .env.example                   # GitHub App private key, webhook secret
```

**Total estimated files:** ~25 source files, ~10 test files, ~3 workflow files

**Total estimated lines of code (Phase 1 MVP):**
- Backend logic: ~800 lines (webhook + cron handlers + Borda count)
- Types + utilities: ~200 lines
- Tests: ~400 lines (80% coverage)
- Frontend (leaderboard): ~200 lines (HTML + CSS + fetch)
- Configuration + docs: ~100 lines
- **Total: ~1700 lines of TypeScript + YAML + HTML**

---

END OF FRAPP-GH PRD
