# Examples — Garra

> **Read only** if mapping is ambiguous or story prefix is new. Default: `test-plan-mapping.md` + `GYMAPP.md` + `guards-*.md`.

## Full user journey (recommended)

```bash
cp .env.e2e.example .env.e2e.local
# Fill E2E_TEST_EMAIL / E2E_TEST_PASSWORD
npm run test:e2e:journey
```

File: `e2e/journey/user-journey.serial.spec.ts` — runs **serial** (library → treino → share → run → histórico → home → perfil → feedback).

## Standalone per feature

User:

> gera e2e para a feature 4 com base no approved doc

Agent:

1. Read approved doc / PR Test plan
2. Prefer extending `user-journey.serial.spec.ts` RN-* steps if already covered
3. Otherwise add `e2e/features/feature-NN-<slug>.spec.ts`
4. `npm run test:e2e`

## After SDD PR (Phase 6)

Handoff from `new-feature-sdd`:

```
Feature: 04
Slug: run-execution-station
Branch: feat/run-execution-station
PR: https://github.com/org/gym-app/pull/42
```

Update journey RN-* steps or add feature spec → `npm run test:e2e` → commit `test(e2e): …`.

## Journey excerpt

```typescript
test.describe.configure({ mode: 'serial' });

test('LIB-01: create custom exercise in library', async ({ page }) => {
  resetJourneyState();
  const library = new LibraryPage(page);
  await library.goto();
  await library.createExercise(getJourneyState().exerciseName);
});

test('WK-03: create workout with exercise and save', async ({ page }) => {
  const builder = new WorkoutBuilderPage(page);
  const id = await builder.createWorkoutWithExercise(
    getJourneyState().workoutName,
    getJourneyState().exerciseName,
  );
  setWorkoutId(id);
});
```

## Feature 04 — run timer smoke (RN-12)

Reference: `e2e/features/feature-04-run-timer-sound-fix.spec.ts`, `e2e/pages/run.page.ts`.

```typescript
import { test, expect } from '../fixtures/test';
import { RunPage } from '../pages/run.page';
import { WorkoutsPage } from '../pages/workouts.page';
import { WorkoutBuilderPage } from '../pages/workout-builder.page';
import { LibraryPage } from '../pages/library.page';
import { skipIfNoAuth } from '../fixtures/skip-auth';

test.describe('FEATURE-04 / RN-12 timer smoke', { tag: ['@feature-04'] }, () => {
  test.beforeEach(() => skipIfNoAuth());

  test('RN-12: CTA enables and timer shows after set', { tag: ['@smoke'] }, async ({ page }) => {
    test.setTimeout(60_000);
    const exerciseName = `e2e-rn12-${Date.now()}`;
    const workoutName = `e2e-rn12-w-${Date.now()}`;

    const library = new LibraryPage(page);
    await library.goto();
    await library.createExercise(exerciseName);

    const builder = new WorkoutBuilderPage(page);
    await builder.createWorkoutWithExercise(workoutName, exerciseName);

    const workouts = new WorkoutsPage(page);
    const run = new RunPage(page);
    await workouts.gotoList();
    await workouts.startWorkoutFromList(workoutName);
    await run.expectRunScreen();
    await run.expectPrimaryCtaVisible();
    await run.completeOneSet();

    await expect(page.locator('section[aria-live="polite"]')).toBeVisible();
    await expect(page.getByText(/Descanso/i).first()).toBeVisible();
  });
});
```

**Wrong patterns (CI failures):**

- `import { test } from '@playwright/test'`
- `beforeEach(async ({ page }) => { await page.evaluate(() => sessionStorage.removeItem('gymapp-active-session')); })` **before** any `goto`
- `getByRole('button', { name: /Concluir série/i }).first().click()` while button is `disabled`
- `expect(page.getByText(/↑\d+/).first()).toBeVisible()` without scoping to the workout card

## Feature 06 — history load trend (`@feature-06`, HS-*)

Reference: `e2e/features/feature-06-history-load-trend.spec.ts`, `e2e/pages/history.page.ts`.

Requires **deployed** `gym-api` with `history-load-trend` enrichment (CI: **Deploy gym-api for E2E** before Playwright).

```typescript
// Session 1 — baseline 40 kg (not implicit from builder default)
await run.expectRunScreen();
await run.setWeightKg(40);
await run.completeOneSet();
await run.finishEarlyAndSave();

// Session 2 — 50 kg → trend up on card + detail
await run.completeSessionWithWeight(50);

await history.goto({ forceFresh: true }); // one goto after finish — no reload()
await history.expectSessionCardTrendSummary(workoutName); // scoped to sessionButton(workoutName).first()
await history.openSessionForWorkout(workoutName);
await history.expectExerciseLoadTrendUp(exerciseName);
```

**Wrong:** one session only; global `↑` locator; `reload()` after `/history` then **hard** `waitForResponse(history.list)` (memory cache skips network → 30s timeout in CI); `postData()` string match only (prefer `postDataJSON().action`).

## Expected results

| Suite | With `.env.e2e.local` | Without credentials |
|-------|----------------------|---------------------|
| `auth.public.spec.ts` | 2 passed | 2 passed |
| `user-journey.serial.spec.ts` | ~16 passed | skipped |
| `auth.setup.ts` | 1 passed | 1 skipped |
