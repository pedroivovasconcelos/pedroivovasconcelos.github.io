import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFileSync(path.join(root, relative), 'utf8');

test('public snapshot excludes local orchestration and request artifacts', () => {
  for (const relative of ['.agents', 'ORIGINAL_REQUEST.md', 'TEST_INFRA.md', 'TEST_READY.md']) {
    assert.equal(existsSync(path.join(root, relative)), false, `${relative} must not be published`);
  }

  const ignore = read('.gitignore');
  for (const pattern of ['.agents/', '/ORIGINAL_REQUEST.md', '/TEST_*.md', 'node_modules/', 'dist/', '.astro/']) {
    assert.ok(ignore.includes(pattern), `.gitignore must contain ${pattern}`);
  }
});

test('review CI and Pages deployment have separate, least-surprise triggers', () => {
  const quality = read('.github/workflows/quality.yml');
  const deployment = read('.github/workflows/deploy-pages.yml');

  assert.match(quality, /^\s{2}pull_request:\s*$/m);
  assert.doesNotMatch(quality, /deploy-pages|configure-pages|upload-pages-artifact/);
  assert.doesNotMatch(deployment, /^\s{2}pull_request:\s*$/m);
  assert.match(deployment, /^\s{2}push:\s*$/m);
  assert.match(deployment, /^\s{4}branches:\s*\[main\]\s*$/m);
  assert.match(deployment, /^\s{2}workflow_dispatch:\s*$/m);
  assert.match(deployment, /^\s{2}contents:\s*read\s*$/m);
  assert.match(deployment, /^\s{2}pages:\s*write\s*$/m);
  assert.match(deployment, /^\s{2}id-token:\s*write\s*$/m);
  assert.match(deployment, /^\s{2}group:\s*pages\s*$/m);
  assert.match(deployment, /^\s{6}name:\s*github-pages\s*$/m);

  const actionUses = `${quality}\n${deployment}`.match(/^\s+(?:-\s+)?uses:\s+.+$/gm) || [];
  assert.equal(actionUses.length, 7);
  for (const line of actionUses) {
    assert.match(line, /@[0-9a-f]{40}(?:\s|$)/, `action is not SHA-pinned: ${line.trim()}`);
  }
});

test('inventory records the public privacy and controlled-deploy boundary', () => {
  const inventory = read('SNAPSHOT_INVENTORY.md');
  assert.match(inventory, /Não inclui e-mail, telefone, localização exata/);
  assert.match(inventory, /não executa em pull requests/);
  assert.match(inventory, /merge ou despacho manual/);
});
