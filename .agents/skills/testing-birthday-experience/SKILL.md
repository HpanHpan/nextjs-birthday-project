---
name: testing-birthday-experience
description: Run and test the Next.js multi-scene birthday experience end-to-end. Use when verifying scene content, config.js personalization, or UI changes to any Scene* component.
---

# Testing the birthday experience

Next.js 14 (App Router) app. Single page `app/page.js` drives a linear scene state machine (`scene` 0-5) rendering one component at a time via framer-motion `AnimatePresence`.

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
```
`npm run build` also runs lint + type checks (use it to validate — `npm run lint` is not configured and prompts interactively on first run).

## Scene flow & how to advance
Most scenes auto-advance on timers; only two need manual input.
- **scene 0 — SceneQR** (video): click the **"Skip → open birthday experience"** link to advance immediately (otherwise waits for the video to end).
- **scene 1 — SceneCake**: **tap all 5 candles** to blow them out; auto-advances ~2.2s after the last one. Candles are the row of colored bars near the cake top.
- **scene 2 — SceneBook**: auto-advances (~4s per spread, 2 spreads). Shows image pairs + captions.
- **scene 3 — SceneEnvelope**: auto (transient, ~4s).
- **scene 4 — SceneLetter**: lines reveal one-by-one, then auto-advances ~3.5s after the last line.
- **scene 5 — SceneFinal**: terminal scene; confetti, photo grid, closing message. Scroll down to see the closing message.

Total walk-through is ~30-40s. Read the DOM (returned with screenshots) to read exact text — it's faster and more reliable than OCR on the styled/italic fonts.

## Personalizable content lives in `config.js` (repo root)
Exports: `LETTER_LINES` (Letter), `BOOK_SPREADS` (Book captions+images), `PHOTOS` (Final grid), `CLOSING_MESSAGE` (Final closing). Components import these via the `@/config` alias.

## Verifying config-driven content (adversarial)
To prove content is actually sourced from `config.js` (not hardcoded), edit ONLY `config.js` with distinctive **sentinel** strings (e.g. `"SENTINEL LETTER LINE"`), let the dev server hot-reload, then walk the scenes and confirm the sentinels render. If old text shows instead, the wiring is broken. **Revert `config.js` after testing** (`git checkout config.js`) so sentinels aren't committed.

## Gotchas
- `npm install` may modify `package-lock.json` (npm version diffs, e.g. `libc` fields) — revert it if unrelated to your change.
- Images are served via `next/image` (`/_next/image?url=...`); check `src` in the DOM to confirm which `PHOTOS`/`BOOK_SPREADS` entries are used.

## Devin Secrets Needed
None — fully local, no auth required.
