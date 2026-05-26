---
name: playwright-e2e-from-plan
description: >-
  Generate or update Playwright E2E tests from a PR Test plan, FEATURE-NN approved
  doc acceptance criteria, or pasted scenarios. Use after new-feature-sdd opens a PR,
  or standalone ("gerar e2e", "playwright para feature 4", "e2e do PR #12").
---

# Playwright E2E from Plan

Test plan / acceptance criteria → specs in `e2e/`. Complements Vitest.

**Garra:** read `.cursor/skills/playwright-e2e-from-plan/GYMAPP.md` (index), then **only** `guards-*.md` for domains you edit (mandatory before Phase 3).

## Triggers

- **"gerar e2e"**, **"playwright para feature N"**, **"e2e do PR"**, **"testes e2e"**
- **new-feature-sdd Phase 6** (PR URL + feature number)
- Pasted Test plan or acceptance checklist

## Hard rules

1. No product logic changes except minimal `data-testid` when roles/labels unstable.
2. Never commit `.env.e2e.local`, passwords, `e2e/.auth/`.
3. Auth: email/password via `e2e/auth.setup.ts` — not Google OAuth UI.
4. Same branch as feature PR; commit `test(e2e): tag @feature-NN <slug>` then push.
5. `npm run test:e2e:affected` before close; report tags + pass/skip/fail.
6. Login fail → stop (Email provider, test user, env vars).
7. Tags: `@feature-NN` on describe/tests; journey adds `@journey` + all touched feature tags.
8. Update `e2e/impact-map.json` (`srcGlobs`, `e2eGlobs`, `sharedPageObjects` if shared PO).
9. `npm run test:e2e:plan` for grep preview.
10. **Garra:** extend `e2e/pages/*`; `import { test, expect } from '../fixtures/test'` in `e2e/features/*`; no `expect(a.or(b)).toBeVisible()` when both visible; settings switches → `dismissVercelPreviewOverlays` + `evaluate(click)`.

## Phase 0 — Bootstrap

1. This file + `GYMAPP.md` index.
2. Load `guards-*.md` per index for planned domains.
3. Ensure `playwright.config.ts`, `e2e/auth.setup.ts`, `impact-map.json`, `.env.e2e.example`, scripts `test:e2e*`.
4. First machine: `npx playwright install chromium`.

## Phase 1 — Resolve inputs

| # | Source | How |
|---|--------|-----|
| 1 | PR | `gh pr view --json body,url` → `## Test plan` |
| 2 | Approved | `Docs/features/FEATURE-NN-*-approved.md` |
| 3 | SPEC | Section N.2 if no approved doc |
| 4 | Delta | `git diff main...HEAD -- src/app/router.tsx src/pages/` |
| 5 | Paste | User message |

Extract: `NN`, slug, story prefix, routes, paths.

## Phase 2 — Map scenarios

[test-plan-mapping.md](test-plan-mapping.md): bullet → `test('ID: …')` in `e2e/features/feature-NN-<slug>.spec.ts`; PO when 3+ repeats; sync `impact-map.json`.

## Phase 3 — Implement and run

1. Re-read relevant `guards-*.md`.
2. Specs + PO + tags; update shared PO + `sharedPageObjects` if copy/layout shared; `rg` removed strings in `e2e/`.
3. `skipIfNoAuth()` in auth suites.
4. `supabase/functions/gym-api` changes → CI deploy before E2E; **do not** change Supabase JS import style unless intentional; verify team Vercel preview origins match CORS patterns (see guards-history-api).
5. `npm run test:e2e:plan` → check `collateralTags`; then `test:e2e:affected`.
6. Flakes: `toBeEnabled` / `expect.poll` — disabled run CTA → `sets: 0` or stale session, not longer timeout alone. Nav flake → `waitForAuthenticatedShell`, never bare `.waitFor()` on bottom nav. **Rest phase:** footer label **Iniciar próxima série** — `waitForRunReady` must use `primaryFooterCta()`; multi-set loops need `advancePastRest()` + short rest in seed (`sets: 1`, `restSeconds: 15`), not default 60s×N.
7. **Negative assertions:** on async pages (detail, run footer), never rely on `toHaveCount(0)` alone while skeleton/loading — wait for stable content (`waitForWorkoutDetailReady`, section copy, footer CTA) then assert the expected state (F57 / PR #156; see `guards-core.md` **Workout detail**).

## Phase 4 — Deliver

`git add` `e2e/`, … → commit → push. Close: paths, tags, pass/fail — no guardrail essay ([chat-output.md](../skill-authoring/chat-output.md)).

## Additional resources

| File | When |
|------|------|
| [test-plan-mapping.md](test-plan-mapping.md) | Phase 2 |
| [examples.md](examples.md) | Ambiguous mapping only |
| `GYMAPP.md` + `guards-*.md` | Garra — always index; guards by domain |

## PR Test plan (SDD)

```markdown
## Test plan
- [ ] RN-01: Given … When … Then …
```
