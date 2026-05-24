# 02 - The Fractally Protocol (2022)

## What it was

Fractally was the protocol that turned Larimer's theory into a system. Announced **January 28, 2022** via a Medium post titled *"Introducing Fractally - The next generation of DAOs."* The white paper followed on **February 22, 2022**.

The protocol's core primitive is **Respect** - a soulbound (non-transferable) reputation token earned only through peer evaluation. Governance power tracks contribution, never capital.

## The Respect Game mechanics

Fractally codified the weekly ritual that every downstream fractal still uses today:

- Random breakout groups of 3-6 people (6 is ideal - 15 pairwise comparisons).
- Each person gets ~4 minutes to describe their contributions to the community that week.
- The group discusses and collaboratively ranks members 1-6.
- A **2/3 consensus** is required on the final ranking.
- Respect is distributed on the **Fibonacci curve** by rank (1, 2, 3, 5, 8, 13 in the base scheme). Each level earns roughly 60% more than the one below.

## The scoring formula evolution

The white paper proposed `AVERAGE(FIBONACCI(LEVEL))` - an exponential moving average of weekly ranks.

Larimer's **Addendum 1** (Hive post) revised it to `FIBONACCI(AVERAGE(LEVEL))` - apply the Fibonacci function to a moving-average weighted level. The formula:

```
NEW_AVG = (CURRENT_AVG * 5 + NEW_LEVEL) / 6
```

Then map `NEW_AVG` to its position on a continuous Fibonacci curve. This creates **momentum** - your standing persists even if you miss a week. Decay is ~1/6 per week, half-life ~34 weeks.

Both Eden Fractal and ZAO Fractal use the revised (Addendum 1) formula.

## What Fractally promised

- A soulbound token earned only through peer ranking
- A weekly governance ritual that doubles as community-building
- A nested-fractal scaling story for very large populations
- Open-source contracts, tooling, and templates

## Status today

Dormant since approximately 2023. The website (fractally.com) is still up and the white paper is still downloadable, but there is no active development team or community. The EOS ecosystem - Fractally's home - declined, and the live downstream communities (Eden, Optimism, ZAO) migrated to Ethereum L2s.

What survived is the **idea**. Every active fractal today (Eden Fractal on Base, ZAO Fractal on Optimism, Roy Fractal on EOS, Aquadac on Zoom) implements the Fractally Respect Game in some form. The protocol succeeded as a meme and a template; the company behind it did not.

## Why this matters for ZAO

ZAO Fractal inherits the Fractally Respect Game mechanics directly. The only changes:

- ZAO uses **2x Fibonacci** scoring (110/68/42/26/16/10) starting in Year 2, vs Fractally/Eden's standard 1x (55/34/21/13/8/5).
- ZAO ranks members on five **music-community-specific criteria** (vision, contribution, collaboration, innovation, onboarding) rather than generic contribution.
- ZAO runs **weekly**, where Optimism Fractal ran bi-weekly.

Everything else - the 6-person groups, 4-minute presentations, 2/3 consensus, Fibonacci rewards, soulbound token - traces directly to Fractally.

## Sources

- [Introducing Fractally - The next generation of DAOs](https://medium.com/gofractally/introducing-fractally-the-next-generation-of-daos-7c94981514d8) - Larimer, Medium, Jan 28, 2022 - [FULL]
- [Fractally White Paper 1.0](https://fractally.com/uploads/Fractally%20White%20Paper%201.0.pdf) - Feb 22, 2022 - [FULL]
- [Fractally White Paper Addendum 1](https://hive.blog/fractally/@dan/fractally-white-paper-addendum-1) - Larimer, Hive - [FULL]
- [fractally.com](https://fractally.com) - the home site, dormant - [FULL]
