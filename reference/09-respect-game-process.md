# 09 - The Respect Game: Process

How a single weekly Respect Game session actually runs, end to end. ZAO Fractal's flow is documented here; Eden Fractal and Optimism Fractal run the same shape on Fractalgram (Telegram) instead of Discord.

## Preconditions

Before a member can participate in their first fractal:

1. They have posted in the `#introductions` channel (one-time requirement).
2. They have run the `/register` command to add their Optimism wallet to the bot's registry.

After that, they can join any session.

## Phase 1 - Gathering (async)

Members gather in the **"Fractal Waiting Room"** Discord voice channel.

- Official session: **Mondays 6pm EST.**
- Also runs anytime with **4+ unplayed members** (a member is "unplayed" if they have not participated in the last 7 days).

## Phase 2 - Randomization

A facilitator runs `/randomize` in the `#fractals` channel. The bot:

1. Fetches everyone currently in the Fractal Waiting Room.
2. Splits them into groups (max 6, min 2).
3. Auto-moves members into voice channels ("Fractal Group 1", "Fractal Group 2", etc.).
4. Posts a confirmation embed with group assignments.

## Phase 3 - Presentations (4 minutes per speaker)

In each group's voice channel, the facilitator runs `/timer`. The bot:

1. Detects everyone currently in that voice channel.
2. Posts a "Meet Your Group" embed with the speaker queue.
3. Starts a **4-minute countdown** per speaker.
4. Displays interactive buttons: **Done, Skip, Come Back Later, +1 Min, Raise Hand**.
5. Pause/Resume controls.

Each member describes their contributions over the past week. The 4-minute limit forces concision. Audio supports both Stream.io (default) and 100ms (with built-in transcription).

## Phase 4 - Sequential elimination voting

The facilitator runs `/zaofractal [fractal_number] [group_number]` to start voting.

The voting flow goes **Level 6 -> Level 1** (highest rank first):

1. **Bot posts 6 colored voting buttons** (one per candidate).
2. **Bot joins voice channel** and plays an ascending-pitch audio signal to indicate a new round.
3. **Each member clicks** the button for whoever they think contributed the most.
4. **Votes are public** - the bot announces each vote in the thread.
5. **Members can change their vote** at any time during the round (button click updates the vote rather than adding to it).

### Winner detection

A simple majority wins: threshold = `ceil(group_size / 2)`. Example: a 4-person group needs at least 2 votes to lock in a winner.

### Elimination loop

1. The Level 6 winner receives **110 Respect** (ZAO 2x curve) or **55 Respect** (standard Fibonacci).
2. The winner is removed from the next round.
3. Remaining members vote on Level 5.
4. Continue through Levels 5 -> 4 -> 3 -> 2 -> 1.
5. The last remaining person (no vote needed) gets Level 1 (10 or 5 Respect).

## Phase 5 - On-chain submission

The bot generates a pre-filled URL:

```
https://zao.frapps.xyz/submitBreakout?groupnumber=N
  &vote1=WALLET_OF_RANK_6
  &vote2=WALLET_OF_RANK_5
  &vote3=WALLET_OF_RANK_4
  &vote4=WALLET_OF_RANK_3
  &vote5=WALLET_OF_RANK_2
  &vote6=WALLET_OF_RANK_1
```

The wallets come from the bot's `/register` registry. A facilitator opens the link, which launches a Vite SPA at `zao.frapps.xyz`. The SPA builds a transaction to the OREC contract on Optimism.

OREC stores the consensus on-chain. Later (after the OREC voting + veto windows close), the ZOR ERC-1155 Respect tokens are minted to the top performers' wallets.

## What "2/3 consensus" means in practice

The original Fractally protocol requires a 2/3 supermajority for the group's final ranking. ZAO Fractal's bot operationalizes this through **per-rank simple majority votes** in sequential elimination - over 6 sequential rounds with public, changeable votes, a strong supermajority effectively emerges. Members are expected to change votes when a clearer consensus appears.

## Visibility bias - the honest limitation

Ranking rewards visible work. Loud social contributions (events, casts, conversation) tend to out-rank quiet infrastructure work (code, contracts, internal tools). Every fractal community knows this and mitigates it differently. ZAOstock's sprint-fractal adaptation (Doc 498 in ZAO's research library) prescribes:

- **Explicit infra-contribution framing** during pre-session briefing
- **Facilitator pre-briefing** on the week's invisible-but-load-bearing work
- **Periodic infra-themed rounds** where ranking criteria are intentionally tilted toward maintenance work

ZAO Fractal does not yet have a formal infra-bias mitigation in production, but it is a known design space.

## Sources

- ZAO internal research: Doc 188 (the bot process), Doc 109 (90+ weeks history), Doc 114 (live infrastructure), Doc 498 (ZAOstock sprint variant + bias mitigation)
- [github.com/bettercallzaal/fractalbotmarch2026](https://github.com/bettercallzaal/fractalbotmarch2026) - the live bot codebase (private repo)
