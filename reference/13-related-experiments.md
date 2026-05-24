# 13 - Related Experiments

Adjacent or downstream work that is not a fractal community itself but is governance-design-relevant for ZAO Fractal. These are the rabbit holes worth knowing about.

## Fractal Nouns - cross-chain governance bridge

A GitHub organization ([Fractal-Nouns](https://github.com/Fractal-Nouns)) building **OIF-Governance-Bridge** - a Solidity bridge using **ERC-7683 (Open Intents Framework)** + Layer 0 protocols (LayerZero, Hyperlane) to let GovernorBravo-style proposals mirror across chains.

| Attribute | Value |
|-----------|-------|
| Repos | `OIF-Governance-Bridge`, `nouns-bridge` (fork) |
| Last update | 2026-03-15 |
| Standard | ERC-7683 cross-chain intents |
| Pattern | GovernorBravo voting mirrored Chain A -> Chain B |
| Maturity | Early stage, not production |

**Why this matters for ZAO:** Not for MVP. But if COC Concertz, FISHBOWLZ, or other ZAO ecosystem brands ever need their governance to sync with ZOUNZ on Base or ZAO Fractal on Optimism, OIF-Governance-Bridge is the upstream pattern. Revisit when cross-brand governance becomes a real need.

## IYKYK DAO - Nouns Builder + headless dashboard template

A Nouns Builder DAO on Base ([IYKYK-DAO/iykyk-terminal](https://github.com/IYKYK-DAO/iykyk-terminal)) - **MIT-licensed**, Next.js 15 + React 19 + wagmi v2 + Shadcn UI. Self-hosted, customizable Nouns Builder front-end.

Why it matters for ZAO: **ZOUNZ is also a Nouns Builder DAO on Base.** Forking `iykyk-terminal` gives ZAO a Nouns Builder UI that can show proposals + voting + treasury in one view, customized for ZABAL + agent metrics. Stack matches ZAO OS exactly. Already in ZAO's roadmap as a reference fork target.

Not directly a fractal pattern - this is the dashboard layer that pairs *with* fractal governance for treasury and proposal UX.

## Async GitHub-native fractal (proposed, not yet built)

**Working name:** Frapp-GH or Fractal Actions.

Proposed concept (ZAO research Doc 664, May 17 2026 brainstorm): use **GitHub Discussions + Pull Requests + Reactions + Projects** as the substrate for fractal consensus. Weekly async cycle:

| GitHub primitive | Maps to |
|------------------|---------|
| Repository | A fractal community (one repo per fractal) |
| Discussion | A weekly fractal session |
| Issue | A contribution claim |
| Pull Request | A *verifiable* contribution (code, content, doc) |
| Reaction | Soft signal of value |
| Projects board | Weekly ranking surface |
| GitHub Actions | The tally + Respect-issuance bot |
| GitHub App | The ORDAO bridge - pushes results on-chain |
| Wiki | The fractal's constitution |
| Forks | Spinout fractals |

**Why GitHub specifically (vs Optimystics's Respect.Games async web app):**

1. **Where developers are.** Developers do not switch tools to participate in governance. Meet them in their PRs.
2. **Native attribution.** Contributions are verifiable as merged code, not just self-reported.
3. **Permanent record.** GitHub never deletes; the audit trail is forever.
4. **Auth-light.** GitHub account is sufficient identity for many cases (still need wallet for on-chain Respect issuance).
5. **Discoverability.** Open-source GitHub repos surface in search; Discord servers do not.
6. **Composability.** A GitHub-native fractal can be embedded in any open-source community as a governance overlay.

**Status:** Brainstorm only, May 2026. Not yet scoped for implementation. Decision pending: does ZAO pursue async GitHub-native fractal, or stay fully synchronous? (ZAO research Doc 703, Recommendation #6.)

## Farcaster FIP #19 - Proof-of-Work Tokenization

In March 2026 the Farcaster Foundation opened [Discussion #19](https://github.com/orgs/farcasterorg/discussions/19) - a proposal for token emission based on three "work markets" (Data Availability, Growth, Application) with identity weighting from FID age and EigenTrust seeded on early FIDs.

What is steal-worthy for ZAO Fractal:

- **Custody-transfer resets credibility.** Prevents Sybil-via-acquisition.
- **EigenTrust seeded on early-FID set.** Anti-Sybil pattern that does not require revealing identity. Could seed a ZAO trust graph from week 1-12 Respect holders.
- **Retroactive genesis distribution.** Apply a unified formula to full history at genesis - the right pattern for ZAO's OG-to-ZOR ledger reconciliation.
- **Saturated growth math (`ln(1 + mutuality)`).** Diminishing returns on volume, rewards depth. Already the spirit of ZAO's 2x Fibonacci curve.

What is *not* worth stealing:

- 6-month FID-age cap - penalizes anyone joining late forever. Fractal Respect Game gives equal weight per session regardless of join date.
- 50% emission to validators - ZAO has no validator role, all members are participants.

## Optimystics Cignals - music ranking app

Most relevant single Optimystics tool for ZAO. **Cignals** is a competition app for ranking live performances:

- Alpha-tested at Eden Fractal events 53, 55, 56 with ~15 participants. Reported "very high satisfaction."
- Successfully tested **"Fractal DJ" competitions** - ranking music selections in a fractal-Respect-Game frame.
- Aiming for full on-chain version on OP Mainnet.
- This is the closest existing tool to "what ZAO would build if it built a music-specific Respect Game variant."

Worth tracking via [optimystics.io](https://optimystics.io) and the Optimystics GitHub org.

## Fractal Circles - async contribution pre-prep tool

Mentioned in ZAO research Doc 675 (Tanja's May 18, 2026 call with Zaal). A tool by Mikael for **async contribution pre-prep** before a live fractal session - so members can prepare their contributions in advance instead of trying to compress everything into a 4-minute live presentation.

**Status:** Dormant since initial demo. Zaal committed (May 18, 2026) to researching it as part of the non-technical onboarding work for ZAO Fractal. Worth following up if the async/sync hybrid pattern becomes a serious direction.

## ZAOstock sprint-fractal adaptation

Designed April 24, 2026 (ZAO research Doc 498). A sprint-mode fractal variant for an 18-person team running a festival/event prep cycle:

- Three parallel 6-person fractals: A (Artist/Media/Design), B (Logistics/Sponsorship/Ops), C (Tech/WaveWarZ/Content).
- Bi-weekly cadence tied to milestones (festival prep checkpoints).
- Parallel **ZAOstock Respect token** (ERC-1155 on Base, distinct from ZAO OG/ZOR).
- Earnings unlock post-festival from sponsor revenue.

Why it matters as a pattern: shows that the Respect Game can be **adapted for time-bounded sprints** rather than only continuous communities. Useful template for any project-mode fractal adaptation.

## Sources

- [Fractal-Nouns / OIF-Governance-Bridge](https://github.com/Fractal-Nouns) - [FULL]
- [IYKYK-DAO/iykyk-terminal](https://github.com/IYKYK-DAO/iykyk-terminal) - [FULL]
- [Farcaster Discussion #19 - FIP: Proof of Work Tokenization](https://github.com/orgs/farcasterorg/discussions/19) - [FULL]
- [Optimystics Cignals overview](https://optimystics.io) - [FULL]
- [ERC-7683 spec](https://www.erc7683.org/spec) - [FULL]
- ZAO internal research: Doc 346 (IYKYK + Fractal Nouns deep dive), Doc 498 (ZAOstock sprint fractal), Doc 664 (async GitHub-native fractal brainstorm), Doc 675 (Tanja call + Fractal Circles mention)
