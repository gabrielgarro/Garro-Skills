# Spec template (draft and SPEC section)

Use for `Docs/features/FEATURE-NN-<slug>-draft.md`. Technical prose in **English**.

When merging into `Docs/SPEC.md`, map draft sections to:

| Draft section | SPEC section |
|---------------|--------------|
| User Stories | `## N. Feature NN — Title` → `### N.1 User Stories` |
| Acceptance Criteria | `### N.2 Critérios de Aceite` (keep EN or match existing SPEC language per project) |
| UI / Wireframe | `### N.3 Interface` (optional ASCII) |
| Hooks / API | `### N.4 Hook \`useX\`` or API subsection |

---

## Draft file skeleton

```markdown
# Feature NN — <Title> (DRAFT)

> Status: draft
> Benchmark: <Docs/research/file.md or session paste>
> Interview date: YYYY-MM-DD
> Story prefix: <XX->

## Summary (EN)

One paragraph: problem, solution, persona, MVP boundary.

## User Stories (EN)

| ID | As a... | I want... | So that... |
|----|---------|-----------|------------|
| XX-01 | ... | ... | ... |

## Acceptance Criteria (EN)

Group by story ID. Use checkboxes `- [ ]`.

**XX-01 — Short title**
- [ ] Testable criterion
- [ ] Testable criterion

## UI / Wireframe

ASCII layout (mobile-first).

## Data Model

### SQL draft

\`\`\`sql
-- tables, columns, indexes
\`\`\`

### RLS notes

- SELECT: ...
- INSERT/UPDATE/DELETE: ...

### Migration file

`supabase/migrations/NNN_<slug>.sql`

## TypeScript

\`\`\`typescript
// Blocks to add to src/types/index.ts
\`\`\`

## Routes (delta)

\`\`\`
App
└── /new-route → NewPage
\`\`\`

## Hooks / API / Edge functions

\`\`\`typescript
// src/hooks/useFeature.ts responsibilities
\`\`\`

## E2E Scenarios (EN)

Playwright targets for Phase 6 (`e2e/features/feature-NN-<slug>.spec.ts`). One line per P0 story; Given/When/Then style.

- [ ] XX-01: Given … When … Then …
- [ ] XX-02: …

## Implementation Checklist

- [ ] `src/pages/...`
- [ ] `src/hooks/...`
- [ ] `src/lib/validators.ts` — schema name
- [ ] `src/types/index.ts`
- [ ] `supabase/migrations/...` (if any)
- [ ] Tests: `src/lib/....test.ts`
- [ ] E2E: `e2e/features/feature-NN-<slug>.spec.ts` (via `playwright-e2e-from-plan` after PR)

## Out of Scope

- Item explicitly deferred

## Open Questions

- TBD items for user or next iteration
```

---

## Acceptance criteria quality bar

- Observable behavior, not implementation detail
- Mention Free/Premium/admin when rules apply
- Mobile-first, loading/empty/error called out
- Reference existing SPEC patterns (debounce 300ms, skeletons, toasts)

## Section numbering in SPEC

1. Read status table; highest **Feature N** → next is **N+1**.
2. New SPEC section number = last feature section number + 1 (insert before "## 23. Passo a Passo").
3. Add index line: `N. [Feature NN — Title](#anchor)`.

## Merge checklist (Phase 4)

```
- [ ] Status table updated
- [ ] Index entry added
- [ ] Feature section N.1–N.4 in SPEC
- [ ] Schema §3 + migration (if any)
- [ ] Routes §2 (if any)
- [ ] Draft renamed/removed
- [ ] AGENTS/README (if needed)
```
