# Core Identity Detective - Compact Plan

> Read the telemetry. Figure out what happened.
>
> 有限信息，无限脑补。

A tiny bilingual detective game about enterprise identity signals, wrong assumptions, and overconfident engineers.

## 1) Project Intent

Build a static, no-backend game that feels like:

- corporate survival horror, but cute
- incident response, but as comedy
- detective fiction, but with org chart clues

A round should be fast: under 1 minute.

## 2) Non-Negotiables

- All data is fictional (names, orgs, events, screenshots).
- No real company-internal information.
- Static deploy target: GitHub Pages.
- MVP tech posture stays simple:
  - no backend
  - no database
  - no auth
  - no build pipeline required
- Bilingual UI: English + Chinese.

## 3) Current Baseline (Already Shipped)

- Game shell in index.html.
- Case content in cases.js (global cases array).
- 100 finished cases (case-001 to case-060).
- 20-case runs (one "Fiscal Year" per run).
- Randomized, non-repeating runs in one browser until case bank is exhausted.
- Confidence-based scoring (wrong + confident hurts most).
- End-of-run Fiscal Year review.
- Achievement system is live.

## 4) Core Experience Rules

### Gameplay Loop

Open case -> read signals -> pick hypothesis -> set confidence -> submit -> reveal truth -> score -> next case.

### Core Joke

The obvious answer is often wrong.

### Scoring Rule (Single Source of Truth)

- If correct: score = 50 + confidence / 2
- If wrong: score = -confidence

Confidence is 0-100.

## 5) Case Contract (Do Not Break)

Each case keeps this structure:

- id: kebab-case, unique (example: case-061)
- difficulty: easy | medium | hard
- tags: lowercase-hyphen strings
- title / intro / actualCause / explanation / resultFlavor: all visible text as { en, zh }
- telemetry[]: { key, value, status }
- telemetry.status: normal | warning | alarming | unknown
- choices[]: { id, label }
- answer: one choice id, or sentinel none for intentionally insufficient-data cases

Rule: all player-visible strings must be bilingual pairs, never bare strings.

## 6) Tone and Writing Guardrails

### English

- deadpan
- short and sharp
- fake seriousness
- no real company references

### Chinese

- internet meme flavor, but not abusive
- situational translation over literal translation
- keep jokes readable, avoid over-hard punctuation

Narrative principle:

> Not every anomaly deserves escalation.
>
> Sometimes the most correct answer is: "Insufficient telemetry."

### Meme Direction (Add More Flavor, Keep Safety)

- Default joke style: serious incident report language describing absurdly small problems.
- Favorite punchline pattern: huge confidence, tiny root cause.
- Keep it fictional and reusable for any large company.

High-frequency meme themes to reuse:

- it-was-dns (but not always)
- calendar/holiday/timezone chaos
- org chart astrology (manager changed, destiny changed)
- badge panic from harmless UI glitches
- naming collisions (same display name, wrong person escalated)
- security theater vs actual security
- "someone rotated a secret" detective arc
- "works in one region only" travel mystery
- copied runbook from 2019 as ancient prophecy

## 7) Meme and Story Expansion Kit

Use this section when writing new cases so the humor stays dense and consistent.

### A) 10 Ready-to-Use Story Seeds

#### 1. The 3AM Hero Deploy

- Signal: one team says "resolved"; three regions disagree.
- Truth: wrong environment variable name in one region only.

#### 2. The Ghost PTO Case

- Signal: user offline, calendar empty, manager unknown.
- Truth: vacation auto-reply failed to sync; person is at the beach.

#### 3. The Two Alex Problem

- Signal: HR ticket filed against the wrong Alex.
- Truth: duplicate display names, different aliases.

#### 4. The Meeting That Ate Production

- Signal: sudden latency spike at :00 every hour.
- Truth: a "mandatory all-hands" bot job over-polls directory APIs.

#### 5. The Compliance Mirage

- Signal: dashboard all green, incident channel on fire.
- Truth: monitoring query filtered out the failing tenant.

#### 6. The Seasonal Permission Drift

- Signal: access removed, then restored, then removed.
- Truth: two automation jobs fighting with opposite rules.

#### 7. The Infinite Escalation Ladder

- Signal: every owner says "not my service".
- Truth: shared library bug owned by everyone and no one.

#### 8. The Emoji Outage

- Signal: one user's profile breaks every form.
- Truth: legacy parser fails on emoji in display name.

#### 9. The Security Drill That Was Real

- Signal: everyone assumes simulation.
- Truth: this one is an actual credential leak.

#### 10. The Fiscal Year Fortune Cookie

- Signal: review says "excellent judgment" after five wrong answers.
- Truth: player only used low confidence and avoided over-escalation.

### B) Joke Construction Formula (Per Case)

Keep each case structured as:

- setup: looks catastrophic
- clues: 2 real, 1 misleading, 1 absurd but true
- player trap: obvious answer is tempting
- reveal: root cause is smaller, weirder, or socially awkward
- aftertaste: one deadpan line that sounds like postmortem poetry

One-line endings (drop-in style):

- "Nothing failed except assumptions."
- "The system was healthy; the spreadsheet was not."
- "Incident severity downgraded from existential to embarrassing."
- "Root cause confirmed: confidence exceeded evidence."

### C) Bilingual Meme Style Rules

- English line: dry, official, under-emotional.
- Chinese line: meme-aware, conversational, not hostile.
- Do not translate literally when the joke dies; rewrite by scene.
- Avoid real-person mockery; joke about process, tools, and certainty.

### D) Suggested New Tags for Funny Cases

- overconfident-detective
- it-was-calendar
- wrong-alex
- runbook-archaeology
- security-theater
- works-on-my-region
- postmortem-poetry

These tags can feed achievements and Fiscal Year review commentary later.

## 8) Contributor Playbook

When adding a new case:

1. Copy a recent case as template.
2. Keep contract fields complete and bilingual.
3. Ensure answer logic is deterministic (or explicit none sentinel).
4. Add relevant tags for achievements/review stats.
5. Keep humor in-universe: incident-console + detective notebook vibe.
6. Run a quick browser sanity check (language switch, submit gating, score, result text).

## 9) What I Still Want (For Future Contributors)

Priority order, if you want to help:

1. Case Library screen
   - Home button currently deferred/hidden; want a browseable library view.
2. Fiscal Year review polish
   - richer review text for 2nd/3rd/4th+ runs, less repetitive summaries.
3. Meme Pack + Story Pack
   - ship one curated batch of new meme-heavy cases with consistent tag taxonomy.
4. Per-case visual accents
   - tiny art/style cues without adding heavy frontend complexity.
5. Better contribution ergonomics
   - optional contributor checklist doc and case template snippet.
6. Optional sharing layer
   - shareable run summary text/image, still fully privacy-safe.

Important: quality over volume. Bad jokes at scale are harder to recover than missing case count.

## 10) Out of Scope Until Explicitly Re-approved

- backend services
- real analytics
- account systems
- real employee or company data (except LinkedIn)
- complicated state frameworks
