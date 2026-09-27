# Phase 1 — Product recon (Amazon.com)

**Goal:** Use the real product end-to-end, capture evidence, define what we will rebuild — **no application code** in this phase.

## How to run the walkthrough

1. Use a **desktop browser** (Chrome/Safari). Optional: separate profile or incognito for a clean account journey.
2. Pick a **marketplace** and stick to it for the whole recon (e.g. `amazon.com` or `amazon.in`). Note it in `flow-map.md`.
3. For each step in [`CHECKLIST.md`](./CHECKLIST.md):
   - Do the action on the live site.
   - Save a screenshot to `docs/screenshots/` using the filename in the checklist.
   - Add 2–4 bullets under that flow in [`flow-map.md`](../flow-map.md) (behavior, data shown, edge cases).
4. Do **not** place real orders unless you accept a charge; use **$0.00 test flows** only if available, or stop at the final “Place order” screen and screenshot there.
5. Commit screenshots + doc updates in small chunks (e.g. “recon: discovery flows” then “recon: checkout”).

## Screenshot rules

- Format: `PNG` or `JPEG`, full viewport or key modal (crop if sensitive).
- Naming: `{flow-id}_{short-description}.png` (e.g. `F04_pdp_buy-box.png`).
- Redact: full card numbers, government IDs, home address if you prefer (blur in Preview or crop).

## When Phase 1 is done

- [ ] Every **Required** flow in `CHECKLIST.md` has a screenshot path that exists on disk.
- [ ] `flow-map.md` has notes for each required flow.
- [ ] `scope.md` and `data-model.md` reviewed after recon (adjust if the walkthrough surprises you).

Then Phase 2: scaffold app + seed data (separate step).
