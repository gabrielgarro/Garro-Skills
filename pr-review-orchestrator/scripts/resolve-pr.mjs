#!/usr/bin/env node
/**
 * Resolve PR metadata for pr-review-orchestrator.
 * Usage:
 *   node resolve-pr.mjs --pr 42
 *   node resolve-pr.mjs --url https://github.com/owner/repo/pull/42
 *   node resolve-pr.mjs --branch feat/foo
 *   node resolve-pr.mjs   # current branch → open PR
 *
 * Prints JSON to stdout.
 */
import { execSync } from 'node:child_process';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    pr: { type: 'string', short: 'p' },
    url: { type: 'string', short: 'u' },
    branch: { type: 'string', short: 'b' },
    repo: { type: 'string', short: 'r' },
  },
});

function gh(cmd) {
  return execSync(`gh ${cmd}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

function parsePrUrl(url) {
  const m = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/i);
  if (!m) throw new Error(`Invalid PR URL: ${url}`);
  return { owner: m[1], repo: m[2], number: Number(m[3]) };
}

function remoteOwnerRepo() {
  try {
    const json = gh('repo view --json owner,name');
    const { owner, name } = JSON.parse(json);
    return { owner: owner.login ?? owner.name, repo: name };
  } catch {
    const origin = gh('repo view --json nameWithOwner').replace(/"/g, '');
    const [owner, repo] = origin.split('/');
    return { owner, repo };
  }
}

let owner;
let repo;
let number;

if (values.url) {
  ({ owner, repo, number } = parsePrUrl(values.url));
} else if (values.pr) {
  number = Number(values.pr);
  if (values.repo) {
    [owner, repo] = values.repo.split('/');
  } else {
    ({ owner, repo } = remoteOwnerRepo());
  }
} else {
  ({ owner, repo } = remoteOwnerRepo());
  const branch = values.branch ?? gh('rev-parse --abbrev-ref HEAD');
  const list = gh(
    `pr list --head "${branch}" --json number,url,headRefOid,baseRefName,headRefName,title,state --limit 1`,
  );
  const rows = JSON.parse(list || '[]');
  if (!rows.length) {
    console.error(JSON.stringify({ error: 'no_open_pr', branch, owner, repo }));
    process.exit(1);
  }
  number = rows[0].number;
}

const fields =
  'number,url,title,state,headRefOid,headRefName,baseRefName,baseRefOid,author,files';
const prJson = gh(
  `pr view ${number} --repo ${owner}/${repo} --json ${fields}`,
);
const pr = JSON.parse(prJson);

const out = {
  owner,
  repo,
  pr: pr.number,
  url: pr.url,
  title: pr.title,
  state: pr.state,
  commit_id: pr.headRefOid,
  head_ref: pr.headRefName,
  base_ref: pr.baseRefName,
  base_oid: pr.baseRefOid,
  author: pr.author?.login,
  changed_files: (pr.files ?? []).map((f) => f.path),
};

console.log(JSON.stringify(out, null, 2));
