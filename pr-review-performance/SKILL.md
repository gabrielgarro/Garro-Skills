---
name: pr-review-performance
description: >-
  PR performance review (Supabase, gym-api, hot React paths); JSON for
  pr-review-orchestrator. Orchestrator or explicit perf review only.
disable-model-invocation: true
---

# PR Review — Performance

**Orchestrated:** JSON per `review-contract.md`. IDs `PERF-001`… Read `GYMAPP.md` if present. **Do not** read `comment-template.md`.

Garra: title PT, body EN; strict data-layer focus.

## When to read checklist

[checklist-performance.md](checklist-performance.md) **only if** diff touches `src/hooks/`, `supabase/`, `gym-api`, or list/run hot paths.

## Primary

- Supabase: no `select('*')` on large tables; `.limit`/pagination; no N+1 in loops; index-friendly filters; unsubscribe realtime
- Edge `gym-api`: no sequential per-item DB; paginate lists; batch/JOIN; auth once per handler

## Secondary (strict)

Run Zustand/timer re-renders; library/history rows without memo on big lists.

## Process

1. Scan hooks, gym-api, migrations, lockfile.
2. Trace page → hook → API; count queries per action.
3. Cap ~12 findings.

## Output

```json
{ "dimension": "performance", "findings": [], "summary": { "critical": 0, "high": 0, "medium": 0, "low": 0 } }
```
