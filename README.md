# Core Identity Detective

> Follow the telemetry. Find the truth.
> 读取档案，找出真相。

A tiny bilingual (EN / 中文) static web game about fictional enterprise identity
telemetry and overconfident incident analysis. Read incomplete signals about a
mysterious coworker, guess what happened, set a confidence level, and learn
that the obvious answer is usually wrong. Everything is fictional: no real
data, no backend, no build step.

## Play

- Live: <https://sayaka-4987.github.io/Core-Identity-Detective/>
- Local: git clone, open `index.html` in any modern browser. That's the whole game.

## How to play

1. Press **Start Investigation**.
2. Read the **Identity Telemetry** card (color-coded: green normal, yellow
   warning, red alarming, gray unknown).
3. Pick what you think happened.
4. Drag the **Confidence** slider (0–100). Scoring punishes overconfidence.
5. Submit, read the actual cause, then continue to the next case.
6. After all cases, see your total and optionally **Share Result**.

## Scoring

```text
if correct:  score = round(50 + confidence / 2)
else:        score = -confidence
```

Overconfidence is punished. Some cases (`answer: "none"`) are unanswerable on
purpose: the honest verdict is "nobody knows".

## Features

- 60 cases in the bank, including a joke / bad-end case or two
- One run = one Fiscal Year = up to 20 cases, drawn at random
- Runs never repeat a case until you have seen the whole bank in this browser;
  once it is cleared, the game says so and points you at contributing more
- Bilingual UI with a remembered language toggle
- Confidence slider, end-of-run Fiscal Year review, cumulative achievements
- Single-file game logic + separate `cases.js` content, zero dependencies

## Adding cases

Cases live in `cases.js`. Every player-visible string is an `{ en, zh }` pair.
`telemetry[].status` is one of `normal | warning | alarming | unknown`.
`answer` must equal a `choices[].id`, or the sentinel `"none"`. The optional
`tags` array drives theme achievements. LocalStorage keys use the `cid-` prefix
(`cid-seen` tracks which cases this browser has already played). Deploy via
GitHub Pages from `main`, folder `/ (root)`.

## Notes

This project was built with vibe coding, and its text (English and 中文) was
polished and translated with the help of AI. Everything is fictional and meant
for fun.

本项目由 vibe coding 完成，文案（中英文）经过 AI 润色与翻译。所有内容均为虚构，仅供娱乐。

## License

GNU/GPL v3.0, see `LICENSE`.
