---
name: feedback-handler
description: >-
  Triages feedback into GitHub issues (bug/melhoria + P1-P3), three approaches PT,
  hands off to new-feature-sdd. Never implements code. Triggers: triar feedback,
  processar feedbacks, pasted admin/user feedback.
---

# Feedback Handler

Product feedback in chat → classify → issues → user picks priorities → SDD handoff. No code, no SPEC/draft edits.

Read `GYMAPP.md` when present (Garra: issues, backlog sync, duplicate `[Fxx]`).

## Hard rules

1. Interview **PT**; approaches **PT**.
2. **`new-feature-sdd`** owns SPEC/draft/implementation — never direct implementation.
3. **1–2 questions/round**; one issue per **problem** (`P01`, `P02`…).
4. Handoff only after issues exist + user selected P1/P2/P3 via `AskQuestion`.
5. Labels: `bug`|`melhoria` + `P1`|`P2`|`P3` (not `P0`, not `priority:P1`, not English `improvement`).
6. `gh` fail → stop until URLs confirmed.

## Model

**Feedback F1…** → optional **cluster** → **problem P01…** → **1 GitHub issue**. Split independent symptoms. List *descobertas na triagem* (`melhoria` default).

## Phase 0

This file + `GYMAPP.md`; `Docs/SPEC.md` status/index only (duplicates).

## Phase 1 — Intake

Fields: `id`, `raw`, `type_hint`, `source`. N>5 → cluster + one priority question first.

## Phase 2 — Classify + decompose

Classes: `bug`, `improvement`, `new_feature`, `ux_copy`, `tech_debt`, `duplicate` (no issue), `needs_info`.

Table **Problema ID | Origem | Tipo | Resumo** mandatory before Phase 3.

## Phase 3 — Interview

[discovery-questions.md](discovery-questions.md); stop when repro, persona, severity, MVP scope, evidence, deps known (~2–8 rounds).

## Phase 4 — Approaches

[triage-output-template.md](triage-output-template.md) per problem: A/B/C + **Recomendação** + **Rota** (`→ new-feature-sdd` | `→ aguardar` | `→ wont_fix`).

**P1** blocks main flow / many users; **P2** high + workaround; **P3** polish.

## Phase 5 — Issues

- Existing `[Fxx]`: **GYMAPP.md § Issue já registrada** + `feedback-handler-duplicates.mdc` — comment, bump priority, no duplicate.
- New: `scripts/feedback-issue-body.template.md` → `gh issue create --title "[P01] …" --label "bug,P1,feedback-triage"`.
- Garra: `node scripts/sync-feedback-backlog.mjs` (never hand-edit backlog).

## Phase 6 — Selection

Ask which P1/P2/P3 to attack now; others stay open without handoff.

## Phase 7 — Handoff

Per selected problem — template in [triage-output-template.md](triage-output-template.md). Prompt: *"vamos começar uma nova feature: &lt;slug&gt;"*.

## Resources

| File | When |
|------|------|
| [discovery-questions.md](discovery-questions.md) | Phase 3 |
| [triage-output-template.md](triage-output-template.md) | Phase 4–7 |
| [examples.md](examples.md) | User asks for example only |
| `GYMAPP.md` | Phase 5+ Garra |

## Finish checklist

Intake → decompose → approaches → P* → issues table → AskQuestion → handoff selected only → prompt SDD.
