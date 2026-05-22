---
name: skill-authoring
description: >-
  Token budget and structure when creating or editing Agent Skills. Use when
  authoring a new skill, shrinking SKILL.md, or splitting GYMAPP/refs.
---

# Skill authoring (token budget)

Apply **before** writing or refactoring any skill under `~/.cursor/skills/` or `.cursor/skills/<name>/`.

## Budgets

| Asset | Limit |
|-------|--------|
| `SKILL.md` body | ≤ 250 lines |
| YAML `description` | ≤ 300 chars |
| `examples.md` | Read **only** if user asks or scenario is ambiguous |
| `GYMAPP.md` (repo) | Index only (paths, commands, when-to-read refs); guards in `guards-*.md` |

## What goes where

| In SKILL.md | In refs (`*.md`, `GYMAPP`, `guards-*`) |
|-------------|----------------------------------------|
| Triggers, hard rules, phase list | Question banks, templates, long checklists |
| One-line pointers to refs | CI pitfalls, code samples, domain tables |
| Output format (handoff JSON, issue labels) | Examples, OWASP/ASVS detail |

**One rule, one place.** Never duplicate the same guard in SKILL and GYMAPP.

## Progressive disclosure

```markdown
## Phase 0
1. Read this file.
2. If gym-app: read `.cursor/skills/<skill>/GYMAPP.md` (index).
3. Read `guards-<domain>.md` only for domains touched (see GYMAPP index).
```

## SKILL.md skeleton

```markdown
---
name: my-skill
description: One line — what + when (triggers).
---

# Title

Read `GYMAPP.md` when present.

## Triggers
- …

## Hard rules
1. …

## Phase 0 — Bootstrap
## Phase 1 — …

## Additional resources
| File | When |
|------|------|
| [ref.md](ref.md) | Phase N only |
```

## Chat output

Default: [chat-output.md](chat-output.md). Skills that produce long PT prose must point to a **compact** ref (e.g. `triage-output-compact.md`).

## Checklist before saving

- [ ] No duplicate bullets (same rule twice)
- [ ] Tables replaced by 1-line bullets where possible
- [ ] Code blocks ≤ 1 per ref file; else point to repo code
- [ ] `examples.md` has gate line at top
- [ ] Hot path (SKILL + index + one ref) ≤ 70% of old full read

## Garra overrides

Project delta only in `c:/repos/gym-app/.cursor/skills/<skill>/GYMAPP.md` + `guards-*.md`. Global skill stays repo-agnostic.

## Repo central Garro-Skills

Global skills sync to GitHub **Garro-Skills** (`~/.cursor/skills/` mirror). After editing any global skill, **ask the user** if the same change should be committed to Garro-Skills (see gym-app rule `garro-skills-sync.mdc`).
