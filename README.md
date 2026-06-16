# Core Identity Detective

> Follow the telemetry. Find the truth.
> 读取遥测，找出真相。

A tiny bilingual (English / 中文) static web detective game about fake
enterprise identity telemetry, org chart archaeology, and overconfident
incident analysis. You read incomplete identity signals about a mysterious
coworker, guess what happened, set a confidence level, and learn that the
obvious answer is often wrong.

Everything is fictional. No real employee data. No real org names. No
backend, no database, no login, no build step.

## Play

- Live (GitHub Pages): https://sayaka-4987.github.io/Core-Identity-Detective/
- Locally: open `index.html` in any modern browser. That's the whole game.

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

Wrong with 95% confidence is a comedy `-95`. Some cases (the ghost account)
have no correct answer on purpose: the honest verdict is "nobody knows".

## Features

- Three screens: Home, Case, Result, plus an end-of-run summary
- Bilingual UI with a language toggle (remembered across reloads)
- 5 cases in fixed order, including one joke case
- Confidence slider with band labels
- Share-result text copied to clipboard
- Single file, zero dependencies

## Editing cases

Cases live in the `cases` array inside `index.html`. Every player-visible
string is an `{ en, zh }` pair. `telemetry[].status` is one of
`normal | warning | alarming | unknown`. `answer` must equal a `choices[].id`,
or the sentinel `"none"` to mark a case as unanswerable (always scored wrong).

See `plan.md` for the full design, data model, and roadmap.

## Development

No tooling required. Edit `index.html` and refresh the browser.

LocalStorage keys are namespaced with the `cid-` prefix. The MVP only uses
`cid-lang` (UI language); `cid-total` and `cid-progress` are reserved for
future progress-saving features.

## Deploy

Deploy with GitHub Pages from the `main` branch, folder `/ (root)`.

## License

See `LICENSE`.
