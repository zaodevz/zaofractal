# Code Walks

Annotated walkthroughs of the two codebases that run ZAO Fractal end to end. Written for engineers who need to extend, debug, or fork either piece.

## Files

| File | Codebase | Lines | Focus |
|------|----------|-------|-------|
| [01-fractalbot-walkthrough.md](01-fractalbot-walkthrough.md) | `bettercallzaal/fractalbotmarch2026` (Python, discord.py 2.0, 52 slash commands) | ~870 | Discord bot architecture, sequential elimination voting loop, webhook integration to ZAO OS, Supabase persistence v2.0+, v2.1 features (Snapshot cog, Farcaster linking, auto-submit) |
| [02-ordao-contracts-walkthrough.md](02-ordao-contracts-walkthrough.md) | `Optimystics/ordao` + `sim31/ordao` (Solidity + TypeScript SDK) | ~1100 | OREC three-phase voting state machine, the `yesWeight > 2x noWeight` passing formula, Respect1155 soulbound transfer revert, orclient SDK v1.4.4, gas costs, security vectors |

## How to use

- **Onboarding a Python developer to the fractal bot?** Send them `01-fractalbot-walkthrough.md`. The architecture overview + extension guide section give them what they need.
- **Onboarding a Solidity developer to ORDAO?** Send them `02-ordao-contracts-walkthrough.md`. Walk through OREC.sol first, then Respect1155.sol, then orclient.
- **Auditing security?** Section "Security vectors" in the contracts walkthrough lists 6 attack surfaces. The bot walkthrough has its own Known Issues section.
- **Forking ORDAO for a new community?** The contracts walkthrough has a dedicated "extension guide" section.
- **Building a new fractal bot variant?** The bot walkthrough's "extension guide" section maps where to add new cogs vs modify existing.

## Caveat

The `bettercallzaal/fractalbotmarch2026` repo is private as of May 2026. The walkthrough draws on ZAO research Doc 188 (the canonical bot spec) plus public Optimystics tooling references. If GitHub access changes, the walkthrough should be updated to link to specific source files.

The `Optimystics/ordao` repo is public. All contract walkthrough sections cross-reference the live repo.
