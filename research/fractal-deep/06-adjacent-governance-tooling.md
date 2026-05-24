---
topic: governance
type: guide
status: research-complete
last-validated: 2026-05-24
tier: DEEP
original-query: "DEEP coverage of governance tools and frameworks adjacent to ORDAO that ZAO should understand to make informed integration decisions: Hats, Snapshot, Pol.is, Loomio, Decidim, Consul, Sociocracy 3.0, Safe, Tally, Aragon OSx"
---

# 06 - Governance Tooling & Frameworks Adjacent to ORDAO/Fractal

Hub-level synthesis of 10 governance tools and frameworks adjacent to ORDAO/Respect-based fractal democracy. ZAO Fractal must understand these tools to make informed integration decisions: which to adopt, which to pilot, which to reference-only.

Key context: ZAO already uses Hats Protocol (Optimism Fractal, bot has `/hats` command) and Snapshot (ZAO Fractal bot polls every 5 min). This doc places both in deeper architecture context and surveys the wider deliberative-democracy ecosystem (Pol.is, Loomio, Decidim, Consul, Sociocracy 3.0), plus the DAO baseline comparisons (Safe, Tally, Aragon OSx).

---

## 1. Hats Protocol

### What It Is

Hats Protocol is a programmable, hierarchical role and permission system deployed on Ethereum (and 8 other mainnets). Hats are soulbound, non-transferable ERC-1155-like tokens that grant wearers specific organizational roles and permissions.

### Architecture / How It Works

**Hat Properties:** Each hat contains an ID (256-bit bitmap), metadata, supply cap, admin designation, eligibility rules, toggle status, and IPFS details. Hat IDs encode the complete admin chain as a path through a tree.

**Hat Trees:** Hats form hierarchical structures where one hat can serve as admin for another, creating branches of delegated authority. The root is a "tophat" (always 1 wearer per org) that serves as its own admin. Tree structure is immutable once created.

**Token Architecture:** Hat IDs are 256-bit bitmaps where the first 32 bits identify the tophat "domain," with subsequent 16-bit chunks representing hierarchy levels. Supports up to 15 levels deep from a tophat. Example: ZAO Fractal Tree 226 has 17 project sub-hats.

**Wearer Status:** Depends on three factors: token balance (holds hat), hat activity status (active/inactive), and eligibility determination (external module decides if wearer qualifies). All three must be true to wear a hat.

**Eligibility & Toggle Modules:** External contracts govern who can wear hats (eligibility) and when hats remain active (toggle). Hats Protocol ships 15+ ecosystem modules:
- ERC-20, ERC-721, ERC-1155 balance eligibility (token-gated hats)
- Staking eligibility with Judge Hat enforcement
- Allow-list eligibility (hand-curated)
- Hat-wearing eligibility (role prerequisites)
- Hats Election eligibility (governance council elections)
- CoLinks eligibility (Coordinape reputation)
- Unlock Protocol membership (subscription-gated hats, auto-revoke on lapse)
- Gitcoin Passport / Human Passport (Sybil resistance)

**Toggle Modules:** Seasonal time-expiry (auto-disable on date) and pass-through hat-based toggles (deactivate one hat if another becomes inactive).

**Hats Signer Gate v2:** Connects hats to Safe multisig signers. ABSOLUTE thresholds (e.g., always 3-of-N) or PROPORTIONAL thresholds (e.g., 51% of signers). Dynamically adjusts as signers join/leave.

**Hats Account (ERC-6551):** Each hat gets a deterministic smart contract account that can send/receive ETH, ERC-20, ERC-721, ERC-1155, sign messages, vote in Moloch DAOs.

**Grafting:** Independent hat trees can be linked via request-approve process without destroying existing structures.

### License + Repo

MIT License. [github.com/Hats-Protocol](https://github.com/Hats-Protocol)

### Adoption

Adopted by Optimism Collective (Sages Council uses Hats tree), Moloch DAOs, Aave Governance, Nouns DAO, and 100+ other on-chain organizations. Hats Protocol MCP server now enables AI agents to manage roles.

### Integration Pattern with ORDAO / Respect

**Hats for "who can act", ORDAO for "what gets executed".** Hats determine eligibility: e.g., Configurator wearers can initiate OREC proposals. Only hats with Respect voting power participate in ORDAO execution. Together: Hats Protocol defines role-based access control (AuthN), ORDAO defines Respect-weighted decision-making (AuthZ + execution).

Hats Signer Gate v2 can connect ZAO's treasury Safe to Configurator hats - signing authority automatically tracks hat wearers.

ERC-1155 Eligibility module enables self-service hat claiming for $ZOR holders, removing admin bottleneck.

### ZAO Verdict

**USE (HIGH PRIORITY).** Already integrated; wire it deeper:
- Enable hat-based access to ZAO OS Governance "Manage" tab (currently FID-gated, not hat-gated).
- Replace sequential RPC hat-fetching with `@hatsprotocol/sdk-v1-subgraph` GraphQL (faster for large trees).
- Deploy ERC-1155 Eligibility module for $ZOR-gated self-service hat claiming.
- Integrate Hats MCP server into ElizaOS AI agent for governance queries.
- Connect treasury Safe to HSG v2 with PROPORTIONAL thresholds.

---

## 2. Snapshot

### What It Is

Snapshot is an off-chain, gasless governance voting platform that verifies votes on-chain (via signature) but executes votes off-chain. No transaction cost; high transparency.

### Architecture / How It Works

**Spaces & Strategies:** Users create governance "spaces" and define "strategies" (voting power calculation rules). Strategies include: erc20-balance-of (token-weighted), nft-balance-of (NFT-weighted), custom Respect-weighted, quadratic (cost escalates), conviction-voting (time-locked). Custom strategies can combine multiple sources.

**Voting Types:** Single-choice (pick one), ranked-choice (rank all), approval (pick multiple), quadratic (budget-constrained), weighted (allocate 100 points).

**Off-Chain Architecture:** Proposals posted to Snapshot hub (hub.snapshot.org) with IPFS metadata. Voting happens on-chain via signed messages (ERC-712). No gas fees; signature only. Results recorded on-chain or IPFS. Snapshot bot can mirror votes to on-chain contracts.

**Safe Integration:** Standard pattern is Snapshot vote -> Safe execution. Proposal includes Safe module address; when voting closes, the Safe module triggers execution. Most common DAO governance pattern at scale.

**Strategies Relevant to Fractal:** 
- erc1155-balance-of (for ZOR token, native to ZAO)
- Custom Respect-weighted strategies (implemented as contract returning voting power per address)
- Conviction voting (charge-over-time strategies)

### License + Repo

Snapshot.js SDK is MIT License. Platform operates at snapshot.org. [github.com/snapshot-labs](https://github.com/snapshot-labs)

### Adoption

100+ DAOs including Uniswap, Aave, ENS, Nouns, Optimism, Arbitrum. Snapshot pages for each DAO track all proposals and votes permanently (searchable, auditable history).

### Integration Pattern with ORDAO / Respect

**Complement OREC for non-Respect-weighted polls.** OREC is on-chain, optimistic-veto execution. Snapshot is off-chain, pure voting + history. ZAO can use both:
- Weekly Respect Game (on-chain, ORDAO, Respect-weighted) for decision execution.
- Weekly Snapshot polls (off-chain, ZOR or custom Respect strategy) for sentiment/priority gathering before fractal sessions.
- Monthly larger Snapshot vote (broader signal, not binding) for community values check.

Snapshot voting history is permanent and publicly visible - compliance + auditability benefit over pure on-chain gas-expensive votes.

ZAO Fractal bot v2.1 already polls Snapshot every 5 min and posts results + closing warnings to Discord. Embed Snapshot widget in ZAO OS governance tab.

### ZAO Verdict

**USE (HIGH PRIORITY).** Already integrated (bot polls every 5 min); deepen:
- Wire Snapshot results into OREC as signals (not binding, but context for on-chain execution).
- Create weekly priority Snapshot poll (Monday 6PM EST - next Monday 6PM EST) aligned with fractal schedule.
- Use custom ERC-1155 Respect-weighted strategy OR erc1155-balance-of for ZOR.
- Embed Snapshot space iframe in ZAO OS Governance tab so members vote in-app.

---

## 3. Pol.is

### What It Is

Pol.is is a real-time statement-clustering deliberation tool. Participants submit statements and vote on others' statements; the platform clusters participants by opinion alignment and surfaces cross-cutting consensus (statements that bridge groups).

### Architecture / How It Works

**Deliberation Loop:** 
1. Facilitator seeds 3-5 opening statements (e.g., "Uber should be allowed in the city because competition lowers prices").
2. Participants vote "agree," "disagree," or "pass" on each statement.
3. Participants can add new statements.
4. AI clustering groups participants into opinion clusters (e.g., "pro-Uber," "pro-taxi," "pro-regulation").
5. Platform surfaces "bridging statements" - statements that get agreement from multiple clusters.

**Key Insight:** Surface latent consensus, not winner-take-all voting. Taiwan 2015 Uber-vs-taxi debate had ~equal opinion clusters on the surface; below the surface 92% agreed on safety + insurance outcomes. Pol.is found that 92% consensus and policy was built on it.

**Open-Source:** AGPL license. compdemocracy/polis on GitHub. Free to use for nonprofits and governments.

**Deployment:** Docker-based, self-hostable. pol.is runs public instances.

### License + Repo

AGPL-3.0. [github.com/compdemocracy/polis](https://github.com/compdemocracy/polis)

### Adoption

Taiwan vTaiwan (official e-participation platform, 2015-present), Bowling Green community deliberations, OECD-cited case studies, 100+ municipalities and nonprofits.

### Integration Pattern with ORDAO / Respect

**Pre-fractal deliberation.** ORDAO executes Respect-weighted decisions on defined proposals. Pol.is surfaces community priorities asynchronously, before the fractal session is called.

Pattern: Early in week, Pol.is seed statements on "what should ZAO prioritize this week?" or "should we pivot to more WAVEWARZ focus?" Participants vote and cluster. Facilitators surface bridging statements. Week's fractal session then convenes with richer context and pre-identified consensus areas.

Works best for subjective, exploratory questions (not yes/no votes). Requires active facilitator to seed good statements and interpret clusters.

### ZAO Verdict

**PILOT (MEDIUM PRIORITY).** 
- Run a one-time Pol.is poll on "what should ZAO Fractal prioritize first 4 weeks" as part of inaugural week.
- Use for larger community values questions (not weekly ops - too heavy).
- If working, embed Pol.is results into ZAO Fractal documentation as "community alignment map" for future onboarders.
- Do not run Pol.is every week (overkill); use for major strategic questions only.

---

## 4. Loomio

### What It Is

Loomio is a cooperative-governance discussion + decision-making tool used by worker co-ops, occupy-style assemblies, and sociocratic groups. Supports asynchronous deliberation with permanent decision record.

### Architecture / How It Works

**Decision Types:**
- Proposal + consensus check (Consent decision-making)
- Question (seek input, no decision)
- Poll (binary or ranked-choice)
- Score poll (rate 1-5)
- Meeting (schedule, discuss outcomes)
- Discussion thread (open-ended)

**Consent Process (Built-In):** Proposer posts decision with context. Participants ask clarifying questions, express gut reaction, check for objections. "Silence = yes, objections only block if they signal harm." Standard for sociocratic groups.

**Async-Friendly:** Thread-based, time-shifted participation. Each person has voice; arguments don't get drowned out.

**Permanent Archive:** Every decision captured with rationale, next steps, timestamp. Years-later context retrieval. OpenSSL uses Loomio to maintain "transparent archive of every decision" for internet security library.

**Open-Source:** AGPL-3.0. [github.com/loomio/loomio](https://github.com/loomio/loomio). Hosted (14-day free trial) or self-hostable.

### License + Repo

AGPL-3.0. [github.com/loomio/loomio](https://github.com/loomio/loomio)

### Adoption

Thousands of co-ops, Open Source Initiative, worker cooperatives, volunteer-run nonprofits, sociocratic organizations.

### Integration Pattern with ORDAO / Respect

**Complement ORDAO for async deliberation layer.** ORDAO requires consensus (or veto-period override). Loomio makes consensus-checking explicit and auditable. Use Loomio for:
- Weekly decision prep (Loomio thread 2-3 days before fractal session to surface objections early).
- Consent-based decisions that don't require $ZOR voting (e.g., "do we hold session on Wed or Thu?").
- Permanent record of decision rationale (ORDAO on-chain voting is binary; Loomio captures "why").

Works for 30-500 person groups. Beyond that, split into sub-groups (fractals).

### ZAO Verdict

**PILOT (MEDIUM PRIORITY).**
- Integrate Loomio for ZAO Fractal pre-session decision prep (Mon-Wed, week of fractal session).
- Use Consent decision-making for routine ops (not strategic votes - use ORDAO for those).
- Archive all Loomio decisions in ZAO Fractal documentation.
- Do not replace ORDAO; use Loomio as deliberation layer BEFORE on-chain vote.

---

## 5. Decidim

### What It Is

Decidim is a free and open-source participatory democracy platform from Barcelona. Used by 200+ governments and organizations for citizens' assemblies, participatory budgeting, collaborative law drafting.

### Architecture / How It Works

**Modular Ruby on Rails Platform:** Spaces for participatory processes, assemblies, conferences. Each space can host debates, proposals, voting, budgeting, meetings, committees.

**Features:** Participatory processes (structured input-vote-decide), assemblies (ongoing governance), initiatives (crowd-proposed), consultations (survey-style), budgeting (allocate funds), debates (threaded discussion).

**Governance Model:** Highly configurable permissions. Organizations set up processes (define phases: idea, commentary, voting, implementation).

**Installation:** `gem install decidim && decidim decidim_application` creates a Rails app. Comprehensive docs at docs.decidim.org.

### License + Repo

AGPL-3.0. [github.com/decidim/decidim](https://github.com/decidim/decidim)

### Adoption

Barcelona (city government), New York City, European Commission, Mexico City, Mérida, Helsinki, 200+ governments and organizations. One cooperative registered 3,500+ participants across 5 processes in months.

### Integration Pattern with ORDAO / Respect

**Reference-only for ZAO at current scale.** Decidim is designed for city-government scale (thousands of participants, multi-process, multi-month cycles). ZAO Fractal (50-500 people, weekly cycles) does not need this complexity.

Relevant IF ZAO scales to city-scale collaborations (e.g., ZAO + Maine government co-design public goods). Then Decidim's modular process design + budgeting tools would be appropriate.

### ZAO Verdict

**REFERENCE-ONLY (LOW PRIORITY).**
- Study Decidim architecture IF planning city-scale ZAO expansions.
- Current ZAO Fractal is sub-Decidim scale; use Loomio + ORDAO instead.

---

## 6. Consul (Spanish Citizen Participation Platform)

### What It Is

Consul is an open-source citizen participation platform developed by Madrid city. Similar to Decidim but slightly different lineage. Supports debates, proposals, voting, participatory budgeting, collaborative legislation.

### Architecture / How It Works

Monolithic platform (vs. Decidim's modular approach) with built-in support for debates, proposals, voting, participatory budgeting. Less flexible than Decidim but simpler to deploy for single-use case.

### License + Repo

AGPL-3.0. Open source, available on GitHub.

### Adoption

Madrid ("Decide Madrid" at decide.madrid.es), Buenos Aires, 250+ cities and organizations globally. Prominent in Latin America.

### Integration Pattern with ORDAO / Respect

**Reference-only, same as Decidim.** Not appropriate for ZAO Fractal current scale. Relevant only if scaling to city governance.

### ZAO Verdict

**REFERENCE-ONLY (LOW PRIORITY).**

---

## 7. Sociocracy 3.0 (S3)

### What It Is

Sociocracy 3.0 is not a tool - it is a methodology / pattern library for collaborative governance. Defines patterns for consent decision-making, circles (small groups), double-linking (cross-circle delegates), role rotation, and driver-driven proposals.

### Architecture / How It Works

**Core Patterns:**
- **Consent Decision-Making:** Proposals pass unless objections signal harm. "Silence = yes." Active opposition encouraged; silence respected.
- **Circles:** Self-managed groups (6-10 people), each circle has facilitator, secretary, elected roles.
- **Double-Linking:** Each circle sends 2 delegates to parent circle (one facilitator, one non-facilitator). Cross-circle coordination without hierarchy.
- **Role Rotation:** Facilitator, secretary, roles rotate quarterly to distribute power.
- **Driver-Driven Proposals:** Decisions driven by tension/need, not top-down. Anyone can propose.
- **Elections:** Consent-based (not voting). Circle asks "any objections to X?"

**How It Differs from Fractal Democracy:** Both anti-plutocratic. S3 is offline-first, no token, no on-chain layer, no peer-ranking. Fractal is token-based ($ZOR), on-chain executable (ORDAO), peer-ranked (Respect Game Fibonacci distribution). S3 is governance methodology; fractal is governance + reputation system + execution layer.

**Open-Source:** Creative Commons Free Culture license. [sociocracy30.org](https://sociocracy30.org). Free e-course, guides in multiple languages, academy training available.

### License + Resources

Creative Commons Free Culture License. [sociocracy30.org](https://sociocracy30.org)

### Adoption

Thousands of organizations including worker cooperatives, open-source projects, some DAOs (e.g., Hypha DAO), nonprofits.

### Integration Pattern with ORDAO / Respect

**Complement for inter-fractal coordination.** ORDAO is Respect-weighted voting within a fractal. S3 circles are peer-based coordination across fractals.

Pattern: Weekly Respect Game (on-chain, within-fractal). Monthly S3 circle (off-chain, inter-fractal coordination). The ZAO board / council could operate via S3 even though weekly Respect Games are fractal.

Example: Consensus circle for "strategic direction this quarter" uses S3 double-linking (each regional fractal sends 2 delegates). No token voting; consent-based. This feeds into next month's fractal sessions (ORDAO execution).

Works for groups 10-500+ people (multiple circles). Extremely lightweight; no software required.

### ZAO Verdict

**PILOT (MEDIUM PRIORITY).**
- Use S3 patterns for inter-fractal coordination (S3 circle for regional fractals once ZAO Fractal splits).
- Use S3 consent for ZAO OS Governance "Manage" tab operations (not Respect-weighted strategic decisions).
- Train circle facilitators in S3 rounds (everyone speaks once per topic, no cross-talk).
- Do not replace ORDAO; S3 is off-chain coordination, ORDAO is on-chain decision execution.

---

## 8. Safe (Gnosis Safe)

### What It Is

Safe (formerly Gnosis Safe) is the dominant multisig + module wallet on Ethereum and EVM chains. Secures 1 Trillion+ in volume. Used by every major DAO for treasury.

### Architecture / How It Works

**Multisig:** M-of-N signers required to execute transactions. Common patterns: 2-of-3, 3-of-5.

**Modules:** Additional contracts that hook into Safe execution. Enable automations:
- Hats Signer Gate (signers = hat wearers)
- Snapshot vote -> Safe execution (Safe module reads Snapshot results, auto-executes)
- OpenZeppelin Governor integration (on-chain voting -> Safe execution)

**Wallet Features:** Token management, multi-chain support, transaction simulation (preview before signing), spending controls, emergency recovery.

**Open-Source:** LGPL-3.0. [github.com/safe-global/safe-contracts](https://github.com/safe-global/safe-contracts). Audited by OpenZeppelin, Certora, Ackee.

### License + Repo

LGPL-3.0. [github.com/safe-global/safe-contracts](https://github.com/safe-global/safe-contracts)

### Adoption

1,500+ organizations, Ethereum Foundation, Polygon, Optimism, Arbitrum, Base. De facto standard multisig on EVM.

### Integration Pattern with ORDAO / Respect

**Treasury container, not governance decision layer.** ZAO's Safe holds $ZOR, ETH, other assets. ORDAO determines WHO can spend (Hats) and HOW MUCH (Respect thresholds). Safe executes the execution.

Hats Signer Gate v2 connects Configurator hats to Safe signers - signing authority tracks hat wearers.

ORDAO does not replace Safe; both are needed. Safe = asset security + multisig, ORDAO = decision-making + veto-period.

### ZAO Verdict

**USE (HIGH PRIORITY).**
- Wire ZAO treasury Safe to Hats Signer Gate v2 (signers = Configurators).
- Use Safe as executor for OREC proposals (Respect vote -> Safe tx).
- No changes needed; Safe is battle-tested. Just ensure governance parameters match ORDAO design (e.g., Safe delay = ORDAO veto-period).

---

## 9. Tally

### What It Is

Tally is a governance UI and DAO management platform. Specifically targets OpenZeppelin Governor (on-chain voting contracts). Used by 100+ DAOs.

### Architecture / How It Works

**Frontend for Governor Contracts:** Tally indexes Governor contracts and displays proposals, voting, delegation. Works with any Governor deployment (e.g., Compound Governor, Uniswap Governor).

**Governance Tools:** Delegate voting power, cast votes, create proposals (if governance allows), view proposal history.

**Standard DAO Pattern:** OpenZeppelin Governor voting + Tally UI = the most common DAO governance stack (Compound, Uniswap, etc.).

### Adoption

100+ DAOs (Nouns, Uniswap, Aave, etc.).

### Integration Pattern with ORDAO / Respect

**Comparison reference only.** ORDAO is a custom governance contract (not OpenZeppelin Governor). OREC is ORDAO's voting contract. ZAO does not need Tally because OREC is its own contract, not a standard Governor deployment. 

If ZAO ever wanted Governor-compatible governance, Tally would be the frontend.

### ZAO Verdict

**REFERENCE-ONLY (LOW PRIORITY).**
- Study Tally UX as reference for OREC frontend design (voting, delegation, proposal history).
- Do not deploy Tally; use custom OREC frontend instead.

---

## 10. Aragon OSx

### What It Is

Aragon OSx is the modular DAO framework (post-2024 rewrite). Replaces Aragon v1 with a plugin-based architecture. Everything is a permission; organizations compose plugins for voting, treasury, membership.

### Architecture / How It Works

**Permission-Based Core:** Core contract defines roles and permissions. No hardcoded voting - voting is a plugin.

**Plugin Marketplace:** Community builds and publishes plugins. Standard plugins:
- Token-based voting
- Multisig plugin
- ve-governance (vesting escrow voting)
- Treasury plugin
- Membership plugin

**Flexibility:** Organizations can mix-and-match plugins. Different governance models for different operations.

**Developer Tools:** React UI Kit, App Template, plugin templates enable custom plugin development.

### License + Repo

AGPL-3.0. [github.com/aragon/aragon](https://github.com/aragon/aragon)

### Adoption

1,500+ organizations secured USD 300MM+ via Aragon v1. OSx is newer (post-2024); growing adoption.

### Integration Pattern with ORDAO / Respect

**Comparison reference.** Aragon OSx is a general DAO framework. ORDAO is purpose-built for Respect-weighted + optimistic veto. OSx buys you plugin flexibility; ORDAO buys you Respect-weighted execution.

If ZAO wanted to use Aragon OSx, it would need to write a custom Respect plugin (no default Respect plugin exists).

### ZAO Verdict

**REFERENCE-ONLY (LOW PRIORITY).**
- Study Aragon OSx plugin architecture as reference for OREC extensibility.
- ORDAO is more specialized than Aragon OSx; stick with ORDAO.
- Only consider Aragon OSx if ZAO needs radical plugin flexibility + community plugin ecosystem.

---

## Comparative Summary: All 10 Tools

| Tool | License | What It Does | Scale | ZAO Verdict | Integration |
|------|---------|-------------|-------|-------------|-------------|
| **Hats Protocol** | MIT | Programmable hierarchical roles, non-transferable | 10-10k | **USE** | Wire deeper: ERC-1155 claiming, MCP server, HSG v2 Safe, hat-gated Governance tab |
| **Snapshot** | MIT | Off-chain gasless voting, custom strategies, Safe integration | 100-1M | **USE** | Weekly priority polls, ZOR-weighted strategy, embed in ZAO OS |
| **Pol.is** | AGPL | Statement clustering deliberation, cross-cutting consensus | 50-5k | **PILOT** | One-time inaugural poll, major strategic questions only |
| **Loomio** | AGPL | Async consent decision-making, permanent archive | 10-500 | **PILOT** | Pre-fractal deliberation, ops decisions, audit trail |
| **Decidim** | AGPL | Modular participatory democracy (city-scale) | 1k-100k | **REFERENCE-ONLY** | Study IF scaling to city governance |
| **Consul** | AGPL | City citizen participation (monolithic) | 1k-100k | **REFERENCE-ONLY** | Study IF scaling to city governance |
| **Sociocracy 3.0** | CC-0 | Methodology: consent circles, double-linking, rotation | 10-500 | **PILOT** | Inter-fractal coordination, off-chain ops |
| **Safe** | LGPL | Multisig wallet, modules, treasury | 1-1M | **USE** | Connect to Hats Signer Gate v2, execute ORDAO decisions |
| **Tally** | MIT | Governor UI, delegated voting frontend | 100-1M | **REFERENCE-ONLY** | Reference UX for OREC frontend design |
| **Aragon OSx** | AGPL | Modular DAO framework, plugin marketplace | 10-1M | **REFERENCE-ONLY** | Reference architecture; ORDAO is more specialized |

---

## Integration Roadmap: Which to Adopt When

### Phase 1 (Weeks 1-4): Deepen Existing

1. **Hats Protocol:** Wire hat-based access to ZAO OS Governance "Manage" tab (currently FID-gated).
2. **Snapshot:** Create weekly priority poll aligned to fractal session schedule (Mon 6PM EST - next Mon 6PM EST).
3. **Safe:** Connect treasury to Hats Signer Gate v2 (Configurator hat = signer).

### Phase 2 (Weeks 5-12): Pilot Adjacent Tools

1. **Pol.is:** Run inaugural week 1 Pol.is poll on "what should ZAO prioritize first 4 weeks?"
2. **Loomio:** Set up pre-fractal decision prep (Mon-Wed, week of session). Use for ops decisions.
3. **Sociocracy 3.0:** Document S3 rounds for inter-fractal coordination (for post-split).

### Phase 3 (Months 4+): Governance Maturity

1. **Hats:** Deploy ERC-1155 Eligibility module for $ZOR self-claiming.
2. **ORDAO + Safe:** Finalize integration (vote -> Safe tx).
3. **Loomio Archive:** Migrate all ZAO OS decisions to Loomio for audit trail.

---

## Verdicts Summary

| Category | Tool | Decision | Reason |
|----------|------|----------|--------|
| **Adopt Now** | Hats, Snapshot, Safe | USE | Already partially integrated; wire deeper |
| **Pilot Soon** | Pol.is, Loomio, S3 | PILOT | Fit ZAO scale; low barrier to entry |
| **Watch, Don't Build** | Decidim, Consul, Tally, Aragon OSx | REFERENCE-ONLY | Useful for future scaling or architecture reference; not blocking |

---

## Final Principle: No Tool Substitutes for Community

No governance tool (Hats, Snapshot, Loomio, Pol.is, ORDAO, or S3) automatically produces good governance. All tools require:

1. **Clear values** (ZAO: contribution > capital, exit rights, peer-ranking)
2. **Active facilitation** (Fractal circle facilitators, proposal stewards)
3. **Transparent decision archive** (Loomio, Snapshot, on-chain voting)
4. **Regular feedback loops** (weekly fractal sessions, monthly values check)
5. **Clear exit path** (members can leave, form new fractals, fork)

Tools amplify good process; bad process amplified is still bad process. Adopt incrementally, measure adoption + satisfaction, iterate.

---

## Research Sources

**Hats Protocol:** docs.hatsprotocol.xyz, ZAO Doc 075 (V2 Updates), GitHub hats-protocol repos, Hats MCP server docs.

**Snapshot:** docs.snapshot.box, ZAO Doc 132 (Weekly Polls), GitHub snapshot-labs, snapshot.org.

**Pol.is:** pol.is, GitHub compdemocracy/polis, Taiwan vTaiwan case studies, ZAO Doc 657a (Plural Events).

**Loomio:** loomio.com, GitHub loomio/loomio, OpenSSL case study, ZAO Doc context files.

**Decidim:** decidim.org, GitHub decidim/decidim, Barcelona + 200+ city implementations, installation docs.

**Consul:** consuldemocracy.org, GitHub consul repos, Madrid + 250+ city case studies.

**Sociocracy 3.0:** sociocracy30.org, ZAO Doc context (sociocracy-circles-small-teams.md), S3 e-course + guides.

**Safe:** safe.global, GitHub safe-global/safe-contracts, $1T+ volume, 1,500+ organizations, HSG v2 docs.

**Tally:** tally.xyz, OpenZeppelin Governor architecture, 100+ DAO case studies.

**Aragon OSx:** docs.aragon.org, GitHub aragon/aragon, plugin marketplace, Aragon v1 (1,500+ DAOs, USD 300MM+).

**Comparative Governance:** ZAO Doc 718d (Comparative DAO Governance), ZAO Doc 01 (Foundations Deep).

Total Sources: 25 unique + 6 ZAO internal docs = 31 [FULL] sources. Zero [PARTIAL] or [FAILED].
