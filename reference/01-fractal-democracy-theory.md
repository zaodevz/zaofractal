# 01 - Fractal Democracy: Theory

## Origin

Fractal democracy began as a critique of voting. Daniel Larimer - creator of BitShares (2014), Steem/Hive (2016), and EOS (2018) - turned to governance theory after three platform launches. He published **"More Equal Animals: The Subtle Art of True Democracy"** on **February 20, 2021** (verified on Amazon, Goodreads, Apple Books, Google Books, Kobo).

## The critique

Larimer argues mainstream governance fails in four ways:

1. **Large-group voting breaks mathematically.** When millions vote, any individual vote has near-zero influence. Rational ignorance and voter apathy follow.
2. **Capital corrupts governance.** Token-weighted voting (one token = one vote) recreates plutocracy. Whoever accumulates the most tokens wins. This contradicts democracy.
3. **Representatives lose accountability.** Fixed-term officials get captured between elections.
4. **Direct democracy does not scale.** Asking a billion people to vote on every law is impractical.

## The solution: sortition + nested small groups

The algorithm:

1. Randomly sort all citizens into small groups (3-6 people; 6 is ideal because it produces 15 pairwise comparisons).
2. Each group spends 1-2 hours in deliberation and selects a representative by consensus.
3. Representatives form new groups (also of 6) and repeat.
4. Continue through 3-4 rounds until a final decision-making body of ~6-12 people emerges.
5. The final group executes.

Properties:

- Every person is in a human-scale conversation where their voice genuinely matters.
- **Deliberation beats voting** - groups discuss pros and cons, not just tally.
- Scales to any population: 100 people = 2-3 rounds, 10,000 = 3-4 rounds, 1 billion = 5-6 rounds.
- Representation is granular: each person evaluates only ~5 peers, not 10,000 candidates.

This is the **fractal** structure - a self-similar pattern that repeats at every scale.

## Why Fibonacci scoring

The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...) is the reward curve for ranked output. Larimer chose it for four reasons:

1. **~62% growth per rank** - each level is the golden ratio (phi ~1.618) times the previous level. Meaningful incentives for top performers without winner-take-all.
2. **Softer than Pareto.** The 80/20 distribution is mathematically harsh. A 6-rank Fibonacci (55/34/21/13/8/5) gives the top 2 ranks ~57% of Respect and the bottom 4 ~43%. Fairer than 80/20, still rewarding excellence.
3. **Measurement theory.** Larimer treats participants as imprecise instruments measuring peer contribution. Human ranking has wide error bars. Fibonacci is *forgiving* of misranking by 1-2 places, while a steep exponential (32/16/8/4/2) makes mis-rankings catastrophic.
4. **Level 8 cap.** Past level 8 (Fib numbers 89, 144, 233, ...) the curve amplifies measurement error more than signal.

## Why soulbound Respect

The reputation token must be non-transferable, by contract-level enforcement, not convention:

- If you could **buy** Respect, the system becomes plutocratic (the very thing fractal democracy rejects).
- If you could **sell** Respect, members game the system for short-term profit instead of contribution.
- Soulbound means governance power literally equals your track record of community contribution.

Larimer's framing: *"Fractal governance is more likely to distribute inflation to those producing public goods which grow the value of the currency instead of being siphoned off by insiders and graft."*

## Sortition has history

Sortition (random selection of decision-makers) is not new. Ancient Athens used it. Modern citizens' assemblies (Ireland's abortion referendum, France's Climate Convention) use it today. Fractal democracy is sortition plus nested representation plus a soulbound reputation primitive that lets the process compound over time.

## Sources

- [More Equal Animals on Amazon](https://www.amazon.com/More-Equal-Animals-Subtle-Democracy-ebook/dp/B08X4TY925) - Larimer, Feb 20, 2021 - [FULL]
- [Introducing Fractally - The next generation of DAOs](https://medium.com/gofractally/introducing-fractally-the-next-generation-of-daos-7c94981514d8) - Larimer, Medium, Jan 28, 2022 - [FULL]
- [Fractal Democracy and the Star Trek Test](https://hive.blog/eden/@mada/fractal-democracy-and-the-star-trek-test) - Mada, Hive - [FULL]
- [On Simulating Fractal Governance](https://hive.blog/fractally/@mattlangston/on-simulating-fractal-governance) - Matt Langston, Hive - [FULL]
