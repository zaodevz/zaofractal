# 07 - The Respect Token: Mechanics

Respect is the primitive every fractal community is built on. This doc covers what it is, how it is earned, how it decays, why it is soulbound, and what voting weight it produces.

## Soulbound by contract

Respect is **non-transferable and non-tradeable** - enforced at the smart-contract level, not by social convention.

| Implementation | Mechanism |
|----------------|-----------|
| ERC-20 (OG-style) | Locked `TRANSFER_ROLE` - no address holds it |
| ERC-1155 (ZOR / Eden / OF style) | Transfer functions revert (`safeTransferFrom` throws) |

This is the **anti-plutocratic** property. If you could buy Respect, governance becomes purchasable. If you could sell Respect, members game the system for short-term profit. Soulbound means your governance weight equals your contribution track record - literally, no abstraction.

For ZAO this also explains why a tradeable "$ZAO token with LP mining" cannot replace Respect - it would invert the entire design. (See ZAO research Doc 695.)

## How Respect is earned

Two paths, depending on the fractal:

**Weekly Respect Game (the universal mechanism).** Random group of 6 ranks each other 1-6 by recent contribution. Respect is awarded on a Fibonacci curve.

**One-time grants (community-specific).** ZAO awards OG Respect for specific contributions like:

| Action | OG Respect points |
|--------|-------------------|
| Posting an introduction in #intros | 25 |
| Camera on during a meeting | 10 per meeting |
| Full article | 50 |
| Short article | 10 |
| Editorial work | 10 |
| Featured artist on thezao.com | 50 |

Eden Fractal had analogous one-time grant categories during Epoch 1.

## The Fibonacci reward curve

The base Fractally/Eden scoring per 6-person group:

| Rank | Level | Respect |
|------|-------|---------|
| 1st | 6 | 55 |
| 2nd | 5 | 34 |
| 3rd | 4 | 21 |
| 4th | 3 | 13 |
| 5th | 2 | 8 |
| 6th | 1 | 5 |

**Total per group: 136 Respect.** Each rank is ~62% higher than the one below (the golden ratio phi).

ZAO Fractal uses a **2x Fibonacci** curve in its Year 2 / ZOR era:

| Rank | Level | ZAO Respect |
|------|-------|-------------|
| 1st | 6 | 110 |
| 2nd | 5 | 68 |
| 3rd | 4 | 42 |
| 4th | 3 | 26 |
| 5th | 2 | 16 |
| 6th | 1 | 10 |

**Total per group: 272 Respect distributed.**

## Optional decay

ZAO Fractal applies **2% weekly decay**:

```
R(t) = R(t-1) * 0.98 + earned(t)
```

Equilibrium under constant earning: `R_eq = earned / 0.02`. The half-life is approximately **34 weeks**.

Decay keeps voting weight tied to *recent* contribution, not a one-time burst from years ago. A member who earned 1000 Respect three years ago and has done nothing since is gradually overtaken by an active contributor earning steadily today.

This is a per-fractal policy choice. Eden Fractal uses moving-average decay through the Addendum 1 scoring formula but does not apply an explicit per-week multiplier on the token itself.

## Voting weight (OREC)

OREC reads Respect balances during a voting window. A proposal passes when:

```
yesWeight > 2 * noWeight  AND  yesWeight >= minWeight
```

This is the **2/3+1 rule**. Equivalently, **1/3 of participating Respect can veto** any proposal during the veto window.

This is fundamentally consent-based, not majority-based. A minority that strongly objects has real blocking power; a slim majority cannot force a proposal through.

## Equality: the Gini coefficient

A single Fibonacci round produces a Gini coefficient around **0.23**. For comparison:

| System | Approximate Gini |
|--------|------------------|
| Fractal Respect Game | ~0.23 |
| Typical token-voting DAO | 0.97-0.99 |
| US household income | ~0.39 |
| Most equal countries (Slovakia, Slovenia) | ~0.24 |

The Respect Game is **dramatically more equal** than typical token-weighted DAOs while still rewarding excellence. The top 1/3 of a group earns roughly 2/3 of the Respect - meaningfully unequal, but far from winner-take-all.

## ZAO's two Respect ledgers

ZAO has **two Respect contracts**, reflecting two eras:

| Ledger | Token | Contract (Optimism) | Era | Role |
|--------|-------|---------------------|-----|------|
| **OG** | ERC-20 | `0x34cE89baA7E4a4B00E17F7E4C0cb97105C216957` | Fractals 1-73, deployed Jul 30 2024 | One-time distributions + historical ledger. ~38,484 supply, 122 holders. Frozen. |
| **ZOR** | ERC-1155 | `0x9885CCeEf7E8371Bf8d6f2413723D25917E7445c` | Fractals 74+, deployed Sep 11 2025 | Weekly Respect Game scoring. Minted democratically via OREC. Actively minting. |

Fractal 74 is the dividing line. Fractals 1-73 were tracked off-chain in Airtable (the OG era). Fractals 74+ are minted on-chain through OREC (the ZOR era). The two ledgers have **never been unified** - that is a known open issue for ZAO.

## Voting criteria (ZAO Fractal)

When ZAO Fractal members rank each other 1-6 each Monday night, they are told to consider:

1. **The ZAO Vision** - advancing music, art, and technology
2. **Contribution** - impactful work that pushes the collective vision forward
3. **Collaboration** - teamwork, uplifting others
4. **Innovation** - creative thinking, groundbreaking ideas
5. **Onboarding New Members** - helping newcomers join ZAO and Web3

This is ZAO's customization on top of the generic Respect Game. Eden Fractal and the original Fractally protocol use more generic "contribution to the community" language.

## Sources

- [ORDAO architecture & specs](https://github.com/Optimystics/ordao) - Optimystics GitHub - [FULL]
- [sim31/ordao - upstream dev repo](https://github.com/sim31/ordao) - [FULL]
- [Fractally White Paper 1.0](https://fractally.com/uploads/Fractally%20White%20Paper%201.0.pdf) - Larimer + Fractally team, Feb 22, 2022 - [FULL]
- [Fractally White Paper Addendum 1](https://hive.blog/fractally/@dan/fractally-white-paper-addendum-1) - Larimer, Hive - [FULL]
- ZAO internal research: Doc 56, 58, 102, 188, 702 (the OREC/ZOR/OG specifics, voting criteria, decay constant)
