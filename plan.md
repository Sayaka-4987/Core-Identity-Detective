# Core Identity Detective

> Follow the telemetry. Find the truth.  
> 根据不完整的企业身份信息，推断某个神秘员工身上发生了什么。

## Project Goal

**Core Identity Detective** is a tiny bilingual static web game inspired by enterprise identity telemetry, org chart archaeology, and the extremely normal engineer habit of over-interpreting directory signals.

This project is not affiliated with any company. All characters, organizations, and datasets are fictional.

The expected output is a **single-page static web game** that can be deployed to **GitHub Pages**.

MVP target:

- One repository
- One `index.html` file if possible
- Optional separate `cases.js` / `style.css` later
- No backend
- No database
- No login
- No build step required for MVP
- Bilingual UI: English / 中文
- Case content should be easy to edit

## One-line Pitch

A programmer-themed detective game where the player reads fake enterprise identity telemetry and guesses what happened to a mysterious coworker.

## Vibe

- Corporate survival horror, but cute
- Enterprise identity lifecycle as detective fiction
- “It looks like a layoff, but maybe it was just a sync incident”
- Programmer overconfidence simulator
- YAML/JSON-flavored UI
- Deadpan incident-management humor
- Bilingual Chinese/English meme writing

## Inspirations

- Return of the Obra Dinn
- Papers, Please
- Her Story
- Corporate org charts
- Outlook / GAL / Core Identity-style signals
- Incident RCA culture
- “我的教师资格证一闪一闪的”
- “GALGame = Global Address List Game”

## Core Gameplay Loop

```text
Open Case
↓
Read identity telemetry
↓
Pick a hypothesis
↓
Set confidence level
↓
Submit investigation
↓
Reveal actual cause
↓
Score result
↓
Next case
```

A full round should take less than one minute.

## Core Mechanic

The player sees incomplete signals such as:

```yaml
Alias: jdoe
Photo: Missing
Manager: NULL
Groups: 0
GAL: Hidden
Teams: Offline
```

Then chooses what happened:

```text
A. Internal Transfer
B. Layoff
C. Identity Sync Failure
D. Vacation
```

The twist: the obvious answer is often wrong.

The player also chooses a confidence level:

```text
Confidence: 0% - 100%
```

Scoring should punish overconfidence:

> Guessing wrong is bad.  
> Guessing wrong with 95% confidence is comedy.

## MVP Features

### Required

- Static `index.html`
- Case list stored in editable JavaScript object or JSON-like structure
- Language toggle: English / 中文
- Start screen
- Case screen
- Multiple choice answers
- Confidence slider
- Result screen
- Basic score calculation
- At least 5 cases
- Deployable via GitHub Pages

### Nice to Have

> Confirmed non-MVP in the UI Layout notes: **Case library** and **Random
> case mode**. **Update**: random case order is now shipped (runs are
> shuffled and non-repeating). The Home Screen `[Case Library]` button is
> still deferred and currently hidden. Did not let either block the MVP.

- Case library
- Random case mode
- Case difficulty labels
- Achievement unlocks
- Bad endings
- LocalStorage progress
- Dark mode
- Tiny animations
- Shareable result text

> LocalStorage key naming convention: prefix
> every key with `cid-` so the game's storage is namespaced and easy to
> clear. Keys in use: `cid-lang` (UI language), `cid-total` (saved total
> score), `cid-progress` (case index within the current run), `cid-order`
> (the current run's shuffled case indices), `cid-runlog` (per-case log for
> the Fiscal Year review), `cid-achievements` (cumulative unlocks), and
> `cid-seen` (ids of every case played in this browser, so runs do not
> repeat until the bank is cleared).

### Do Not Build in MVP

- Backend
- Authentication
- Real company data
- Real employee data
- Real Microsoft names / aliases / orgs
- Analytics
- Database
- Build pipeline
- Complex state management

## Important Privacy / Safety Rule

All data must be fictional.

Do not include:

- Real employee aliases
- Real org names
- Real internal field dumps
- Real Core Identity screenshots
- Real HR events
- Real layoff details
- Anything that could identify a person or company-internal system

Use fake names like:

```text
jdoe
alex.fox
sam.river
case-ghost-001
```

Use generic company language:

```text
Global Address List
Directory
Identity Service
Org Chart
Manager Field
Groups
```

Avoid naming a real employer in game content. The joke should work for any large company.

## Suggested File Structure

For the simplest MVP:

```text
Core Identity-detective/
  index.html
  plan.md
  README.md
```

Optional later structure:

```text
Core Identity-detective/
  index.html
  style.css
  cases.js
  plan.md
  README.md
```

Single-file MVP is preferred because it is easy to deploy and vibe-code.

> Status (post-MVP): the content has been split out into `cases.js`. The
> game logic and UI strings still live in `index.html`; `cases.js` declares
> the global `cases` array and is loaded first via a plain `<script src>`
> (no build step, no modules). `style.css` stays inline for now. Edit
> `cases.js` to add or change cases without touching game logic.

## Data Model

Case content should be editable without touching UI logic too much.

Field contract (so the renderer stays simple and deterministic):

- `id`: unique string, kebab-case, e.g. `case-001`.
- `difficulty`: one of `"easy" | "medium" | "hard"`.
- All player-visible text is a `{ en, zh }` pair. Never a bare string.
- `telemetry[].status`: one of exactly
  `"normal" | "warning" | "alarming" | "unknown"`.
  These map to colors in the Visual Style section
  (normal=green, warning=yellow, alarming=red, unknown=gray).
- `choices[].id`: stable string, unique within the case.
- `answer`: must equal exactly one `choices[].id` in the same case.
  The renderer scores a submission as correct iff the selected choice id
  `=== answer`. (For joke cases whose "real" cause is not a normal option,
  still make `answer` point at the intended choice id, e.g. the gag option,
  so scoring has a single deterministic rule. See Initial Case Ideas.)

Suggested JavaScript structure:

```js
const cases = [
  {
    id: "case-001",
    difficulty: "easy",
    title: {
      en: "The Missing Photo",
      zh: "消失的头像"
    },
    intro: {
      en: "A coworker's profile photo disappeared overnight.",
      zh: "一位同事的头像一夜之间消失了。"
    },
    telemetry: [
      {
        key: { en: "Alias", zh: "Alias" },
        value: { en: "jdoe", zh: "jdoe" },
        status: "normal"
      },
      {
        key: { en: "Photo", zh: "头像" },
        value: { en: "Missing", zh: "消失" },
        status: "warning"
      },
      {
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Present", zh: "存在" },
        status: "normal"
      },
      {
        key: { en: "GAL", zh: "GAL" },
        value: { en: "Visible", zh: "可见" },
        status: "normal"
      }
    ],
    choices: [
      {
        id: "layoff",
        label: { en: "Layoff", zh: "被裁了" }
      },
      {
        id: "sync_failure",
        label: { en: "Identity Sync Failure", zh: "身份同步炸了" }
      },
      {
        id: "vacation",
        label: { en: "Vacation", zh: "休假中" }
      },
      {
        id: "transfer",
        label: { en: "Internal Transfer", zh: "内部转组" }
      }
    ],
    answer: "sync_failure",
    actualCause: {
      en: "Identity Sync Failure",
      zh: "身份同步炸了"
    },
    explanation: {
      en: "Only the photo is missing. The manager, GAL visibility, and groups are still normal. This is more likely a sync issue than an actual disappearance.",
      zh: "只有头像消失了，Manager、个人页面可见性和 Groups 都还正常。比起真的人没了，这更像是同步服务炸了。"
    },
    resultFlavor: {
      correct: {
        en: "Good catch. You did not over-escalate a profile photo bug into an HR incident.",
        zh: "判断正确。你没有把一个头像 bug 升级成 HR 事件。"
      },
      wrong: {
        en: "The badge fired, but only because the backend was on fire.",
        zh: "头像确实消失了，但只是因为后端着火了。"
      }
    }
  }
];
```

## UI Layout

> Developer notes that apply to every screen below:
>
> - **Language toggle**: default language is `en`. Toggling re-renders the
>   current screen in place (it does not reset the case or score). Persisting
>   the choice across reloads (LocalStorage) is Nice-to-Have, not MVP.
> - **`[Case Library]` button**: the Case Library is a Nice-to-Have feature.
>   For the MVP, either hide this button or wire it to start the normal
>   sequential run. Do not block the MVP on building a library view.
> - **Submit gating**: `[Submit Investigation]` stays disabled until the
>   player has selected one of the choices. Confidence has a default
>   (`50`) so it is always valid.

### Home Screen

```text
Core Identity Detective
Follow the telemetry. Find the truth.

[Start Investigation]
[Case Library]

Language: English | 中文
```

Chinese copy:

```text
Core Identity Detective
读取档案，找出真相。

[开始调查]
[案件列表]

语言：English | 中文
```

### Case Screen

Suggested layout:

```text
┌──────────────────────────────────────┐
│ Case #001: The Missing Photo          │
│ Difficulty: Easy                      │
├──────────────────────────────────────┤
│ Identity Telemetry                    │
│ Alias: jdoe                           │
│ Photo: Missing                        │
│ Manager: Present                      │
│ Groups: 12                            │
│ GAL: Visible                          │
├──────────────────────────────────────┤
│ What happened?                        │
│ ○ Layoff                              │
│ ○ Internal Transfer                   │
│ ○ Identity Sync Failure               │
│ ○ Vacation                            │
│                                      │
│ Confidence: [------|----] 70%         │
│                                      │
│ [Submit Investigation]                │
└──────────────────────────────────────┘
```

### Result Screen

Correct:

```text
Correct
Actual Cause: Identity Sync Failure

Only the photo is missing. The manager, GAL visibility, and groups are still normal.

Score: +80
```

Wrong:

```text
Incorrect
Your Guess: Layoff
Confidence: 95%
Actual Cause: Identity Sync Failure

Overconfidence Penalty Applied.

Score: -95
```

Chinese:

```text
判断错误
你的判断：被裁了
信心：95%
真实原因：身份同步炸了

已应用过度自信惩罚。

得分：-95
```

> Note: the score shown here (`-95`) is computed from the formula in the
> Scoring Idea section (`-confidence` with confidence = 95). An earlier
> draft showed `-45`; ignore that and always derive the number from the
> formula.

> After the Result Screen, a `[Next Case]` button advances to the next case
> in the run. **Shipped**: case order is randomized per run, and a run is one
> Fiscal Year of up to 20 cases drawn from the cases this browser has not yet
> played (tracked in `cid-seen`), so successive runs never repeat a case
> until the whole bank is exhausted. After the last case of a run, the
> end-of-run screen shows the Fiscal Year review (see Ending Design
> Philosophy). When the bank is fully cleared, the same screen shows a
> "case bank cleared" prompt pointing the player at contributing more cases.

## Scoring Idea

Simple MVP formula (this is the single source of truth; the Result Screen mockups above are illustrative only and must follow these numbers):

```text
if correct:
  score = 50 + confidence / 2
else:
  score = -confidence
```

`score` for a case is an integer. `confidence` is the 0-100 slider value.
Round with `Math.round` if `confidence` is odd.

Score accumulation:

- Keep a running `totalScore` for the current session (sum of all case scores).
- Show both the per-case delta (e.g. `+80`) on the Result Screen and the
  running `totalScore` somewhere visible.
- `totalScore` resets when the player starts a new investigation run from
  the Home Screen. Persisting it across reloads is a Nice-to-Have
  (LocalStorage), not MVP.

Examples:

```text
Correct with 80% confidence: +90
Wrong with 30% confidence: -30
Wrong with 95% confidence: -95
```

Optional label:

```text
0-30%: Cautious
31-70%: Reasonable
71-90%: Confident
91-100%: Famous Last Words
```

Chinese:

```text
0-30%：大胆猜想
31-70%：小心推测
71-90%：自信推断
91-100%：全部梭哈
```

## Content Roadmap

> Scope note: a run is **one Fiscal Year = up to 20 cases**, drawn at
> random from what this browser has not yet played. The bank now holds 60
> cases (three Fiscal Years' worth); once a browser has cleared all of them
> the game says so rather than recycling, and points the player at adding
> more. Grow content in small batches so quality stays high.

Target progression:

- **Done**: 60 cases, living in `cases.js`. Mix of
  easy/medium/hard, including joke / bad-end cases and `answer: "none"`
  insufficient-telemetry cases. Achievements cover the major themes.
  Runs are shuffled and never repeat a case until the bank is cleared.
- **Next**: balance and polish rather than raw count, e.g. a fourth Fiscal
  Year of fresh cases, per-Fiscal-Year review copy, or per-case art.
- **Later**: only after a post-MVP feature that needs new case fields (see
  below) is chosen, extend the field contract first, then keep authoring.

Why not write 100 (or even 20) cases first:

- Hand-writing bilingual jokes at volume degrades in quality long before
  the target, and front-loads the most expensive, least-reversible work.
- Several post-MVP features add per-case fields. Writing the cases first
  means re-editing every case when a field is added. Examples of fields a
  feature might introduce:
  - `tags` (e.g. `it-was-dns`, `actually-a-layoff`) for **Achievements**.
  - `badEnding` for **Bad Endings** (case-005 currently fakes this through
    `resultFlavor.wrong`).
  - `category` / `theme` to let the **Fiscal Year performance review**
    summarize a player's blind spots ("you over-escalate sync incidents").
- Keep `id` sequential and kebab-case (`case-006`, `case-007`, ...) and
  vary `difficulty` so a 20-case run has a sensible curve.

## Initial Case Ideas

### Case 001: The Missing Photo / 消失的头像

Telemetry:

```yaml
Photo: Missing
Manager: Present
Groups: Normal
GAL: Visible
```

Actual cause:

```text
Identity Sync Failure
```

### Case 002: The Quiet Transfer / 平静转组

Telemetry:

```yaml
Photo: Visible
Manager: Changed
Title: Same
Cost Center: Changed
GAL: Visible
```

Actual cause:

```text
Internal Transfer
```

### Case 003: The Ghost Account / 幽灵账号

Telemetry:

```yaml
Photo: NULL
Manager: NULL
Groups: 0
GAL: Visible
Teams: Unknown
```

Actual cause:

```text
Nobody knows
```

> Data-model note: `actualCause` can read `Nobody knows`, but `answer`
> still has to point at a real `choices[].id`. Decide which option counts
> as "correct" for this case (suggestion: there is no correct answer, so
> mark every choice wrong by setting `answer` to a sentinel id like
> `"none"` that is not in `choices`, and special-case it in scoring). Pick
> one approach and keep it consistent across all joke cases.

### Case 004: Reorg Weather / 组织架构调整

Telemetry:

```yaml
Manager: Changed
Skip Manager: Changed
Title: Same
Groups: Normal
GAL: Visible
```

Actual cause:

```text
Reorg
```

### Case 005: World Cup Incident / 世界杯事故

This should be a hidden or joke case.

Telemetry:

```yaml
Coworker Small Talk: World Cup
Phrase Detected: your country
Employee Response: Do I look Japanese or Korean to you?
Badge: Flashing
Coworker Status: Panic
```

Choices:

```text
A. Cultural Miscommunication
B. HR Incident
C. Chinese Men's Football
D. Identity Sync Failure
```

Actual cause:

```text
Chinese Men's Football
```

Bad ending:

```text
BAD END: 给同事讲了个中国男足笑话
```

English flavor:

```text
BAD END：Support Your Country

You attempted to ask a coworker
whether they were supporting their country
during the World Cup.

You just asked an innocent World Cup question.

The response was:

"Do I look Japanese or Korean to you?"

You are still thinking about it.

```

Chinese flavor:

```text
BAD END：Support Your Country

你在世界杯期间问了同事一个无辜的问题：“你有没有给你的国家买球队 T 恤”，你其实不知道哪些国家进了世界杯。

得到的回答是：

“我看起来像日本人或者韩国人吗？”

你至今仍在反思。
```

## Achievement Ideas

```text
GAL master
Global Address List Game
Not A Layoff
Actually A Layoff
It Was DNS
It Was HR
It Was Not HR
Identity Sync Strikes Again
Org Chart Archaeologist
Overconfidence Any%
工牌一闪一闪的
Root Cause: Chinese men soccer
Cross-Cultural Critical Hit
```

Chinese versions:

```text
G(lobal)A(ddress)L(ist)Game
GAL 领域大神
不是裁员
真的是裁员
都是 DNS 的锅
是 HR
不是 HR
身份同步失败
组织架构考古学家
过度自信
工牌一闪一闪的
中国男足不行
跨文化暴击
```

## Tone Guide

### English Tone

- Deadpan
- Corporate incident report humor
- Short sentences
- Fake seriousness
- Avoid real company names

Example:

```text
The signal looked terrifying.
Unfortunately, the backend was merely on fire.
```

### Chinese Tone

- 中文互联网 meme 感
- 但不要太阴阳怪气到攻击真人
- 也不要引来律师函警告
- 可以一本正经胡说八道
- 多用“Root Cause”、“事故”、“工牌闪了”、“同步炸了”这类互联网 IT 公司梗

Example:

```text
看起来像人没了。
实际上只是同步服务没了。
```

## Visual Style

- Dark background
- Terminal / dashboard feel
- Cards with fake telemetry
- Warning colors:
  - Green: normal
  - Yellow: suspicious
  - Red: alarming
  - Gray: unknown/null
- Monospace for telemetry
- Clean readable UI
- No company logos
- No real product branding

Suggested vibe:

```text
Corporate dashboard + detective notebook + incident console
```

## Ending Design Philosophy

> Scope note for the developer: the Fiscal Year review and review-then-new-run
> loop in this section are **shipped**. One difference from the original
> "endless loop" vision: runs do not recycle cases. Each new Fiscal Year
> draws from the cases this browser has not played yet, and once the bank is
> cleared the loop ends with a "case bank cleared" prompt instead of looping
> forever. The endless framing below is aspirational flavor; in practice
> "another case" lasts until the player has seen all 60.

Every 20 cases count as one Fiscal Year.

At the end of a cycle, the player receives a performance review based on their investigation history and overall detective profile.

After the review, a new cycle begins.

There is no permanent ending.

There is always another case.

There is always another signal.

There is always another mystery.

The goal of the game is not merely to accumulate correct answers.

More importantly, it is to learn how to evaluate uncertainty.

The best detectives are not the ones who are always right.

They are the ones who can honestly say:

> "I don't know."

when the evidence is insufficient.

As the player gains experience, they gradually learn a second principle:

> Sometimes, you know too much.

Not every anomaly needs an escalation.

Not every signal deserves a theory.

Not every theory should be spoken aloud.

Knowing when to investigate requires curiosity.

Knowing when to stop requires judgment.

Knowing when to remain silent requires wisdom.

In the beginning, players try to maximize accuracy.

Eventually, they learn that certainty itself is a resource that must be managed carefully.

Reality is messy.

Telemetry is incomplete.

People tell stories to fill the gaps.

Engineers tell stories to fill the gaps and attach confidence percentages.

The purpose of telemetry is not to eliminate uncertainty.

It is to measure it.

And sometimes, the most correct answer is:

> "Insufficient telemetry."

### Detective's Principles

The novice detective says:

> "I know exactly what happened."

The experienced detective says:

> "I don't know what happened."

The master detective says:

> "I know what happened.
> But perhaps I should not be the one saying it."

### Final Lesson

Every case in the game is ultimately about the same thing:

Humans are meaning-making machines.

Give them a missing profile photo,
a changed manager,
or a hidden directory entry,

and they will create a story.

Sometimes the story is correct.

Sometimes the backend was simply on fire.

The player who finishes a cycle with perfect accuracy is impressive.

The player who understands the limits of their knowledge is exceptional.

## GitHub Pages Deployment Plan

For single-file MVP:

1. Create repo: `Core Identity-detective`
2. Add `index.html`
3. Add `plan.md`
4. Add `README.md`
5. Push to GitHub
6. Go to repository settings
7. Enable GitHub Pages
8. Source: deploy from branch
9. Branch: `main`
10. Folder: `/ (root)`
11. Visit published URL

Expected output:

```text
https://<username>.github.io/core-identity-detective/
```

## README Draft

```md
# Core Identity Detective

Follow the telemetry. Find the truth.

Core Identity Detective is a tiny bilingual static web detective game about fake enterprise identity telemetry, org chart archaeology, and overconfident incident analysis.

Everything is fictional. No real employee data. No backend. No database.

## Play

GitHub Pages link: TBD

## Development

Open `index.html` in a browser.

## Deploy

Deploy with GitHub Pages from the `main` branch.
```

## MVP Implementation Checklist

- [ ] Create repo
- [ ] Add `plan.md`
- [ ] Add `README.md`
- [ ] Create `index.html`
- [ ] Add bilingual text helper
- [ ] Add case data array
- [ ] Render home screen
- [ ] Render case screen
- [ ] Add language toggle
- [ ] Add answer selection
- [ ] Add confidence slider
- [ ] Add result screen
- [ ] Add score calculation
- [ ] Add 5 initial cases
- [ ] Test locally by opening `index.html`
- [ ] Deploy to GitHub Pages
- [ ] Add more cursed cases later

## Stretch Goals

- [ ] Random mode
- [ ] Case library filters
- [ ] Difficulty badges
- [ ] Achievement system
- [ ] LocalStorage saved progress
- [ ] Bad ending gallery
- [ ] Share result button
- [ ] More bilingual polish
- [ ] Mobile-friendly layout
- [ ] Optional JSON import/export for cases

## Future Case Ideas

```text
The Manager Changed Three Times
The Alias Still Exists
The Calendar Is Empty
The Former VP Ghost Account
The Reorg That Wasn't
The Sync Pipeline Strikes Back
The Badge Flashing Incident
The World Cup Incident
The Person Who Went To A Startup
Schrödinger Employee
```

## Design Principle

The joke should not be “someone got laid off.”

The joke should be:

> Humans are extremely good at inventing stories from ambiguous telemetry.

And engineers are even worse because they add confidence percentages.
