---
name: pr-review-standards
description: >-
  PR standards review (AGENTS, ESLint, Vitest); JSON for pr-review-orchestrator.
  Orchestrator or explicit standards review only.
disable-model-invocation: true
---

# PR Review — Standards

**Orchestrated:** JSON per `review-contract.md`. IDs `STD-001`… Read `GYMAPP.md` if present. **Do not** read `comment-template.md`.

Garra: title PT, body EN; conventions only — not PR breadth.

## When to read checklist

[checklist-standards.md](checklist-standards.md) **only if** diff adds/moves files under `src/` or changes eslint config.

## Scope

- Types `src/types/index.ts`; validators `src/lib/validators.ts`; hooks `src/hooks/`; UI `src/components/ui/` + domain folders
- ESLint on **new** violations in diff only
- New pure logic → `*.test.ts` expected (`major` if missing non-trivial tests)
- No secrets in diff; migrations ↔ SPEC §3 (Garra)

## Process

1. AGENTS + eslint config skim.
2. Path rules on changed files.
3. Cap ~10 findings.

## Output

```json
{ "dimension": "standards", "findings": [], "summary": { "major": 0, "minor": 0, "nit": 0 } }
```
