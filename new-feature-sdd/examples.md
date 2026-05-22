# Example

> **Read only** if SDD flow is ambiguous.

# Example — Hydration reminder during workout

> **Read only** if SDD flow is ambiguous.

## User input

> vamos começar uma nova feature: lembrete de hidratação durante o treino

## Phase 1 — Benchmark (abbreviated)

Source: `Docs/research/competitive-summary.md`

- Hevy/Strong: no in-session hydration nudges
- Gap: long sessions without pause reminders
- Garra angle: tie to active `WorkoutRunPage` session only

## Phase 2 — Interview (abbreviated answers)

| Topic | Answer |
|-------|--------|
| MVP | Local notification after 45 min active run timer |
| Out of scope | Tracking water intake volume |
| Persona | All authenticated users |
| Prefix | `HY-` |

## Phase 3 — Draft path

`Docs/features/FEATURE-15-hydration-reminder-draft.md`

Excerpt:

```markdown
## User Stories (EN)

| ID | As a... | I want... | So that... |
|----|---------|-----------|------------|
| HY-01 | user in an active workout | get a reminder after 45 minutes | I stay hydrated on long sessions |

## Acceptance Criteria (EN)

**HY-01 — Reminder**
- [ ] Fires only while `WorkoutRunPage` is mounted and session active
- [ ] Uses in-app banner first; optional `Notification` API if permission granted
- [ ] Does not fire again in the same session after dismiss
```

Chat summary (PT): *"Draft FEATURE-15 criado. MVP: banner após 45min no treino ativo. Aprovar merge no SPEC?"*

## Phase 4 — After approval

- Status table: `Feature 15 — Hydration Reminder | 🔲 Pendente`
- SPEC: new `## 24. Feature 15 — Hydration Reminder` with N.1–N.4
- No migration if state is client-only (Zustand); else minimal `profiles` preference column

## Phase 5 — Implementation

```bash
git checkout -b feat/hydration-reminder
```

Files:

- `src/lib/hydrationReminder.ts` + test
- `WorkoutRunPage.tsx` — wire timer
- `npm test`

No commit until user requests.
