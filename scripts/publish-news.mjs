#!/usr/bin/env node
/**
 * Publish a daily news digest into the static site.
 *
 * The digest is a JSON document (see news/data/2026-07-26.json for the shape):
 *   { "date": "YYYY-MM-DD", "title"?, "intro"?, "items": [{ "title", "url",
 *     "hn"?, "points"?, "comments"?, "summary"? }] }
 *
 * Usage:
 *   node scripts/publish-news.mjs <digest.json>            # write files only
 *   node scripts/publish-news.mjs <digest.json> --commit   # + git commit
 *   node scripts/publish-news.mjs <digest.json> --push     # + git commit + push
 *   cat digest.json | node scripts/publish-news.mjs -      # read from stdin
 *
 * Writes news/data/<date>.json and rebuilds news/data/index.json from the
 * files on disk, so the manifest can never drift from the actual data.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(repo, 'news', 'data');

const args = process.argv.slice(2);
const push = args.includes('--push');
const commit = push || args.includes('--commit');
const src = args.find(a => !a.startsWith('--'));

if (!src) {
  console.error('usage: publish-news.mjs <digest.json | -> [--commit] [--push]');
  process.exit(1);
}

const raw = src === '-' ? readFileSync(0, 'utf8') : readFileSync(src, 'utf8');
const digest = JSON.parse(raw);

if (!/^\d{4}-\d{2}-\d{2}$/.test(digest.date ?? '')) {
  throw new Error(`invalid or missing "date" (expected YYYY-MM-DD): ${digest.date}`);
}
if (!Array.isArray(digest.items) || digest.items.length === 0) {
  throw new Error('"items" must be a non-empty array');
}
for (const [i, it] of digest.items.entries()) {
  if (!it.title || !it.url) throw new Error(`items[${i}] needs "title" and "url"`);
  if (!/^https?:\/\//.test(it.url)) throw new Error(`items[${i}].url is not http(s): ${it.url}`);
}

const dayFile = join(dataDir, `${digest.date}.json`);
writeFileSync(dayFile, JSON.stringify(digest, null, 2) + '\n');

// Rebuild the manifest from disk: one entry per YYYY-MM-DD.json, newest first.
const days = readdirSync(dataDir)
  .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
  .sort().reverse()
  .map(f => {
    const d = JSON.parse(readFileSync(join(dataDir, f), 'utf8'));
    return { date: d.date, ...(d.title ? { title: d.title } : {}), count: d.items?.length ?? 0 };
  });
writeFileSync(join(dataDir, 'index.json'), JSON.stringify({ days }, null, 2) + '\n');

console.log(`wrote ${dayFile} (${digest.items.length} items), manifest has ${days.length} day(s)`);

if (commit) {
  const git = (...a) => execFileSync('git', a, { cwd: repo, stdio: 'inherit' });
  git('add', 'news/data');
  try {
    execFileSync('git', ['diff', '--cached', '--quiet'], { cwd: repo });
    console.log('nothing new to commit');
  } catch {
    git('commit', '-m', `news: digest du ${digest.date}`);
    if (push) git('push');
  }
}
