# Primary Source Specs

The two original DEEP-tier specs for ORDAO and the Respect token, imported from the ZAO OS V1 research library. These are the canonical mechanics references - everything in `/research/01-foundations-deep.md` and the whitepaper-foundations chapters traces back to these two docs.

## Files

| File | Topic | Lines | Source doc |
|------|-------|-------|------------|
| [ordao-respect-system.md](ordao-respect-system.md) | ORDAO + Respect Game system, full mechanics walkthrough | ~525 | ZAO research Doc 056 |
| [respect-deep-dive.md](respect-deep-dive.md) | Respect token deep-dive: decay, Gini, tiers, voting weight, equilibrium analysis | ~475 | ZAO research Doc 058 |

## How to use

- **Implementing a fractal-governance feature?** Start here. These are the most-detailed specs ZAO has on the actual mechanics.
- **Reviewing ORDAO contracts?** `ordao-respect-system.md` walks the contract structure end-to-end.
- **Debating decay parameters or scoring curves?** `respect-deep-dive.md` has the math and the trade-off analysis.
- **Onboarding an engineer to ZAO Fractal?** Send them these two first, then the whitepaper-foundations layer.
