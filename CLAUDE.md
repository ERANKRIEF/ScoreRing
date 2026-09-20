# ScoreRing — working notes for Claude Code sessions

Mondioring – ScoreRing app: an FCI Mondioring judge-scoring PWA. Hebrew-first
(RTL), English and French too. Owner: ERANKRIEF. This repo is the only home of
the app; it has no relation to any other organisation.

## Deploy
- `main` is deployed automatically by Netlify to https://scorering.netlify.app
  (password protected, Netlify Pro). Pushing to `main` **is** the release.
- Every user-visible change: bump `version` in `package.json` and
  `package-lock.json` (lines 3 and 9). The version shows on the home screen
  and drives the self-update check (`src/pwa.ts` + `version.json`).
- Before pushing: `npm test` (vitest) and `npm run build` (tsc + vite) must pass.
- Never commit `dist/`, and do not add GitHub Pages workflows.

## Where things live
- Scoring rules: `src/data/exercises.ts` (exercises, penalties, jump options,
  `LEVEL_MAX` 200/300/400, `JUMP_RULE`), engine `src/hooks/useScoring.ts`.
- Screens: `src/components/*` (Setup = home, TrialDetails, Participants,
  ExerciseOrder, Judge, ScoreSheet, Results, Practice, Quiz).
- Printed A4 scoresheet + PDF: `src/report/*` (`sheetRows.ts` mirrors the
  club's official form; awarded + penalty must equal the level total).
- Persistence: `src/data/session.ts` (autosave `scorering.trial.v1`,
  archive `scorering.archive.v1`), quiz progress in `src/data/quiz.ts`.
- Translations: `src/i18n/translations.ts` — add every new key to en, fr, he.

## Conventions the owner asked for
- Wording: "נוהג" for handler. Judge's name: "ערן קריאף".
- Jump choice is per competitor, made at the ring (L1: hurdle or palisade;
  L2: hurdle compulsory + palisade or long jump; L3: all three).
- Search & escort is always the last exercise.
- Confirm before anything destructive (discard trial, zero an exercise).
- Reply to the owner in Hebrew; keep instructions short and one step at a time.

## Open items
- Qualification bands for Levels 1–2 (owner will supply thresholds) in
  `src/data/qualify.ts`.
- Archive screen for closed trials; dog database for auto-completing
  handler/dog details.
