---
name: feedback-handler
description: >-
  Triages feedback into GitHub issues (bug/melhoria/epic + P1-P3). Epics route to
  feature-discovery; fixes to SDD/impl. Never implements code. Triggers: triar feedback,
  processar feedbacks, pasted admin/user feedback.
---

# Feedback Handler

Product feedback in chat → classify → issues → user picks priorities → handoff (discovery or SDD). No code, no SPEC/draft edits.

Read `GYMAPP.md` when present (Garra: issues, backlog sync, duplicate `[Fxx]`).

## Chat (default)

Terse: [chat-output.md](../skill-authoring/chat-output.md) + [triage-output-compact.md](triage-output-compact.md). Full template only on request.

## Hard rules

1. Interview **PT**; approaches **PT** (compact A/B/C in chat).
2. **`new-feature-sdd`** owns SPEC merge + implementation; **`feature-discovery`** owns epics before SDD — never direct implementation here.
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

Classes: `bug`, `improvement`, `new_feature`, `ux_copy`, `tech_debt`, `epic`, `duplicate` (no issue), `needs_info`.

**Epic** (mark for discovery): pivot de produto, >~1 sprint, novo domínio, ou melhoria grande sem repro claro. Issue: título `[Fxx] Epic: …`, labels `type:epic`, `route:discovery`, `phase:*`. **Não** misturar vários épicos numa issue.

**Bug / melhoria pequena:** issue normal (`type:bug` | `type:enhancement`), rota implementação direta após priorização.

Table **Problema ID | Origem | Tipo | Rota | Resumo** mandatory before Phase 3 (`Rota` = `fix` | `discovery` | `SDD`).

## Phase 3 — Interview

[discovery-questions.md](discovery-questions.md); stop when repro, persona, severity, MVP scope, evidence, deps known (~2–8 rounds).

## Phase 4 — Approaches

[triage-output-compact.md](triage-output-compact.md) in chat; [triage-output-template.md](triage-output-template.md) only if user wants full prose.

**P1** blocks main flow / many users; **P2** high + workaround; **P3** polish.

## Phase 5 — Issues

- Existing `[Fxx]`: **GYMAPP.md § Issue já registrada** + project duplicate rule — comment, bump priority, no duplicate.
- New: `gh issue create` with body template (project may use `scripts/create-feedback-issues.mjs`).
- Garra: `node scripts/sync-feedback-backlog.mjs` (never hand-edit backlog).

## Phase 6 — Selection

Ask which P1/P2/P3 to attack now; others stay open without handoff.

## Phase 7 — Handoff

Per selected problem — [triage-output-template.md](triage-output-template.md).

| Rota | Prompt |
|------|--------|
| `discovery` | *"vamos fazer discovery: &lt;slug&gt;"* → **`feature-discovery`** (epic `Fxx`) |
| `SDD` | *"vamos começar uma nova feature: &lt;slug&gt;"* → **`new-feature-sdd`** (melhoria média já escopada) |
| `fix` | Chat novo + `@arquivos` + `branch-first` (bug/P1 sem draft) |

## Resources

| File | When |
|------|------|
| [discovery-questions.md](discovery-questions.md) | Phase 3 |
| [triage-output-template.md](triage-output-template.md) | Phase 4–7 |
| [triage-output-compact.md](triage-output-compact.md) | Phase 4–7 chat default |
| `GYMAPP.md` (repo app) | Phase 5+ Garra |
| `feature-discovery` skill | Phase 7 `discovery` only |
