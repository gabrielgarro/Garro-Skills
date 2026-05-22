---
name: pr-review-orchestrator
description: >-
  Multi-dimension PR reviews (security, usability, performance, standards) with
  inline GitHub comments. Use on PR URL, review pr, revisar pr, or after gh pr create.
---

# PR Review Orchestrator

Four reviews → inline comments + summary. Read-only on PR code.

## Hard rules

1. Comment only; never commit on PR branch.
2. Sub-skills return JSON per [review-contract.md](review-contract.md); only this skill posts.
3. Tag `[pr-review-orchestrator]` on bodies.
4. Idempotency: same `commit_id` in latest summary → ask before re-post unless "force review".
5. Security: `pentest-pr-reviewer` orchestrated **`quick`**.

## Scripts

`scripts/resolve-pr.mjs`, `scripts/post-inline-comments.mjs` — repo root, `gh` auth.

## Phase 0

1. [review-contract.md](review-contract.md) only (schema + handoff).
2. Resolve PR: `resolve-pr.mjs --url` | `--pr N` | default branch.
3. Load workspace `GYMAPP.md` overlays if present.

## Phase 1 — Context

`gh pr diff`; sensitive paths for security; optional idempotency on comments.

## Phase 2 — Parallel reviews

Task subagents `readonly: true` when available. Each reads its `SKILL.md` + `GYMAPP.md`; **not** `comment-template.md`.

| Skill | dimension |
|--------|-----------|
| pentest-pr-reviewer | security |
| pr-review-usability | usability |
| pr-review-performance | performance |
| pr-review-standards | standards |

Handoff: PR metadata, files, diff, review-contract.

## Phase 3 — Aggregate

`findings.json` with `dimensions[]`, `skipped[]`.

## Phase 4 — Post

`post-inline-comments.mjs --input findings.json` (optional `--dry-run`).

## Phase 5 — Close (PT)

≤6 lines: PR link; table `dimension | posted | top severity`; Critical/High one-liners; next step. No paste findings JSON ([chat-output.md](../skill-authoring/chat-output.md)).

## Env

`PR_REVIEW_MAX_INLINE_PER_DIM` (30), `PR_REVIEW_SKIP_IF_SAME_SHA`, `PR_REVIEW_SAVE_REPORT`.

## CI

Repo `.github/pr-review/prompt.md` → same contract → `findings.json`.
