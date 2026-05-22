# Test plan → Playwright mapping

## Naming

`test('<STORY-ID>: <behavior>', …)` inside `test.describe('FEATURE-NN / …', { tag: ['@feature-NN'] }, () => { … })`.

## Tags and CI

`@public` | `@feature-NN` | `@journey` | `@smoke` — sync `e2e/impact-map.json` (`sharedPageObjects` when PO shared).

```bash
npm run test:e2e:plan && npm run test:e2e:affected
```

## Garra guards (by domain)

Read `GYMAPP.md` index +:

| Prefix / area | guards file | PO |
|---------------|-------------|-----|
| `RN-*` run | `guards-run.md` | `run.page.ts` |
| `WK-*` | `guards-builder-library.md` | `workouts.page.ts`, `workout-builder.page.ts` |
| `LIB-*` | `guards-builder-library.md` | `library.page.ts` |
| `HT-*`, `HS-*` | `guards-history-api.md` | `history.page.ts` |
| `PR-*` settings | `guards-core.md` | `profile.page.ts` |
| Any auth spec | `guards-core.md` | `fixtures/test.ts` |

## Inputs

- PR: `## Test plan` checkboxes → story ID prefix in test name.
- Approved doc: each `- [ ]` under story → one test (merge redundant bullets).

## Selectors

1. `getByRole` / `getByLabel` / `aria-label`
2. `getByText(/regex/)`
3. `data-testid` only if 1–2 fail

No `expect(a.or(b)).toBeVisible()` when both visible — see `guards-core.md`.

## Auth

- Authenticated: `e2e/features/*` + `skipIfNoAuth()` + `../fixtures/test`
- Public: `*.public.spec.ts`

## Skips

| Case | Action |
|------|--------|
| No local `.env.e2e.local` | skip auth tests |
| No CI secrets | fail job |
| Timer/audio | DOM only; manual in Test plan |

## Layout

`e2e/features/feature-NN-<slug>.spec.ts`, `e2e/pages/`, `impact-map.json`, `scripts/e2e-affected.mjs`.

## Coverage

3–8 tests MVP per feature (happy + one guard); prioritize P0 from Test plan; extend existing spec on re-run.
