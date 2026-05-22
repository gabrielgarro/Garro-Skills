#!/usr/bin/env node
/**
 * Post inline PR review comments from aggregated findings JSON.
 *
 * Usage:
 *   node post-inline-comments.mjs --input findings.json --owner o --repo r --pr 42 --commit abc
 *   node post-inline-comments.mjs --input findings.json   # reads owner/repo/pr/commit from file
 *
 * Env:
 *   PR_REVIEW_MAX_INLINE_PER_DIM (default 30)
 *   GITHUB_TOKEN (optional; gh uses auth session)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { parseArgs } from 'node:util';

const TAG = '[pr-review-orchestrator]';
const MAX_PER_DIM = Number(process.env.PR_REVIEW_MAX_INLINE_PER_DIM ?? 30);

const { values } = parseArgs({
  options: {
    input: { type: 'string', short: 'i', default: 'findings.json' },
    owner: { type: 'string', short: 'o' },
    repo: { type: 'string', short: 'r' },
    pr: { type: 'string', short: 'p' },
    commit: { type: 'string', short: 'c' },
    'dry-run': { type: 'boolean', default: false },
    'post-summary': { type: 'boolean', default: true },
  },
});

function ghApi(method, path, body) {
  const tmp = process.env.TEMP || '/tmp';
  const file = `${tmp}/gh-api-${Date.now()}.json`;
  if (body) writeFileSync(file, JSON.stringify(body));
  const cmd = body
    ? `gh api -X ${method} ${path} --input "${file}"`
    : `gh api ${path}`;
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } finally {
    if (body) {
      try {
        execSync(`rm "${file}"`, { stdio: 'ignore' });
      } catch {
        /* windows */
      }
    }
  }
}

function gh(cmd) {
  return execSync(`gh ${cmd}`, { encoding: 'utf8' }).trim();
}

function parsePatchRanges(patch) {
  if (!patch) return [];
  const ranges = [];
  const hunkRe = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm;
  let m;
  while ((m = hunkRe.exec(patch)) !== null) {
    const start = Number(m[1]);
    const count = m[2] ? Number(m[2]) : 1;
    ranges.push({ start, end: start + Math.max(count, 1) - 1 });
  }
  return ranges;
}

function lineInPatch(line, ranges) {
  if (!ranges.length) return false;
  return ranges.some((r) => line >= r.start && line <= r.end);
}

function normalizeSeverity(dim, sev) {
  return String(sev ?? 'medium').toLowerCase();
}

function formatBody(dim, finding) {
  const sev = normalizeSeverity(dim, finding.severity);
  const prefix = `${TAG}[${dim}][${sev}] **${finding.id} — ${finding.title}**\n\n`;
  return prefix + (finding.body ?? '').trim();
}

function dedupeKey(f) {
  return `${f.path}:${f.line}:${f.title?.toLowerCase()?.slice(0, 40)}`;
}

const raw = JSON.parse(readFileSync(values.input, 'utf8'));
const owner = values.owner ?? raw.owner;
const repo = values.repo ?? raw.repo;
const pr = Number(values.pr ?? raw.pr);
const commitId = values.commit ?? raw.commit_id;

if (!owner || !repo || !pr || !commitId) {
  console.error('Missing owner, repo, pr, or commit_id');
  process.exit(1);
}

const filesRaw = ghApi(
  'GET',
  `repos/${owner}/${repo}/pulls/${pr}/files?per_page=100`,
);
const filePatches = new Map();
for (const f of JSON.parse(filesRaw)) {
  filePatches.set(f.filename, parsePatchRanges(f.patch));
}

const posted = [];
const skipped = [...(raw.skipped ?? [])];
const dimCounts = new Map();

const allFindings = [];
for (const dimBlock of raw.dimensions ?? []) {
  const dim = dimBlock.dimension;
  for (const f of dimBlock.findings ?? []) {
    allFindings.push({ ...f, dimension: dim });
  }
}

const seen = new Map();
for (const f of allFindings) {
  const key = dedupeKey(f);
  if (seen.has(key)) {
    const prev = seen.get(key);
    prev.body = `${prev.body}\n\n---\n\n${f.body ?? ''}`;
    continue;
  }
  seen.set(key, f);
}

for (const f of seen.values()) {
  const dim = f.dimension;
  const count = dimCounts.get(dim) ?? 0;
  if (count >= MAX_PER_DIM) {
    skipped.push({ id: f.id, reason: 'rate_limit', dimension: dim, title: f.title });
    continue;
  }

  if (!f.path || !f.line) {
    skipped.push({ id: f.id, reason: 'missing_path_or_line', title: f.title });
    continue;
  }

  const ranges = filePatches.get(f.path);
  if (!ranges || !lineInPatch(Number(f.line), ranges)) {
    skipped.push({
      id: f.id,
      reason: 'line_not_in_diff',
      path: f.path,
      line: f.line,
      title: f.title,
    });
    continue;
  }

  const body = formatBody(dim, f);
  if (values['dry-run']) {
    posted.push({ id: f.id, path: f.path, line: f.line, dryRun: true });
    dimCounts.set(dim, count + 1);
    continue;
  }

  try {
    ghApi('POST', `repos/${owner}/${repo}/pulls/${pr}/comments`, {
      body,
      commit_id: commitId,
      path: f.path,
      line: Number(f.line),
      side: f.side ?? 'RIGHT',
    });
    posted.push({ id: f.id, path: f.path, line: f.line });
    dimCounts.set(dim, count + 1);
  } catch (e) {
    skipped.push({
      id: f.id,
      reason: 'api_error',
      error: String(e.message ?? e),
      title: f.title,
    });
  }
}

const result = { posted: posted.length, skipped: skipped.length, details: { posted, skipped } };
console.log(JSON.stringify(result, null, 2));

if (values['post-summary'] && !values['dry-run']) {
  const lines = [
    `## ${TAG} Review summary`,
    '',
    `**Commit:** \`${commitId.slice(0, 7)}\` · **Posted:** ${posted.length} inline · **Skipped:** ${skipped.length}`,
    '',
    '| Dimension | Posted |',
    '|-----------|--------|',
  ];
  for (const [dim, n] of dimCounts) {
    lines.push(`| ${dim} | ${n} |`);
  }
  if (skipped.length) {
    lines.push('', '### Skipped (not inline)', '');
    for (const s of skipped.slice(0, 20)) {
      lines.push(`- \`${s.id}\` (${s.reason}): ${s.title ?? s.path ?? ''}`);
    }
    if (skipped.length > 20) lines.push(`- … and ${skipped.length - 20} more`);
  }
  lines.push('', '_Re-run in Cursor: `review pr #' + pr + '`_');
  const summaryPath = `${process.env.TEMP || '/tmp'}/pr-review-summary-${pr}.md`;
  writeFileSync(summaryPath, lines.join('\n'), 'utf8');
  gh(`pr comment ${pr} --repo ${owner}/${repo} --body-file "${summaryPath}"`);
}
