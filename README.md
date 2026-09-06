# ScoreRing

Judge scoring for FCI Mondioring, Levels I, II and III. Built for a phone at
the ringside: it works offline, installs to the home screen, and reads in
Hebrew, English or French.

## What it does

- **Judge a trial** — enter the competitors, set the running order the judge
  drew, then score each dog by tapping the penalties. Every tap is undoable and
  the running total is always on screen.
- **Score check** — the same exercises without a trial, for a competitor who
  wants to know what a mistake costs. Search by the mistake, not the exercise.
- **Score drill** — ten questions a round to learn the point values by heart,
  with or without a clock; what you miss comes back sooner.

Scoring follows the club scoresheet: 200 / 300 / 400 points, the jumps the
handler chooses at each level, and the height table for the palisade, the long
jump and the hurdle.

A trial in progress is saved to the device after every change, so a reload or a
locked phone cannot lose it. Finished sheets and the results table print to
paper or to PDF.

## Running it

```sh
npm install
npm run dev      # local development
npm test         # scoring rules and drill checks
npm run build    # production build into dist/
```

## Deploying

The build is a static site — any static host serves it.

- **Netlify**: connect the repository (`netlify.toml` is already here), or drag
  the contents of `dist/` onto a site's Deploys tab.
- **GitHub Pages**: the workflow in `.github/workflows/deploy.yml` builds on a
  push to `main` and sets the base path from the repository name. Enable Pages
  with "GitHub Actions" as the source.
- **Anywhere else**: upload `dist/`. Set `VITE_BASE_PATH` at build time if the
  app is served from a subdirectory.

## Layout

```
src/data/exercises.ts   exercises, penalties, jump heights, level maxima
src/data/quiz.ts        the drill's question pool and spaced repetition
src/data/session.ts     saving and resuming a trial
src/hooks/useScoring.ts the scoring engine every screen shares
src/i18n/               Hebrew, English and French
```
