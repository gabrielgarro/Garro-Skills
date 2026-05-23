---
name: feature-discovery
description: >-
  Product discovery for epics from feedback-handler: benchmark, interview PT,
  scope/MVP, draft FEATURE-NN, then handoff to new-feature-sdd. Triggers: discovery,
  vamos fazer discovery, epic Fxx, refinar épico.
---

# Feature Discovery

**Epics** from feedback triage (`type:epic`, `route:discovery`) → structured discovery → SDD. No app code until SDD Phase 5.

Read `GYMAPP.md` in the target app repo when present (e.g. gym-app `.cursor/skills/feature-discovery/GYMAPP.md`).

## Hard rules

1. **PT** interview; **EN** draft in `Docs/features/FEATURE-NN-<slug>-draft.md`.
2. Do **not** edit `Docs/SPEC.md` until user approves draft (same as `new-feature-sdd`).
3. Link parent issue `[Fxx]` in draft and comments.
4. Bugs/small fixes stay in feedback issues — **not** this skill.

## When to use

| Signal | Route |
|--------|--------|
| `type:epic` or title `Epic:` | This skill |
| Scope > ~1 sprint, pivot, new domain | This skill |
| Single-screen bug, copy, filter | Implement via `branch-first` (no discovery) |

## Phase 0

- Issue `[Fxx]` + labels; optional `Docs/research/`.
- `Docs/SPEC.md` index only (avoid full read).

## Phase 1 — Frame

- Problem, personas, success metrics, non-goals.
- Competitor notes (Hevy, Strong, Fitbod, etc.) if user cited them.

## Phase 2 — Interview (PT)

1–2 questions/round until MVP boundary, data model sketch, Free/Premium, and open questions are clear.

## Phase 3 — Options

Compact A/B/C (chat); pick one with user (`AskQuestion` if needed).

## Phase 4 — Draft (EN)

`Docs/features/FEATURE-NN-<slug>-draft.md`: goals, user stories, UX notes, data/API, risks, out of scope.

## Phase 5 — Approval

User confirms in chat → then merge SPEC via **`new-feature-sdd`** (do not skip SPEC merge rules).

## Phase 6 — Handoff to SDD

```markdown
## Handoff — <slug>
Epic #N (Fxx) | Discovery done | Draft: Docs/features/FEATURE-NN-<slug>-draft.md
Prompt: "vamos começar uma nova feature: <slug>"
```

## Resources

| Skill | When |
|-------|------|
| `feedback-handler` | Source epic issue |
| `new-feature-sdd` | After draft approval — implementation + PR + E2E |
