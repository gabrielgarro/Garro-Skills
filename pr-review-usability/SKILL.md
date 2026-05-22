---
name: pr-review-usability
description: >-
  PR UX/a11y/mobile review; JSON for pr-review-orchestrator. Orchestrator or
  explicit UX review only.
disable-model-invocation: true
---

# PR Review — Usability

**Orchestrated:** JSON per `review-contract.md`. IDs `UX-001`… Read `GYMAPP.md` if present. **Do not** read `comment-template.md`.

Garra: title **PT**, body **EN**; severities `major`|`minor`|`nit` only (no blocker). Scope: diff + regression on shared chrome.

## When to read checklist

[checklist-ux-a11y.md](checklist-ux-a11y.md) **only if** diff touches `src/pages/`, `src/components/`, `src/app/router.tsx`, or layout shells.

## Regression map

| Area | Also check |
|------|------------|
| Run/timer | Nav hidden; exit; rest overlay |
| Library | FAB; filters |
| Builder | Add sheet; save |
| History/dashboard | Empty states |
| Profile | Theme; form errors |
| Layout | Nav, safe-area, scroll |

## In diff

Mobile 375–430px, tap ~44px, a11y names/labels/focus, loading/empty/error, PT copy, form errors visible, confirm on destructive.

## Process

1. Changed UI files from diff.
2. Map → regression table; router if new routes.
3. Findings: `path`, `line` RIGHT, title PT, body EN.
4. Cap ~15; no invented issues.

## Output

```json
{ "dimension": "usability", "findings": [], "summary": { "major": 0, "minor": 0, "nit": 0 } }
```
