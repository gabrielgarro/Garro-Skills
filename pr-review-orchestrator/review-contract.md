# PR review contract (orchestrator + sub-skills)

## Handoff (orchestrated mode)

**Inputs:** `owner`, `repo`, `pr`, `url`, `commit_id`, `head_ref`, `base_ref`, changed files, diff excerpt, optional `GYMAPP.md`.

**Output:** one JSON dimension object per [schema below](#finding-object). No GitHub posts. No product edits. No `comment-template.md` reads (orchestrator posts).

**Rules:** evidence with `path`+`line` (RIGHT side); actionable suggestions; skip generated/lockfile-only unless sec/perf; zero findings OK; ID prefixes `SEC-`, `UX-`, `PERF-`, `STD-`.

| Dimension | Skill | Garra |
|-----------|--------|-------|
| security | `pentest-pr-reviewer` | tier `quick`; title PT / body EN |
| usability | `pr-review-usability` | title PT / body EN |
| performance | `pr-review-performance` | Supabase + gym-api |
| standards | `pr-review-standards` | AGENTS + ESLint |

## Top-level (per dimension)

```json
{
  "dimension": "security | usability | performance | standards",
  "tier": "quick | standard | deep",
  "findings": [],
  "summary": { "critical": 0, "high": 0, "medium": 0, "low": 0, "blocker": 0, "major": 0, "minor": 0, "nit": 0 }
}
```

## Finding object

| Field | Required | Notes |
|-------|----------|--------|
| `id` | yes | `SEC-001`, `UX-002`, … |
| `path` | inline | Repo-relative |
| `line` | inline | RIGHT side of diff |
| `severity` | yes | See table |
| `title` | yes | Short |
| `body` | yes | Problem, Suggestion, Refs |

| Dimension | Severities |
|-----------|------------|
| security | `critical`, `high`, `medium`, `low`, `informational` |
| usability | `blocker`, `major`, `minor`, `nit` |
| performance | `critical`, `high`, `medium`, `low` |
| standards | `blocker`, `major`, `minor`, `nit` |

## Aggregated (`findings.json`)

```json
{
  "pr": 42,
  "owner": "org",
  "repo": "gym-app",
  "commit_id": "abc...",
  "head_ref": "feat/foo",
  "dimensions": [],
  "skipped": [{ "id": "UX-003", "reason": "line_not_in_diff", "title": "..." }]
}
```

Poster prefix: `[pr-review-orchestrator][security][high] **SEC-001 — Title**`

**Limits:** max 30 inline/dimension (`PR_REVIEW_MAX_INLINE_PER_DIM`); dedupe same `path:line`+title.
