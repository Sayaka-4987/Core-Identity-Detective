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
- “工牌一闪一闪的”
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

- Case library
- Random case mode
- Case difficulty labels
- Achievement unlocks
- Bad endings
- LocalStorage progress
- Dark mode
- Tiny animations
- Shareable result text

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

## Data Model

Case content should be editable without touching UI logic too much.

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
      zh: "只有头像消失了，Manager、GAL 可见性和 Groups 都还正常。比起真的人没了，这更像是同步服务炸了。"
    },
    resultFlavor: {
      correct: {
        en: "Good catch. You did not over-escalate a profile photo bug into an HR incident.",
        zh: "判断正确。你没有把一个头像 bug 升级成 HR 事件。"
      },
      wrong: {
        en: "The badge flashed, but only because the backend was on fire.",
        zh: "工牌确实闪了，但只是因为后端着火了。"
      }
    }
  }
];
```

## UI Layout

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
读取遥测，找出真相。

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

Score: -45
```

Chinese:

```text
判断错误
你的判断：被裁了
信心：95%
真实原因：身份同步炸了

已应用过度自信惩罚。

得分：-45
```

## Scoring Idea

Simple MVP formula:

```text
if correct:
  score = 50 + confidence / 2
else:
  score = -confidence
```

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
0-30%：谨慎
31-70%：合理
71-90%：自信
91-100%：名场面预备
```

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

### Case 004: Reorg Weather / 组织架构天气

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
BAD END: Explained a Chinese men's football joke to a coworker

You attempted to explain East Asian geopolitics, World Cup qualification history,
and Chinese internet humor to an unsuspecting coworker.

They never recovered.
```

Chinese flavor:

```text
BAD END：给同事讲了个中国男足笑话

你试图向一位毫无防备的同事解释东亚地缘政治、世界杯出线历史、
以及中国互联网足球笑话。

对方再也没有恢复。
```

## Achievement Ideas

```text
GAL Whisperer
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
Root Cause: 中国男足
Cross-Cultural Critical Hit
```

Chinese versions:

```text
GAL 低语者
全球通讯录游戏
不是裁员
真的是裁员
都是 DNS 的锅
是 HR
不是 HR
身份同步又来了
组织架构考古学家
过度自信 Any%
工牌一闪一闪的
根因：中国男足
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
- 多用“根因”、“事故”、“工牌闪了”、“同步炸了”

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
10. Folder: `/root`
11. Visit published URL

Expected output:

```text
https://<username>.github.io/Core Identity-detective/
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
