# Inline comment template (usability)

**Title (Portuguese, one line):** shown in `title` field and start of `body`.

**Body (English, technical):**

```markdown
**Problem:** …
**Suggestion:** …
**Context:** route / component / user action
**Regression check:** (if diff_plus_regression) nav, profile, or shared layout affected
```

Example `title`: `Botão de excluir sem confirmação`

Example `body`:

```markdown
**Problem:** Delete action fires on first tap with no confirm dialog.
**Suggestion:** Use existing confirm pattern from WorkoutBuilder (Modal + destructive variant).
**Context:** WorkoutListPage row actions.
**Regression check:** Bottom nav still visible; back navigation returns to list state.
```
