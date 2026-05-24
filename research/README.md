# Deep Research

The DEEP-tier research layer for the ZAO Fractal repo. Where `/reference/` is the curated survey of the fractal-governance lineage, `/research/` is the source-heavy depth - each file is a hub doc with 10+ primary sources, frontmatter, and verdict-first sections.

## Files

| # | File | Topic | Lines | Sources |
|---|------|-------|-------|---------|
| 01 | [foundations-deep.md](01-foundations-deep.md) | Larimer + sortition history + Respect Game math + Sybil defenses + ORDAO contracts + comparative DAO frameworks | ~700 | 23 |
| 02 | [live-communities-deep.md](02-live-communities-deep.md) | Roy Fractal at 700+ scale, Eden Fractal Epoch 2, Aquadac 12-week season model, Optimism Fractal pause autopsy | ~400 | 10 |
| 03 | [music-cignals-deep.md](03-music-cignals-deep.md) | Cignals competition app, Fractal DJ history, music DAOs that tried peer-ranked governance, what changes if ZAO ranks tracks instead of contributions | ~530 | 20 |
| 04 | [async-identity-deep.md](04-async-identity-deep.md) | Respect.Games beta, Fractal Circles revival, GitHub-native fractal spec (Frapp-GH), identity interop landscape (FID + ENS + Hats + EigenTrust + Gitcoin Passport + ERC-8004 + Karma3Labs) | ~780 | 12 |

## How to use

- **Writing the ZAO Fractal whitepaper?** 01 is the spine for Chapters 1-7 (theory, mechanism, on-chain, comparison). 02 fills the "lineage and lessons" chapter. 04's Frapp-GH section is the "where we go next" chapter.
- **Onboarding a new contributor?** Start them at `/reference/` for the shallow pass. Send them to `/research/` only when they need depth.
- **Pitching grants or partnerships?** 01's comparative section (ORDAO vs OZ Governor vs Compound vs Moloch) and 02's lessons-from-OF-pause make the strongest defensive arguments.
- **Building the music-fractal variant?** 03 is the design doc. Layer 1 (contribution ranking) and Layer 2 (track ranking) are the two-mode framing.
- **Working on async layer or identity verification?** 04 has the revival plan for Fractal Circles, the MVP spec for Frapp-GH, and the identity-stacking strategy (internal ZAO vs public Frapp-GH vs cross-DAO).

## Tier policy

Every file in this folder is DEEP-tier (per the zao-research skill): minimum 10 unique sources per doc, each classified `[FULL]` / `[PARTIAL]` / `[FAILED]`, with at least 3 specific numbers (dates, versions, percentages, addresses) per section. No "consider/might/explore" hedging language - direct verdicts only. Frontmatter on every file. No fabrication - unknown facts marked UNKNOWN.

Re-validate every 4-6 weeks. APIs, contract addresses, and community participation counts churn fast.

## Source provenance

External claims are sourced to primary URLs (Larimer's books, official websites, Medium articles, GitHub repos, governance forums, academic papers). ZAO-internal claims (contract addresses, OREC transaction counts, bot version history, weekly cadence) draw from the ZAO OS V1 research library and on-chain data. Full source index per file at the bottom of each doc.
