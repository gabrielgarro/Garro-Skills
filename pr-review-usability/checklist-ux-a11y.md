# Usability & a11y checklist

## Diff (changed files)

- [ ] Interactive elements have accessible name (`aria-label`, visible text)
- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have `<label>` or `aria-label`
- [ ] Focus ring visible (no `outline-none` without replacement)
- [ ] Touch targets ≥ 44px on primary actions
- [ ] No horizontal scroll on 375px for main content
- [ ] Loading / empty / error states present where async or lists
- [ ] Destructive actions use confirm dialog
- [ ] User-facing copy in Portuguese; errors actionable
- [ ] Modals: dismiss + focus trap

## Regression (adjacent chrome)

- [ ] Bottom nav: correct items active; not overlapping FAB/content
- [ ] Active workout: nav hidden per FEATURE-04 if run UI changed
- [ ] Profile sub-routes: back navigation consistent
- [ ] Theme (light/dark): new colors use CSS tokens, readable in both
- [ ] Safe-area / `pb-*` padding for mobile browser chrome
- [ ] Shared `PageHeader` / layout: title and actions still align

## Severity reminder

Use `major` / `minor` / `nit` only — no `blocker`.
