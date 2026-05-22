# Standards checklist (AGENTS + ESLint + Vitest)

## Layout

- [ ] New types in `src/types/index.ts`
- [ ] New Zod in `src/lib/validators.ts`
- [ ] Supabase/data access in `src/hooks/`
- [ ] Reused `src/components/ui/` primitives
- [ ] `handle*` / `on*` naming

## ESLint (new issues in diff only)

- [ ] No new `@typescript-eslint/no-explicit-any` without justification
- [ ] React hooks rules respected (deps, conditional hooks)
- [ ] No new `eslint-disable` without comment
- [ ] Imports consistent with project config

## Tests

- [ ] New pure logic has Vitest (`*.test.ts`)
- [ ] Tests assert behavior, not implementation trivia

## Hygiene

- [ ] No secrets / `.env` in diff
- [ ] Schema migration paired with SPEC note (Garra)

## Out of scope (user config)

- [ ] Do **not** flag PR file count or unrelated refactors
