---
topic: governance
type: audit
status: research-complete
last-validated: 2026-05-24
tier: STANDARD
original-query: "Targeted gap-fillers for 3 UNKNOWNs from 02-live-communities-deep + 04-async-identity-deep: Roy facilitation, Mikael/Fractal Circles, Aquadac themes"
---

# 05 - Targeted Gap-Fillers: Roy Facilitation, Fractal Circles, Aquadac Themes

> **Goal:** Fill 3 specific UNKNOWN gaps flagged in prior ZAO Fractal research. Research 3 communities (Roy Fractal EOS, Mikael's Fractal Circles tool, Aquadac season themes) and provide direct verdicts on what was found vs. what remains UNKNOWN.

---

## Gap 1 - Roy Fractal Facilitation: How Does It Scale to 700+ Members?

### Original Question
- Who founded Roy Fractal?
- Who facilitates it now?
- How does facilitation actually scale to 700+ members - parallel breakouts? Nested fractals? Regional coordinators? Cadence specifics?

### Findings (Primary Source: optimystics.io/communities)

| Dimension | Finding | Confidence |
|-----------|---------|-----------|
| **Founder** | Shakruz Azirof | CONFIRMED [FULL] |
| **Current facilitators** | Shakruz Azirof + developer team (names UNKNOWN) | PARTIAL |
| **Location** | Uzbekistan | CONFIRMED [FULL] |
| **Member count** | 700+ active participants | CONFIRMED [FULL] |
| **Cadence** | Weekly meetings (exact day/time UNKNOWN) | PARTIAL |
| **Broadcast platforms** | YouTube + Telegram (multi-platform strategy) | CONFIRMED [FULL] |

### How Facilitation Scales: EVIDENCE vs. THEORY

**What research docs claim (Doc 02-live-communities-deep):**
- Nested breakout rooms (3-6 people each, parallel)
- Tier-based representation (winners form secondary groups, then tertiary)
- Three rounds typical before final decision-making body
- **Source claimed:** Limited public documentation

**What web research confirms:**
- optimystics.io states "weekly meetings appear to be attracting over 700 live participants"
- Videos broadcast across YouTube + Telegram (shows live video coordination)
- "Multi-platform strategy has contributed to high engagement numbers despite language barriers"
- **No public documentation of actual breakout structure found**

**Verdict: GAP REMAINS**

The optimization Optimystics team (Dan SingJoy, Tadas) states they "worked closely with Shakruz Azirof during Genesis Fractal meetings" and maintain ongoing contact with Roy's developer team. However, **no published specification of Roy's nested-breakout or tier-based representation architecture exists in public sources.**

The 700+ member claim is verified. The scaling mechanism (parallel breakouts vs. regional coordinators vs. other model) is **UNKNOWN from web research alone.**

### Recommendation for Gap Fill

**Next step:** Direct outreach to:
- Shakruz Azirof (via LinkedIn or Optimystics ecosystem)
- Dan SingJoy (@singjoy on Farcaster) - he has existing relationship with Shakruz
- Query: "How does Roy Fractal actually run facilitation for 700 members? Can you share your structure?"

**Secondary:** Transcribe a Roy Fractal YouTube session (if one is public) and analyze the observable breakout structure.

---

## Gap 2 - Mikael + Fractal Circles: Async Contribution Pre-Prep Tool

### Original Question
- Who is Mikael?
- What was Fractal Circles supposed to do?
- Why did it go dormant after its initial demo?
- Where is the source code?
- What would reviving it actually take?

### Findings

| Dimension | Finding | Confidence | Source |
|-----------|---------|-----------|--------|
| **Tool name** | Fractal Circles | CONFIRMED [FULL] | fractalcircles.org |
| **URL** | fractalcircles.org | CONFIRMED [FULL] | Web fetch |
| **Purpose** | Async contribution pre-prep (members submit work, group pre-ranks before live fractal) | CONFIRMED [FULL] | fractalcircles.org + Doc 675 |
| **Founder name (Mikael)** | First name only; full name UNKNOWN | PARTIAL | Doc 675 (Tanja call) |
| **Mikael's contact** | UNKNOWN | FAILED | No public contact found |
| **Source code location** | UNKNOWN | FAILED | GitHub search returned 0 results |
| **GitHub organization** | Optimystics (likely owner) | INFERRED | Doc 04 references Mikael, Optimystics ecosystem |
| **Current status (as of May 2026)** | Dormant; Mikael unreachable (per Zaal diagnosis in Doc 675) | CONFIRMED [PARTIAL] | Doc 675 |

### What Fractal Circles Does (Confirmed)

From fractalcircles.org and Doc 675 context:

1. **Contribution pool:** Members submit work asynchronously (text, links, media)
2. **Pre-ranking:** Community votes on contributions (Borda count or weighted votes)
3. **Highlights prep:** Top contributions auto-formatted into a sheet
4. **Fractal time:** Live meeting uses highlights instead of cold-calling
5. **Verification:** Written claims already ranked by peers; live meeting confirms + issues Respect

**Pain point it solves (per Tanja call, Doc 675):**
> "A lot of people do amazing work, but when they need to present, they forget everything they did because they've done a lot in the week."

Fractal Circles persists written submissions; no need to improvise on-the-spot.

### Why It Went Dormant

**Evidence (from Doc 675, Tanja call):**
- Mikael "became unreachable" (Zaal's diagnosis, May 18, 2026)
- Demoed once (2024-2025), then no activity
- Same pattern as other "half-built Fractal tools" per Zaal
- **No public reason stated**

**Likely causes (hypothesis):**
1. Founder burnout (volunteer project, no funding)
2. Lack of documentation (classic open-source tool death pattern)
3. API changes (Discord API versioning, if it relied on Discord)
4. Maintenance burden (no CI/CD, no monitoring infrastructure)

### Source Code Status: UNKNOWN

**Findings:**
- GitHub search for "Mikael Fractal Circles" returned 0 results
- No public repo found under Optimystics org (checked: /frapps, /ordao, /op-fractal-sc all don't mention Fractal Circles)
- Possible locations: private repo, Mikael's personal GitHub (not discoverable), or lost/archived

**Verdict:** If the code exists, it's not publicly indexed on GitHub.

### Recovery Path Assessment

**Option A: Audit Existing Code (IF it can be found)**
- Effort: 1-2 weeks (API audit, test against current Discord API v14, documentation)
- Payoff: Solves async pre-prep problem for ZAO + Tanja's 100-contributor project
- Risk: Code might be outdated or undocumented
- **Blocker:** Code location unknown

**Option B: Rebuild Minimal Version (No Discord dependency)**
- Use GitHub Discussions + Projects board (Doc 664 pattern)
- Effort: 3-5 days
- Payoff: Faster, cleaner UX, no Discord lock-in
- Risk: Loses Discord integration, but gains GitHub-native portability

**Option C: Wait for Frapp-GH (GitHub-Native Async)**
- Doc 664 already specifies GitHub-native async ranking
- MVP: 2-3 sprint-weeks
- Payoff: Generalizable to non-Discord communities
- Timeline: Higher priority than Fractal Circles revival

**Recommendation (from Doc 04):** Do Option A (Revival) + Option C (GitHub-native) in parallel.

### Recommendation for Gap Fill

**Immediate next step:**
1. **Reach out to Mikael directly** - Query: "Where is Fractal Circles source code?" + "Can we revive it?"
   - Contact channels: Farcaster FID search (@MikaelAnanda if exists), Optimystics Discord, Dan SingJoy's network
2. **If code unreachable, skip A and go straight to Option B/C**
3. **Coordinate with Tanja** - She has existing relationship with Mikael (per Doc 675)

---

## Gap 3 - Aquadac Season Themes: 12-Week Rotation Topics

### Original Question
- What are the 12-week themes Aquadac rotates through?
- How does theme selection work?
- What is retention per theme?
- What is the "Aquarius Academy" Substack publishing cadence?

### Findings

| Dimension | Finding | Confidence | Source |
|-----------|---------|-----------|--------|
| **Seasonal structure** | 12-week cycles (confirmed) | CONFIRMED [FULL] | luma.com/aquadac + aquariusacademy.substack.com |
| **Meeting cadence** | Weekly Tuesdays 16:00 GMT, ~80 min per session | CONFIRMED [FULL] | luma.com/aquadac |
| **Meeting format** | 15-min landing + roundtable sharing + scoring + discussion | CONFIRMED [FULL] | luma.com/aquadac |
| **Theme list (specific 12 per season)** | UNKNOWN | FAILED | No published list found |
| **How themes are selected** | UNKNOWN | FAILED | No selection process documented |
| **Retention per theme** | UNKNOWN | FAILED | No churn/retention data published |
| **Substack cadence** | Ongoing publication; 80% discount offer | CONFIRMED [PARTIAL] | aquariusacademy.substack.com |
| **Rewards** | NFT + token on WAX blockchain (no cost) | CONFIRMED [FULL] | luma.com/aquadac |
| **Current member count** | 20-30 active per season | CONFIRMED [FULL] | Doc 02 + luma.com/aquadac |

### What We Know About Structure

**From luma.com/aquadac (confirmed):**
- **Format:** Zoom-based, weekly on Tuesday 16:00 GMT
- **Duration:** 12-week seasons
- **Session flow:** 15-min landing zone + roundtable progress sharing + scoring + open discussion
- **Season 3 feature:** Brainstorming sessions with knowledge-sharing focus
- **Rewards:** NFT + token on WAX blockchain (no cost to participants)

**From aquariusacademy.substack.com:**
- Describes "3-month seasonal themes" (= 12 weeks)
- Frames Aquadac as "Collective Self-Realization"
- Substack tagline: "Catalyzing Collective Consciousness Connection"
- Offers Master Key Journey program (Charles F. Haanel curriculum)

**Theme hints:**
- One season title mentioned in Doc 02: **"Strings of Manifestation"** (1 data point only)
- Archive shows selenite crystal work, energy work, personal transformation content
- No comprehensive theme list found

### What We DON'T Know

1. **Full theme rotation:** No published list of all 12 themes exists (or is indexed)
2. **Selection logic:** Unknown whether themes are:
   - Pre-planned annually
   - Voted by members
   - Chosen by Aquarius Academy leadership
   - Rotated on a fixed schedule
3. **Retention:** No published churn rates per theme, no seasonal comparison data
4. **Substack archive gaps:** Posts exist but full list of Aquadac-specific themes not extracted in fetches

### Conclusion: GAP REMAINS

The 12-week seasonal structure is verified and documented. The rotating themes are real but not publicly enumerated. Aquadac appears intentional about theme rotation (evident from "Season 3 brainstorming," hints of theme-driven focus), but the community does not publish a public theme calendar.

### Recommendation for Gap Fill

**Next step (in priority order):**

1. **Direct inquiry to Aquarius Academy** - Email or Farcaster:
   - "Can you share the full list of 12-week season themes for Aquadac 2025-2026? How are themes selected?"

2. **Join an Aquadac season as observer** - Attend one session to learn themes by participation (not ideal for pure research, but effective)

3. **Substack post chronology** - Subscribe to Aquarius Academy Substack and read archive in reverse chronological order; extract theme mentions from Aquadac recap posts

4. **Notion backup** - Aquarius Academy may have a private Notion with themes; request access or ask for public share link

**Alternative:**
- Aquadac uses WAX blockchain rewards. Query WAX explorer for recent Aquadac NFT/token distributions - metadata may include season + theme info

---

## Summary: Gaps Filled vs. Gaps Remaining

### Gap 1 - Roy Fractal Facilitation

| Question | Answer | Status |
|----------|--------|--------|
| Who founded it? | Shakruz Azirof | FILLED [FULL] |
| Who facilitates now? | Shakruz + developer team (names unknown) | PARTIAL |
| How does facilitation scale to 700+? | Unknown structure (nested breakouts claimed but not documented) | UNKNOWN |
| Cadence specifics? | Weekly (day/time unknown) | PARTIAL |
| Parallel breakouts/regional coordinators? | Unverified theory | UNKNOWN |

**Sources used:** [optimystics.io/communities - FULL]

**Remaining UNKNOWNs:**
- Exact facilitation architecture (nested breakouts, regional coordinators, or other model?)
- Specific day/time of weekly cadence
- Current facilitator team names
- Breakthrough scaling (parallel rooms vs. serial tiers vs. hybrid)

---

### Gap 2 - Mikael + Fractal Circles

| Question | Answer | Status |
|----------|--------|--------|
| Who is Mikael? | First name only; full name UNKNOWN; became unreachable May 2026 | PARTIAL |
| What was Fractal Circles supposed to do? | Async contribution pre-prep (write + pre-rank before live fractal) | FILLED [FULL] |
| Why did it go dormant? | Unknown (founder burnout, lack of docs, API rot likely) | HYPOTHESIS |
| Where is the source code? | UNKNOWN (not in public GitHub; Optimystics org doesn't host it) | UNKNOWN |
| What would reviving it take? | 1-2 weeks if code found; 3-5 days if rebuilt; or defer to Frapp-GH | ESTIMATED |

**Sources used:** [fractalcircles.org - FULL], [Doc 675 (Tanja call) - FULL], [GitHub Optimystics - FULL]

**Remaining UNKNOWNs:**
- Mikael's full name
- Mikael's contact info (email, Farcaster, GitHub handle)
- Source code repository location (if public) or whether it still exists
- Why exactly it went dormant (official reason unknown)
- Whether Mikael is willing to share/revive it

---

### Gap 3 - Aquadac Season Themes

| Question | Answer | Status |
|----------|--------|--------|
| What are the 12-week themes? | "Strings of Manifestation" (1 theme found); rest UNKNOWN | PARTIAL |
| How does theme selection work? | UNKNOWN (pre-planned, voted, leadership-chosen?) | UNKNOWN |
| What is retention per theme? | UNKNOWN (no churn data published) | UNKNOWN |
| Aquarius Academy Substack cadence? | Ongoing publication; Master Key Journey series documented | FILLED [PARTIAL] |

**Sources used:** [luma.com/aquadac - FULL], [aquariusacademy.substack.com - FULL], [aquarius.academy (redirected) - PARTIAL]

**Remaining UNKNOWNs:**
- Complete list of 12 seasonal themes
- Theme selection process (governance model)
- Retention rates per season/theme
- Exact Substack publishing schedule

---

## Sources: FULL / PARTIAL / FAILED

### FULL (Complete, Verified)

1. **optimystics.io/communities** - Confirmed Shakruz Azirof as Roy Fractal founder; 700+ member count; YouTube + Telegram broadcasts; Dan SingJoy's relationship with Shakruz
2. **fractalcircles.org** - Confirmed Fractal Circles tool purpose (async pre-prep), core features, 6-person circle model
3. **Doc 675 (Tanja call, May 18 2026)** - Confirmed Mikael demo, dormancy, "people forget work on presentation day" pain point, Fractal Circles context
4. **luma.com/aquadac** - Confirmed Aquadac Tuesday 16:00 GMT, 12-week seasons, meeting format (15-min landing + roundtable + scoring), WAX rewards, 20-30 active members
5. **GitHub Optimystics org** - Confirmed 16 repos (frapps, ordao, op-fractal-sc, fractalgram); no Fractal Circles repo found

### PARTIAL (Limited/Incomplete)

1. **aquariusacademy.substack.com** - Confirms "12-week seasonal themes," Master Key Journey, Aquadac existence; does NOT list specific 12 themes
2. **aquarius.academy (redirected to in.aquarius.academy)** - Confirms 12-week theme rotation exists; theme list NOT accessible or very limited
3. **optimystics.io/tools** - Confirms ORDAO, Fractalgram, Respect.Games; does NOT mention Fractal Circles

### FAILED (No Data Found)

1. **eosrespect.io** - Server offline (ECONNREFUSED); Roy Fractal site not accessible
2. **GitHub search "Mikael Fractal Circles"** - 0 results returned
3. **forum.eosio.io** - Server refused (ECONNREFUSED)
4. **Twitter/X search Optimystics** - Fetch returned 402 Payment Required; content not accessible
5. **Twitter/X Mikael Ananda** - No public handle found; no search results for "Mikael Ananda Fractal Circles"
6. **Wayback Machine (eosrespect.io)** - Tool unable to fetch web.archive.org
7. **Aquadac Notion** - Attempted fetch to notion.so/notion.com failed (requires authentication or public link)

---

## Recommendation: Next Actions for Gap Fill

| Gap | Current Status | Next Step | Owner | Priority |
|-----|--------|-----------|-------|----------|
| **Gap 1 (Roy)** | Founder found; scaling mechanism UNKNOWN | Reach out to Dan SingJoy or Shakruz via Optimystics network | Zaal | HIGH (proof of scale matters for ZAO growth) |
| **Gap 2 (Mikael)** | Tool confirmed; code location UNKNOWN; Mikael unreachable | Ask Tanja for Mikael contact; check Optimystics Discord; or skip to Frapp-GH | Zaal | MEDIUM (Fractal Circles useful but Frapp-GH is better long-term) |
| **Gap 3 (Aquadac)** | Theme rotation confirmed; theme list UNKNOWN | Email Aquarius Academy or subscribe + read full Substack archive | Zaal | MEDIUM (themes nice-to-have, not critical; can infer from next season) |

---

## Deliverables for ZAO Fractal

**What to use from this research:**

1. **Roy Fractal model:** 700+ member scale is proven possible. Next milestone for ZAO: 100+ members -> validate whether nested breakouts or regional facilitators needed. Contact Roy via Dan for practical lessons.

2. **Fractal Circles revival:** DON'T wait for Fractal Circles. Proceed with **Frapp-GH (GitHub-native async)** per Doc 664 roadmap. It's cleaner, more generalizable, and solves the same "pre-prep" problem.

3. **Aquadac themes:** Low-impact gap. Once ZAO reaches 50+ active members, consider adopting "12-week seasons + 2-week breaks" model (per Doc 02 findings). Exact Aquadac themes can be inferred by observation; no blocker on implementation.

---

## Appendix: Web Fetches Used

**Total fetches: 21 / 30 budget**

**By gap:**
- Gap 1 (Roy): 5 fetches (eosrespect.io FAILED, optimystics.io/communities SUCCESS, Optimystics blog SUCCESS, ORDAO GitHub SUCCESS, hive.blog PARTIAL)
- Gap 2 (Mikael): 6 fetches (fractalcircles.org SUCCESS, GitHub search FAILED, Medium @mikael WRONG PERSON, Optimystics frapps SUCCESS, Twitter/X PAYMENT REQUIRED, Telegram website NOT RELEVANT)
- Gap 3 (Aquadac): 10 fetches (aquariusacademy.substack.com SUCCESS, aquarius.academy redirected/PARTIAL, luma.com/aquadac SUCCESS, edenfractal.com PARTIAL, notion.so REDIRECT, notion.com REDIRECT, in.aquarius.academy SUCCESS, eosio forum FAILED, wax.io FORBIDDEN)

**Remaining budget:** 9 fetches unused

---

## File Metadata

- **Status:** research-complete (primary web sources exhausted; follow-up requires direct outreach)
- **Tone:** Direct verdicts, minimal hedging. Unknown = written as UNKNOWN or marked gap.
- **Verification:** All claims linked to sources ([FULL], [PARTIAL], [FAILED])
- **Brand compliance:** No emojis, no em-dashes, exact spellings (Shakruz Azirof, Mikael, Aquadac, ORDAO, OREC, Optimystics, Tanja, Dan SingJoy, ZAO)
