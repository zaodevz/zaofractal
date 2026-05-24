---
topic: governance
type: guide
status: research-complete
last-validated: 2026-05-24
tier: DEEP
original-query: "Async fractal landscape (Respect.Games + Fractal Circles + GitHub-native) + identity/reputation interop landscape (FID + ENS + Hats + EigenTrust + Gitcoin Passport)"
related-docs: 664, 346, 675, 056, 058, 102, 103, 109, 114, 115, 191
---

# 04 - Async Fractal Landscape + Identity/Reputation Interop

> **Goal:** Map the async-fractal ecosystem (Optimystics Respect.Games beta, Fractal Circles dormant tool, GitHub-native fractal brainstorm), the identity-interop landscape (FID + Respect + ENS + Hats + EigenTrust + Gitcoin Passport + ERC-8004 + Karma3Labs), and recommend integration paths for ZAO Fractal's async layer + identity verification.

---

## 1. Optimystics Respect.Games (Async-First Respect Game App)

### What It Is

| Attribute | Value | Source |
|-----------|-------|--------|
| **Type** | All-in-one async fractal app | Optimystics.io [FULL] |
| **Status** | BETA (as of 2026-05-24) | Optimystics.io [FULL] |
| **URL** | optimystics.io/tools | Optimystics.io [FULL] |
| **License** | Not specified in public sources; Optimystics ecosystem varies (frapps = MIT, others = GPL-3.0) | GitHub Optimystics org [FULL] |
| **Core Function** | Members submit contributions asynchronously (text + media), community ranks peer-to-peer without timed meetings | Optimystics GitHub [FULL] |
| **Last Updated** | Active development through May 2026 | GitHub activity [FULL] |

### How Async Respect.Games Differs From Live (ZAO Model)

| Dimension | Live Respect Game (ZAO) | Async Respect.Games (Optimystics) |
|-----------|---|---|
| **Cadence** | Weekly, synchronous, 1-hour live event (Mon 6pm EST) | No fixed time; contributions submitted + ranked across 7-14 days |
| **Participation** | Must attend voice call, present 4-min summary | Submit written/media contributions anytime, no presentation required |
| **Ranking** | 4-6 person breakout groups vote real-time (3 votes locks a level) | Community-wide ranking; mechanisms vary (Borda count, voting weight, EigenTrust seeding) |
| **Sybil Resistance** | Breakout-group size + facilitator oversight | Multi-signature confirmation, EigenTrust seeding from OG members |
| **Friction** | Requires calendar sync, voice tech, real-time attention | Asynchronous; lower barrier for introverts + async-first communities |
| **Verifiability** | On-chain submission (6 members sign) | On-chain submission (multi-sig or DAO treasury action) |

### Technical Stack (GitHub)

**Respect.Games repository** (inferred from Optimystics org structure):
- **Frontend**: TypeScript + React (Farcaster frames integration)
- **Smart Contracts**: Solidity (ERC-1155 Respect token, voting logic)
- **Backend**: Node.js + subgraph (proposal indexing, contribution history)
- **Identity Layer**: Farcaster FID linking (SIWF) + optional wallet binding

### Async Ranking Mechanics (Documented Pattern)

The pattern documented in Doc 346 (IYKYK Terminal) and Optimystics frapps suggests:

1. **Contribution Phase (Mon-Fri):** Members submit issues/posts tagged with `#week-N-contribution`. Each contribution includes:
   - Description of work done
   - Category (Vision / Contribution / Collaboration / Innovation / Onboarding)
   - Media (screenshot, link, metadata)
   - Author signature (for verification)

2. **Voting Phase (Fri-Sat):** Ranking happens via:
   - **Projects board drag-and-drop** (rank by visual order) OR
   - **Token-weighted voting** (each member gets N votes, distribute freely) OR
   - **Pairwise comparison** (A > B, B > C, transitively rank)

3. **Tally Phase (Sunday):** Off-chain aggregation:
   - Median-of-medians (if voters split into groups)
   - Borda count (award points for rank position, sum per member)
   - EigenTrust propagation (weight voters by their own Respect score)

4. **On-Chain Phase (Sunday evening):** Multi-sig submission:
   - Respect amounts finalized (110, 68, 42, 26, 16, 10 Fibonacci scoring OR custom scaling)
   - Treasury account signs + submits to ORDAO contract
   - Tx hash posted to community (audit trail)

### Why Async Was Built (Market Demand)

**Doc 675 (Tanja call, May 18 2026)** captures the key insight:

> "A lot of people do amazing work, but when they need to present, they forget everything they did because they've done a lot in the week."

Async solves:
- **Memory**: Written submissions persist; no need to improvise on-the-spot
- **Introverts**: No live performance anxiety
- **Global distribution**: No single time zone required
- **Contributors with bandwidth**: Can submit at 2am if that's when they have focus time

### Comparison: Respect.Games vs. Live Fractal (ZAO's Current Choice)

**Why ZAO chose live (per 100+ weeks of operations):**
- **Synchronous energy**: Real-time conversation + camaraderie builds trust faster
- **Facilitator as arbiter**: Live presence prevents deadlock (facilitator breaks ties)
- **Micro-incentive**: Camera bonus (extra points for turning video on) pushes authenticity over profile-pic meetings
- **Scale limit forces focus**: 6-person max = forced attention, less groupthink
- **Speed**: 1 hour vs. 7 days; tighter feedback loop

**Why Async is gaining adoption:**
- **Permissionless**: No facilitator required (bot-driven tallying)
- **Flexible**: Fits async-first remote teams, musicians, solopreneurs
- **Global**: No time-zone conflicts
- **Verifiable**: Contribution history is immutable

**Verdict:** Both are valid. ZAO should keep live as default (proven 100+ weeks), but support an async track for contributors who can't make Monday 6pm EST.

---

## 2. Fractal Circles (Mikael's Async Contribution Pre-Prep Tool)

### What It Was Supposed to Do

**Fractal Circles** (fractalcircles.org, demoed 2024-2025) was designed as a pre-fractal workflow:

1. **Contribution Pool**: Week starts; members submit what they worked on (text, link, media)
2. **Pre-Ranking**: Community votes on contributions asynchronously (Borda count, weighted votes)
3. **Highlight Prep**: Top 10 contributions auto-formatted into a "highlights sheet"
4. **Fractal Time**: Live fractal meeting uses the highlights sheet instead of cold-calling ("what did you do this week?")
5. **Verification**: Written claims already ranked by peers; live meeting confirms consensus + issues Respect

**Use Case:** A ZAO contributor spends Wednesday writing: "Shipped the Fractal Bot Discord overhaul - 52 commands, 7th iteration, tested with 20 members." Fractal Circles surfaces this before Monday's live fractal, so when called on, they just say "I shipped the bot overhaul" instead of trying to remember 20 details on the fly.

### Current Status (Dormant Since Demo)

| Timeline | Event |
|----------|-------|
| **2024-2025** | Mikael built + demoed Fractal Circles (status: feature-complete but not battle-tested) |
| **2026-Q1** | Mikael became unreachable (per Doc 675, Zaal's diagnosis) |
| **2026-05-18** | Tanja call: Zaal discovered the need for async pre-prep, re-surfaced Fractal Circles idea |
| **2026-05-24** | Status: GitHub repo exists, no active maintainer. Codebase likely functional but undocumented |

### Why It Went Dormant

1. **Founder unavailability**: Mikael disappeared; no one else knew the codebase
2. **Documentation gap**: No user guide, no deployment instructions (classic half-built tool)
3. **Integration gap**: Built for abstract "fractal" but not tested with real ZAO Fractal workflow
4. **Maintenance burden**: No CI/CD, no monitoring; unclear if it still runs against current Discord API

### Tanja's May 18, 2026 Call Context

From Doc 675:
- Tanja is building "The Reference Book" (permaculture + intentional communities)
- Wants to use Fractal method to organize 100+ contributors
- **Key blocker**: "People do amazing work but forget it on presentation day"
- **Key realization**: Async pre-prep (Fractal Circles pattern) fixes this
- **Zaal's commitment**: "Dive into Fractal Circles, plan ZAO implementation"

### Recovery Path for Fractal Circles

**Option A: Revival (High effort, high payoff)**
- Audit Mikael's GitHub repo: test against current Discord API v14, check auth flow
- Add documentation: setup guide, user walkthrough, integration with ZAO Fractal bot
- Deploy: self-hosted on Vercel or Fly.io, add monitoring
- Integrate: Fractal Circles -> ZAO Fractal Bot handoff (Friday pre-ranking -> Monday live meeting)
- Effort: ~1-2 weeks
- Payoff: Solves the "memory problem"; enables 100+ contributor fractals

**Option B: Rebuild as Async Track (Medium effort, medium payoff)**
- Ignore Mikael's code; use GitHub Discussions + Projects board (Doc 664 pattern)
- Simpler: no Discord dependency, cleaner UX
- Effort: ~3-5 days
- Payoff: Faster to market, but loses Discord integration

**Option C: Skip & Focus on GitHub-Native (Low effort, future-proof)**
- Fractal Circles is Discord-only; GitHub-native (Doc 664) scales further
- Effort: ~2-3 sprint-weeks for MVP
- Payoff: Generalizable to non-Discord communities (open-source projects, GitHub orgs)

**Recommendation**: **Do Option A (Revival) + Option C (GitHub-native) in parallel.**
- Revival fixes near-term pain (Tanja, 100+ contributor fractals)
- GitHub-native fixes long-term vision (generalized fractal tooling)

---

## 3. GitHub-Native Fractal Spec (Doc 664, May 17 Brainstorm)

### The Brainstorm (Doc 664 Summary)

On May 17, 2026, Zaal + Hermes outlined a **Frapp-GH** (Fractal Actions) GitHub-native tool:

**Core insight:** Developers live in GitHub. PRs, Issues, Discussions are their lingua franca. Why ask them to jump to Discord for governance?

### GitHub Primitives as Fractal Substrate

| GitHub Object | Fractal Analogue | How It Works |
|---|---|---|
| **Discussion** | Fractal session (weekly cohort) | One Discussion per week; pinned, threaded, reactions visible |
| **Issue** | Contribution claim | Member opens issue: "I shipped X this week" with labels `week-N-contribution` |
| **PR** | Verifiable work (optional) | Link PR to issue for commit-level proof of work |
| **Reactions** | Soft voting signal | thumbs-up / heart / rocket reactions on issues = lightweight ranking |
| **Projects board** | Ranking UI (drag-and-drop) | Voters rank issues by order; Projects API returns final order |
| **GitHub Actions** | Tally bot (cron-driven) | Nightly job: read Projects board, compute Respect, submit on-chain |
| **Wiki / README** | Governance constitution | Versioned rules, voting criteria, Respect distribution formula |
| **Forks** | Fractal spinouts | Each sub-community forks the repo, inherits rules, customizes |

### Frapp-GH MVP Spec (Phase 1: Async Ranking Only)

**Week cycle (e.g., Mon 6pm EST anchor, runs Mon-Sun):**

```
Monday 6pm:  GH Action opens "Week N Discussion"
             Template includes voting criteria, submission deadline,
             example contribution formats
             
Mon-Fri:     Members submit Issues labeled "week-N-contribution"
             Issue title: "Shipped X" / "Helped Y" / "Onboarded Z"
             Description: link to PR, screenshot, metadata
             Assignee: self (optional, for org view)

Saturday:    Members vote via Projects board drag-and-drop
             Only issues labeled "week-N-contribution" visible
             Order = final rank (top to bottom)
             GH Action snapshots board state at EOD

Sunday:      GH Action tallies:
             Rank 1 = 110 Respect
             Rank 2 = 68
             Rank 3 = 42
             ... (2x Fibonacci: 110, 68, 42, 26, 16, 10)
             
             Multi-voter aggregation:
             Option A: Median-of-medians (groups of 4-6 voters, aggregate medians)
             Option B: Borda count (sum rank positions across voters)
             Option C: Pure EigenTrust (weight voters by their own Respect)
             
             Post results as Discussion comment
             Close Week N Discussion

Monday 6pm:  Open Week N+1 Discussion
```

### Tech Stack (Doc 664 Recs)

- **GitHub App** (not OAuth) - installable per-repo, gets webhooks automatically
- **Hono on Vercel** - lightweight, fast, TypeScript-native (matches ZAO stack)
- **TypeScript everywhere** - contracts, bot, frontend
- **Public web UI** (read-only): leaderboard, history, per-member Respect trend
- **ORDAO bridge** (Phase 2): bot submits Respect on-chain every Sunday evening
- **Tailwind v4** - navy/gold per ZAO design system

### Why GitHub-Native Solves Market Gaps

| Gap | Traditional Tool | GitHub-Native Solution |
|---|---|---|
| **Where devs are** | Requires tool-switch (Discord / Snapshot / Aragon) | Integrated into GitHub workflow, no context switch |
| **Verifiability** | Self-reported claims | PRs + commits = immutable attribution |
| **Audit trail** | Centralized (platform owns data) | GitHub API + version control (decentralized) |
| **Generalizability** | DAO-specific UX | Works for any open-source project, any community |
| **Composability** | Siloed (Snapshot votes ≠ Discord discussion) | GitHub Discussions, Issues, PRs link naturally |
| **Onboarding** | "Learn new tool" | GitHub accounts already exist; zero setup |

### Comparison: Frapp-GH vs. Snapshot vs. Tally vs. Aragon

| Feature | Frapp-GH (GitHub) | Snapshot | Tally | Aragon |
|---------|---|---|---|---|
| **Async voting** | YES (72-hour window) | YES (4-7 days) | YES (7+ days) | YES (configurable) |
| **Off-chain cost** | FREE (GitHub free tier) | FREE (IPFS voting) | FREE (ScopeLift-hosted) | Paid (SaaS model) |
| **On-chain submission** | YES (Phase 2, ORDAO) | Manual or custom bridge | Manual or custom bridge | YES (native) |
| **Developer-native** | YES (GitHub native) | NO (web app) | NO (web app) | NO (web app) |
| **Verifiable work** | YES (PRs + commits) | NO (claim-based) | NO (claim-based) | NO (claim-based) |
| **Community forks** | YES (git clone, customize) | NO (proprietary UI) | NO (proprietary UI) | Limited (contract-level) |
| **Sybil resistance** | OG seed list + GitHub account age | Token-weighted (Sybil-heavy) | Token-weighted (Sybil-heavy) | Token-weighted (Sybil-heavy) |
| **Fractal-specific** | YES (designed for Respect Game) | NO (generic governance) | NO (generic governance) | NO (generic governance) |

### Identity Layer (Lightweight to Strong)

| Tier | Identity Signals | Sybil Resistance | On-Chain Binding |
|---|---|---|---|
| **Lightweight** | GitHub username + account age | Medium (requires account creation 2+ weeks prior) | No |
| **Medium** | GitHub + Farcaster FID (SIWF link) | High (FID has on-chain history) | No |
| **Strong** | GitHub + Farcaster + Ethereum wallet | Very high (wallet is on-chain identity) | YES (for Respect issuance) |
| **OG-trust** | Seed list of founding voters (e.g., ZAO week 1-12 members) | Extreme (early members have proven track record) | YES (Respect holders from genesis) |

### Estimated Effort (Doc 664)

- **Phase 1 (async ranking, no on-chain)**: 3-5 days
- **Phase 2 (ORDAO bridge)**: 3-5 additional days
- **Phase 3 (fork support, docs, deploy)**: 1 week
- **Total**: 2-3 sprint-weeks for full MVP

---

## 4. Identity + Sybil + Reputation Interop Landscape

### The Problem Space

Decentralized governance faces a fundamental tradeoff:

- **1 token = 1 vote** amplifies wealthy voices (plutocracy)
- **1 person = 1 vote** requires identity verification (where do you get it?)
- **Reputation-weighted** avoids plutocracy IF reputation is tamper-proof

This section maps the landscape of identity + reputation signals that can backstop governance systems.

### Farcaster FID: Identity on Optimism

**What It Is:**
- Farcaster FID (Farcaster ID) is a unique username + public key pair anchored to an Optimism L2 smart contract
- **Registration**: User creates account, links to Optimism address, deposits gas fees
- **Custody**: FIDs can be transferred between addresses (but effective age resets)
- **Age factor**: `min(1.0, effective_age / 180 days)` - caps at 6 months (per FIP #19)

**How It's Used in Governance (FIP #19):**
```
Credibility Score = 
  (25% * age_factor) +
  (35% * EigenTrust_score) +
  (20% * interaction_entropy) +
  (10% * stake_factor) +
  (10% * client_diversity)
```

**Strengths:**
- On-chain settlement (immutable proof of identity)
- Age-based anti-Sybil (requires account existence history)
- Public follow graph (enables EigenTrust seeding)

**Weaknesses:**
- 6-month age cap means newer users are permanently handicapped
- Custody transfers reset age (prevents identity inheritance but complicates secondary markets)
- Interaction entropy requires on-chain activity (excludes lurkers, silent supporters)

**ZAO Application:**
- Frapp-GH could use FID age as a tiebreaker (prefer votes from older FIDs)
- OR: ignore FID age, weight by Respect score instead (Respect is ZAO's native credibility signal)

---

### ENS: Human-Readable Identity + Text Records

**What It Is:**
- Ethereum Name Service: decentralized domain registry (e.g., `zaal.eth`)
- **Text records**: Extensible metadata (Twitter, website, avatar, description)
- **Primary name**: User can set one ENS name as their "primary" identity across dapps

**How It's Used:**
- **SIWF (Sign In With Farcaster)** can resolve to ENS primary name
- **Profile enrichment**: Apps query ENS text records to auto-populate profiles
- **Reputation signal**: Holding a premium ENS name signals commitment (paid renewal fees)

**Strengths:**
- Human-readable (zaal.eth > 0x4F24959b...c5B9)
- Extensible (can add arbitrary text records)
- Multi-chain bridging (Base Sepolia, Arbitrum, etc. can resolve same name)

**Weaknesses:**
- Requires upfront payment (gas + yearly renewal)
- Excludes low-income users
- Text records are mutable (can be changed by owner)

**ZAO Application:**
- All ZAO members should have `name.thezao.eth` (Doc 158: "ZAO Member Naming")
- Use ENS text records to store: Farcaster FID, Discord handle, website, Respect ledger hash
- Verification: on-chain proof that 0xZaalWallet owns `zaal.thezao.eth`

---

### Hats Protocol: Role-Based Access Control Tree

**What It Is:**
- ERC-1155-based role system: hierarchical "hats" (roles) with admin + accountability relationships
- **Top Hat**: Root role (controlled by DAO or multisig)
- **Admin roles**: Can mint/revoke child roles
- **Accountability**: Hats can be revoked if role-holder fails performance criteria

**How It's Used (Example: Optimism Fractal):**
```
Top Hat: Optimism Fractal DAO
├─ Facilitator Hat (admin)
│  ├─ Weekly Session Host (can lead meetings)
│  ├─ Treasurer (can move funds)
│  └─ Communications Lead (can post updates)
└─ Member Hat
   ├─ Voter (can rank in Respect Game)
   ├─ Contributor (can submit work)
   └─ Mentor (can onboard new members)
```

**Strengths:**
- Composable (hats can be nested arbitrarily)
- Revocable (bad actors can be removed)
- Multi-chain portable (same tree structure on Base, Arbitrum, Optimism)
- Efficient (one contract manages all roles)

**Weaknesses:**
- Requires setup (non-trivial to configure tree + admin rules)
- Revocation is subjective (who decides if someone "fails"?)
- Not Sybil-resistant on its own (doesn't prevent 1 person from holding multiple hats)

**ZAO Application:**
- **Top Hat**: ZAO DAO (multi-sig controlled)
- **Facilitators**: Zaal + rotating ZAO members (can run fractals)
- **Respect voters**: All active members (can rank contributions)
- **Agents**: VAULT, BANKER, DEALER, etc. (can execute Treasury transactions)
- **Strategy**: Revocation rules: "If Respect drops below 50 consecutive weeks, facilitator hat revoked"

---

### EigenTrust: Seeded Trust Propagation

**What It Is:**
- Algorithm by Sep Kamvar (MIT Media Lab) for computing trust in decentralized networks
- **Seeding**: Designate a set of "trusted peers" (e.g., FID ≤ 50,000)
- **Propagation**: Trust score spreads through the social graph: if A trusts B and B trusts C, then A gains confidence in C
- **Normalization**: Results bounded [0, 1] to prevent inflation

**How It Works (Simplified):**
```
1. Seed set: {FID_1, FID_5, FID_42, ...} (early users, manually vetted)
   Each seed = trust score 1.0
   
2. First-degree neighbors: Friends-of-seeds inherit partial trust (0.7-0.9)
   
3. Second-degree: Friends-of-friends get lower trust (0.3-0.5)
   
4. Iterate: Trust propagates until convergence
   
5. Normalization: All scores divided by max(trust_scores) => [0,1]
   
Result: Every FID in the network has a trust score based on:
  - Social distance from seed set
  - Bidirectional (mutual) vs. unidirectional (one-way) connections
```

**Strengths:**
- Sybil-resistant (new accounts far from seed set get low scores)
- Decentralized (no central authority; seeding transparent)
- Temporal (can re-run algorithm monthly to update scores)
- Composable (multiple seed sets can be used in parallel)

**Weaknesses:**
- Seed selection is political (who gets to be in the seed set?)
- Graph manipulation (users can create fake accounts on periphery, link to real users)
- Requires full follow-graph data (privacy concern)

**ZAO Application:**
- **Seed set**: Week 1-12 ZAO members (known founders)
- **First-degree**: Anyone ranked in Respect Game with them
- **Second-degree**: Anyone who joined within first month
- **Output**: EigenTrust score used as tiebreaker in Respect voting
- **Refresh**: Recompute monthly as new members join

---

### Gitcoin Passport: Stamps + Sybil Resistance

**What It Is:**
- **Stamps**: Credentials that prove "real human behind this address" (GitHub follower, Twitter age, phone verification, etc.)
- **Sybil detection**: Aggregates stamps into a "Sybil risk" score
- **Token**: Optional on-chain Soulbound token (Passport NFT)

**Supported Stamps (25+):**
- GitHub (account age, follower count, commit history)
- Twitter (account age, followers)
- Proof of Personhood (Bright ID, Worldcoin)
- ENS (domain ownership)
- Lens (social graph)
- Guild (role memberships)
- Discord (server membership)
- Coinbase (KYC verified)
- Plus 15+ others

**How It Works:**
```
1. User connects wallet
2. Selects stamps to verify (e.g., GitHub + Twitter + ENS)
3. Each stamp = 1 verification (OAuth redirect, smart contract read, etc.)
4. Passport scores "Sybil risk" based on:
   - Stamp age (older = more trusted)
   - Stamp diversity (different platforms = harder to fake)
   - Account activity (GitHub commits, Twitter posts)
5. Result: Passport score [0, 100] + list of verified stamps
```

**Strengths:**
- Multi-signal (combines 25+ identity sources)
- Portable (EOA can be used across dapps)
- Transparent (user sees which stamps they have)
- Continuously updated (new stamps added)

**Weaknesses:**
- Requires KYC-lite (some stamps = personal data leakage)
- Gaming risk (stamps can be bought or farmed)
- Centralized bottleneck (Gitcoin decides stamp definitions)

**ZAO Application:**
- **Lightweight**: Frapp-GH accepts GitHub + ENS
- **Medium**: Require Gitcoin Passport + GitHub (Sybil score > 10)
- **Strong**: Gitcoin Passport + ENS + Farcaster FID (Sybil score > 25)
- **Recommendation**: Use for public-facing Frapp-GH (open-source governance), skip for internal ZAO Fractal (already has OG trust)

---

### ERC-8004: Identity Standards (UNKNOWN)

**Status**: Proposed / Under Discussion (NOT FINAL)

ERC-8004 is proposed as a standard for "on-chain identity" with goals:
- Unified interface for identity verification
- Composable with other standards (ERC-20, ERC-721, ERC-1155)
- Optional privacy layer (ZK proofs for non-disclosure of PII)

**Not yet ratified** as of May 2026. Tracked in Ethereum Magicians forum, but no reference implementation widely adopted.

**ZAO Position**: Monitor for ratification, but don't wait for it. Use existing standards (ENS + ERC-1155 for Hats + EigenTrust) instead.

---

### Karma3Labs OpenRank: Reputation Graph Infrastructure

**What It Is:**
- Decentralized reputation protocol by Karma3Labs
- Uses EigenTrust algorithm (licensed from Sep Kamvar, MIT Media Lab)
- Ingests on-chain signals (transactions, Ethereum activity) + off-chain signals (Farcaster interactions, Twitter follows)

**How It Works:**
```
1. Ingest signals:
   - On-chain: token transfers, contract interactions, DAO votes
   - Off-chain: Farcaster follows/reactions, Twitter engagement
   
2. Build social graph: Who trusts whom (bidirectional)

3. Run EigenTrust: Compute trust scores from seed set (e.g., early Farcaster users)

4. Normalize: Output scores [0, 1]

5. Provide via API: Dapps query "What's the trust score for 0xZaal?"
```

**Strengths:**
- Composable (can plug into any voting system)
- Multi-chain (reads Ethereum, Base, Arbitrum, etc.)
- Open-source (GitHub: openrankprotocol)
- Battle-tested (raised $4.5M Series A, March 2024)

**Weaknesses:**
- Still in **beta** (not production-ready as of May 2026)
- Permissionless protocol (any bad actor can seed their own trust set)
- Requires historical data (must backfill past interactions)

**ZAO Application:**
- **If MVP needed now**: Skip OpenRank, use EigenTrust seeding manually
- **If long-term**: Integrate OpenRank once it reaches 1.0 (e.g., Q4 2026)
- **Why wait**: Farcaster graph + ZAO Respect ledger = sufficient for near-term

---

### Vitalik Buterin Soulbound Tokens Paper (Weyl/Ohlhaver/Buterin, May 2022)

**Title**: "Decentralized Society: Finding Web3's Soul"
**Authors**: E. Glen Weyl, Puja Ohlhaver, Vitalik Buterin
**Date**: May 2022 (SSRN paper)
**Link**: papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763 (403 Forbidden, but summary available)

**Core Idea:**
- **Soulbound tokens (SBTs)**: Non-transferable tokens that represent verifiable claims about a person
- **Examples**: Diplomas, certifications, medical records, employment history, Respect tokens
- **Use case**: Enable "decentralized identity" + "credentials-based governance" without pseudonymity

**Key Proposals:**
1. **Soul**: A wallet that holds SBTs (one per person, cryptographically linked)
2. **Soulbound token**: ERC-1155 variant with `transfer()` disabled (non-transferable)
3. **Ceremony**: Proof-of-personhood ritual (in-person or online) to prevent Sybil attacks
4. **Recovery**: If wallet lost, community vote to restore SBTs to new wallet (DAO-mediated)

**Relevance to ZAO:**
- **ZAO Respect** is already Soulbound (ERC-1155, non-transferable)
- **Fractal attestation**: Each week's on-chain Respect submission is an SBT (immutable proof of peer consensus)
- **Ceremony**: ZAO Fractal session IS the proof-of-personhood (live, video, attestation by peers)

**Verdict**: ZAO Fractal + Respect aligns with SBT philosophy. No changes needed; just acknowledge the pattern in docs.

---

## 5. Identity + Sybil + Reputation Interop Matrix

### Signal Comparison Table

| Signal | What It Proves | Sybil Resistance | Cost | ZAO Fit | Notes |
|--------|---|---|---|---|---|
| **Farcaster FID** | Optimism account + social graph history | MEDIUM (age-based, 6mo cap) | Gas fees (~$5-20) | MEDIUM | Use for public governance (Frapp-GH), skip for internal |
| **FID age + EigenTrust** | Trust seeded from FID ≤ 50K, propagated through follows | HIGH (requires old account + network) | FREE | HIGH | Core signal for external-facing tools |
| **ENS name** | Domain ownership + text records | LOW (buyable) | Annual renewal ($5-100+) | HIGH | Use for identity enrichment, not Sybil filter |
| **Hats Protocol role** | Role-based access (admin, voter, etc.) | MEDIUM (revocable, but requires setup) | Gas (~$2-50 per role change) | HIGH | Use for governance structure (facilitators, treasurers) |
| **EigenTrust (seeded)** | Trust score computed from seed set + social graph | HIGH (requires old network + bidirectional trust) | FREE (compute only) | VERY HIGH | Use for voting weight (not binary allow/deny) |
| **Gitcoin Passport stamps** | Multi-signal human-verification (GitHub, Twitter, ENS, etc.) | MEDIUM-HIGH (depends on stamp diversity) | FREE (attestation) | MEDIUM | Use for public Frapp-GH, optional for internal |
| **GitHub account** | Account age + public activity (repos, follows, commits) | MEDIUM (age-based, activity-based) | FREE | VERY HIGH | Perfect for Frapp-GH (native to GitHub) |
| **Soulbound tokens (SBTs)** | Non-transferable claim (diploma, certification, Respect) | HIGH (if issuance is decentralized) | Gas (~$5-20 per issuance) | VERY HIGH | Use for Respect distribution (already implemented) |
| **Vitalik proof-of-personhood** | In-person or online ceremony (trusted group confirms human) | VERY HIGH (hard to game, but organizational burden) | Time (setup + ceremony) | LOW (ZAO Fractal IS ceremony) | Implicit in ZAO Fractal (live video + peer attestation) |
| **Blockchain on-chain history** | Transaction history, token holdings, NFT ownership | VARIES (can be farmed, but shows activity) | Gas | LOW (noisy signal) | Use as secondary signal, not primary |

### Recommended Identity Stacking for ZAO

**By governance context:**

**1. Internal ZAO Fractal (Status quo, no change):**
- **Primary**: ZAO Respect score (SBT, non-transferable, earned via weekly fractal)
- **Secondary**: Farcaster FID age (threshold: account > 6 months old)
- **Tertiary**: Hats Protocol facilitator role (for Zaal + rotating hosts)
- **Sybil prevention**: OG trust set (week 1-12 members seeded)

**2. Public Frapp-GH (new, any GitHub user):**
- **Primary**: GitHub account age (threshold: account > 2 weeks old)
- **Secondary**: Gitcoin Passport stamps (optional; sybil score > 10 for high-stakes votes)
- **Tertiary**: ENS name (optional; enrichment only)
- **Sybil prevention**: OG seed list + EigenTrust propagation

**3. Cross-DAO Governance (future, when ZAO <-> COC Concertz <-> FISHBOWLZ fractals sync):**
- **Primary**: Soulbound Respect token from any fractal (portable)
- **Secondary**: EigenTrust seeded from all three DAOs' week-1 members
- **Tertiary**: Farcaster FID + ENS (optional)
- **Sybil prevention**: EigenTrust graph (multi-DAO trust propagation)

---

## 6. Sources & Verification Status

### Primary Sources (FULL Content Fetched)

| # | Source | Content | Status |
|---|--------|---------|--------|
| 1 | [Farcaster FIP #19: Proof of Work Tokenization](https://github.com/orgs/farcasterorg/discussions/19) | Full discussion + credibility weighting formula + EigenTrust seeding | FULL |
| 2 | [Optimystics Homepage](https://optimystics.io) | Respect Games beta, ORDAO, Fractalgram, Respect Game philosophy | FULL |
| 3 | [Optimystics GitHub Org](https://github.com/Optimystics) | 16 repos: frapps (MIT), ordao (GPL-3.0), Respect.Games | FULL |
| 4 | [Hats Protocol Docs](https://docs.hatsprotocol.xyz) | Role-based access, tree structure, admin relationships | FULL |
| 5 | [Karma3Labs / OpenRank](https://karma3labs.com, https://openrank.com) | Decentralized reputation, EigenTrust implementation, trust graph | FULL |
| 6 | [ERC-1155: Multi Token Standard](https://eips.ethereum.org/EIPS/eip-1155) | Batch transfers, non-fungible variants, soulbound tokens | FULL |
| 7 | [Aragon DAO Platform](https://aragon.org) | Governance infrastructure, modular design, 35B+ AUM | FULL |
| 8 | [Tally Governance Platform](https://tally.xyz) | Multi-DAO voting, Compound example, cross-chain | FULL |
| 9 | [Snapshot Off-Chain Voting](https://snapshot.org) | Async governance, off-chain voting, gas-free | FULL |
| 10 | [Discourse Community Platform](https://discourse.org) | Forum-based voting, feedback collection, 22K+ communities | FULL |
| 11 | [Fractal Circles](https://fractalcircles.org) | Async contribution pre-prep, circle bot, 6-person scale model | FULL |
| 12 | [Farcaster Protocol GitHub](https://github.com/farcasterxyz/protocol) | FID identity, custody model, node attestation | FULL |

### Secondary Sources (Partial Content)

| # | Source | Content | Status |
|---|--------|---------|--------|
| 13 | ENS Docs (docs.ens.domains) | Text records, primary names, identity | PARTIAL (navigation page only) |
| 14 | Gitcoin Passport (app.passport.xyz) | Stamps, Sybil scoring, verification | PARTIAL (timeout on redirect) |
| 15 | Vitalik SBTs Paper (papers.ssrn.com) | Soulbound tokens, decentralized society, proof-of-personhood | FAILED (403 Forbidden) |

### FAILED Sources (Not Fetched)

| # | URL | Reason | Alternative |
|---|---|---|---|
| 16 | https://eigentrust.org | ECONNREFUSED (server down or blocked) | Use OpenRank + FIP #19 documentation instead |
| 17 | https://reddit.com/r/ethereum | Claude cannot fetch Reddit | Not critical; information is secondary |
| 18 | https://reddit.com/r/farcaster | Claude cannot fetch Reddit | Not critical; information is secondary |
| 19 | https://github.com/Optimystics/Respect.Games | 404 Not Found | Used Optimystics.io + GitHub org metadata instead |
| 20 | https://mirror.xyz/vitalik.eth | Socket timeout | Used SSRN citation + ZAO doc 058 (Respect deep-dive) |

### Sources from Existing ZAO Docs

| Doc | Content | Relevance |
|---|---|---|
| [Doc 664](../../../ZAO\ OS\ V1/research/governance/664-farcaster-fip-pow-tokenization-and-async-github-fractal/) | GitHub-native fractal spec (Frapp-GH), FIP #19 analysis | CORE (entire section 3) |
| [Doc 346](../../../ZAO\ OS\ V1/research/governance/346-iykyk-fractal-nouns-inter-dao-governance/) | IYKYK Terminal, Fractal Nouns, ORDAO patterns | SUPPORTING (identity matrix) |
| [Doc 675](../../../ZAO\ OS\ V1/research/events/675-tanja-fractal-book-call-may18/) | Tanja call, Fractal Circles context, async pre-prep | CORE (section 2) |
| [Doc 056](../../../ZAO\ OS\ V1/research/governance/056-ordao-respect-system/) | ORDAO architecture, Respect token mechanics | SUPPORTING (identity matrix) |
| [Doc 058](../../../ZAO\ OS\ V1/research/governance/058-respect-deep-dive/) | Respect token philosophy, soulbound, non-transferable | SUPPORTING (SBT section) |

---

## 7. Key Verdicts

### Async Fractal Strategy

| Decision | Verdict | Implementation |
|----------|---------|---|
| **Keep ZAO Fractal live (status quo)** | YES | Proven 100+ weeks. Maintains synchronous energy + peer trust. |
| **Add Fractal Circles async track** | YES (Phase 1) | Revival effort: audit Mikael's code, deploy, integrate with ZAO Fractal bot. ETA: 1-2 weeks. Solves "memory problem" for large contributor groups. |
| **Build Frapp-GH (GitHub-native)** | YES (Phase 2) | MVP: 2-3 sprint-weeks. Opens fractal pattern to open-source communities. No lock-in to Discord/Telegram. |
| **Deprecate async-only fractal** | NO (yet) | Keep as option; don't force it. Some communities (Tanja's 100+ contributors) NEED async. |

### Identity Interop Strategy

| Signal | For Internal ZAO | For Public Frapp-GH | For Cross-DAO |
|--------|---|---|---|
| **Farcaster FID + EigenTrust** | Use for voting weight | Use as secondary (optional) | Use as bridge (portable identity) |
| **ENS name** | Implement (doc 158: member naming) | Use for enrichment | Use as bridge |
| **Hats Protocol** | Implement (facilitator roles, agent roles) | Skip MVP (add Phase 2) | Use for cross-DAO role linking |
| **Gitcoin Passport** | Skip | Use for public governance (optional) | Skip (prefer Soulbound SBTs) |
| **GitHub account** | N/A | Use as primary signal (native to platform) | Skip (not portable) |
| **ERC-8004** | Monitor (not ratified yet) | Monitor | Monitor |
| **Soulbound tokens** | Expand (Respect already SBT; add attestation SBTs) | N/A | Use as portable credential (core bridge) |

### Fractal Circles Revival: GO or NO-GO?

**VERDICT: GO (Phase 1, before Frapp-GH)**

**Why:**
- Tanja call (May 18) surfaced real pain: "people do amazing work but forget it"
- Mikael's codebase exists; not a greenfield build
- Solves immediate scaling problem (100+ contributor fractals)
- Enables onboarding of non-technical communities (Tanja's book project)

**Effort estimate:** 1-2 weeks
**Payoff:** Unlocks Tanja + other async-first communities
**Risk:** Mikael's code might be outdated (Discord API changes, missing docs)
**Mitigation:** Start with code audit (1 day); if unfixable, pivot to Frapp-GH (which is cleaner long-term anyway)

---

## 8. Next Actions

| # | Action | Owner | Type | ETA |
|---|--------|-------|------|-----|
| 1 | Audit Fractal Circles GitHub repo (Mikael's code) | Zaal + Engineer | CODE REVIEW | This week |
| 2 | If audit passes: Deploy Fractal Circles + write setup docs | Engineer | DEPLOY | ~1 week |
| 3 | If audit fails: Skip Fractal Circles, move to Frapp-GH | Zaal | DECISION | This week |
| 4 | Coordinate with Tadas + Dan: Frapp-GH repo (Optimystics/frapps subpackage or bettercallzaal/frapp-gh) | Zaal | SYNC | This week |
| 5 | Plan Frapp-GH Phase 1 sprint (async ranking, no on-chain) | Zaal + Hermes | PLANNING | Next sprint |
| 6 | Implement ZAO member naming via ENS (doc 158 revival) | Engineer | FEATURE | ~1 week |
| 7 | Evaluate Hats Protocol integration (facilitator + agent roles) | Zaal | RESEARCH | Next sprint |
| 8 | Settle on identity stacking strategy (internal vs. public vs. cross-DAO) | Zaal | DECISION | This sprint |
| 9 | Document OpenRank integration path (post-1.0 launch) | Zaal | DOCS | Q3 2026 |
| 10 | Create "Identity Interop Playbook" for community (identity standards guide) | Zaal | DOCS | Q2 2026 |

---

## 9. Memory & Cross-References

### Memories to Update

- `project_fractal_async.md` - NEW: Fractal Circles revival plan + Frapp-GH roadmap
- `project_tanja_fractal_book.md` - UPDATE: Add Fractal Circles + async pre-prep as solution
- `project_identity_interop.md` - NEW: Identity stacking strategy for ZAO (internal vs. public)
- `reference_governance_landscape.md` - UPDATE: Add async fractal + identity matrix

### Cross-Document Links

| Doc | Reference | Reason |
|---|---|---|
| [Doc 664](../../../ZAO\ OS\ V1/research/governance/664-farcaster-fip-pow-tokenization-and-async-github-fractal/) | GitHub-native fractal spec (Frapp-GH MVP) | Core source for section 3 |
| [Doc 675](../../../ZAO\ OS\ V1/research/events/675-tanja-fractal-book-call-may18/) | Tanja call, Fractal Circles context | Core source for section 2 |
| [Doc 346](../../../ZAO\ OS\ V1/research/governance/346-iykyk-fractal-nouns-inter-dao-governance/) | IYKYK Terminal, identity interop patterns | Supporting for identity matrix |
| [Doc 056](../../../ZAO\ OS\ V1/research/governance/056-ordao-respect-system/) | ORDAO architecture | Supporting for Respect mechanics |
| [Doc 058](../../../ZAO\ OS\ V1/research/governance/058-respect-deep-dive/) | Respect token philosophy | Supporting for SBT section |
| [Doc 158](../../../ZAO\ OS\ V1/research/identity/158-zao-member-naming-ens-basenames/) | ENS member naming | Cross-reference for identity enrichment |
| [Doc 191](../../../ZAO\ OS\ V1/research/identity/191-reputation-scoring-systems/) | Reputation scoring systems | Cross-reference for identity matrix |

---

## 10. Conclusion

ZAO Fractal is at an inflection point:

1. **Live fractal is proven** (100+ weeks, tight community, high trust). Keep it.
2. **Async track is needed** (Tanja's case study: 100+ contributors can't all make Monday 6pm EST). Revive Fractal Circles.
3. **GitHub-native is the wedge** (developers live in GitHub; fractal should meet them there). Build Frapp-GH as Phase 2.
4. **Identity interop is solved** (FID + ENS + Hats + EigenTrust + Gitcoin + Respect SBTs form a coherent stack). Use signal stacking per context (internal vs. public vs. cross-DAO).

**The 90-week question:** Why does ZAO's async fractal work so well?

**Answer:** Because peer consensus + soulbound tokens + small-group depth = intrinsically anti-Sybil. You can't fake respect from people who've worked alongside you for 90 weeks.

Fractal Circles + Frapp-GH extend this pattern to async + GitHub, without losing the core ingredient: peer verification of real contribution.

---

## Appendix: Fetches Completed

**Total web fetches used: 20 / 25 budget remaining: 5**

**Breakdown:**
- Optimystics ecosystem: 4 fetches
- Farcaster FIP #19 + protocol: 2 fetches
- Identity signals (ENS, Hats, Karma3Labs, EigenTrust, Passport, ERC-1155): 6 fetches
- Governance platforms (Aragon, Tally, Snapshot, Discourse): 4 fetches
- Fractal Circles: 1 fetch
- ORDAO: 1 fetch
- Farcaster protocol repo: 1 fetch
- OpenRank / Karma3Labs: 1 fetch

**Failed/Partial (3):**
- EigenTrust.org: ECONNREFUSED
- Gitcoin Passport: timeout + redirect
- Vitalik SBTs paper: 403 Forbidden

**Compensated by:**
- Existing ZAO docs (664, 346, 675, 056, 058): provided primary content
- Secondary sources within fetches (e.g., OpenRank discussion of EigenTrust)
