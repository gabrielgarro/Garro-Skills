---
name: new-feature-sdd
description: >-
  SDD: benchmark, interview PT, draft EN, SPEC merge, implement feat/*, PR, Playwright
  E2E. Use for new feature, SDD, "vamos começar uma nova feature", SPEC before code.
---

# New Feature SDD

**benchmark → interview (PT) → draft (EN) → approval → SPEC → implement → PR → E2E**

Read `GYMAPP.md` when present (Garra release gates).

**Chat:** PT summary ≤8 bullets; never paste full draft in chat ([chat-output.md](../skill-authoring/chat-output.md)).

## Hard rules

1. No `Docs/SPEC.md` edits before draft approval.
2. Interview **PT**; draft body **EN**.
3. Benchmark `Docs/research/` first (or user paste).
4. Post-approval: `branch-first` → `feat/*` → Vitest → PR (`encerrar` for full release per GYMAPP).

## Phase 0

This file + `GYMAPP.md`; `Docs/SPEC.md` status/index/§1–4; list `Docs/research/*.md` (skip README) or ask paste.

## Phase 1 — Benchmark (PT bullets)

Parity, UX adopt/avoid, gaps, risks (offline, plans). Source: research file or paste.

## Phase 2 — Interview

[discovery-questions.md](discovery-questions.md); 1–2 questions/round. Stop with: name, slug, story prefix, 3–8 stories + AC, schema/routes sketch, out-of-scope.

## Phase 3 — Draft (EN)

`Docs/features/FEATURE-NN-<slug>-draft.md` via [spec-template.md](spec-template.md). No SPEC edit. PT summary + ask approval.

## Phase 4 — SPEC merge (after approval)

Status row, index, section N.1–N.4, §3 migration, §2 routes, rename to `*-approved.md`. Checklist: [spec-template.md](spec-template.md) § Merge checklist.

## Phase 5 — Implement

`feat/<slug>`; checklist from approved doc; Vitest; PR with `## Test plan` story IDs. GYMAPP: commit/push/PR only when user asks `encerrar`.

```markdown
## Test plan
- [ ] XX-01: Given … When … Then …
```

## Phase 6 — E2E (PR open)

Skill `playwright-e2e-from-plan`: `SKILL.md` + `GYMAPP.md` index + relevant `guards-*.md`. Same branch; `test(e2e): …`; push updates PR.

## Resources

| File | When |
|------|------|
| [discovery-questions.md](discovery-questions.md) | Phase 2 |
| [spec-template.md](spec-template.md) | Phase 3–4 |
| [examples.md](examples.md) | Ambiguous flow only |
