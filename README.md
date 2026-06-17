# Core Identity Detective

> Follow the telemetry. Find the truth.
> 读取档案，找出真相。

A tiny bilingual (EN / 中文) static web game about fictional enterprise identity
telemetry and overconfident incident analysis. Read incomplete signals about a
mysterious coworker, guess what happened, set a confidence level, and learn
that the obvious answer is usually wrong. Everything is fictional: no real
data, no backend, no build step.

## Play

- Live: https://sayaka-4987.github.io/Core-Identity-Detective/
- Local: open `index.html` in any modern browser.

## Scoring

```text
if correct:  score = round(50 + confidence / 2)
else:        score = -confidence
```

Overconfidence is punished. Some cases (`answer: "none"`) are unanswerable on
purpose: the honest verdict is "nobody knows".

## Features

- One full Fiscal Year = 20 cases, including a joke / bad-end case or two
- Bilingual UI with a remembered language toggle
- Confidence slider, end-of-run review, cumulative achievements
- Single-file game logic + separate `cases.js` content, zero dependencies

## Editing cases

Cases live in `cases.js`. Every player-visible string is an `{ en, zh }` pair.
`telemetry[].status` is one of `normal | warning | alarming | unknown`.
`answer` must equal a `choices[].id`, or the sentinel `"none"`. LocalStorage
keys use the `cid-` prefix. Deploy via GitHub Pages from `main`, folder
`/ (root)`. See `plan.md` for the full design and roadmap.

## License

See `LICENSE`.