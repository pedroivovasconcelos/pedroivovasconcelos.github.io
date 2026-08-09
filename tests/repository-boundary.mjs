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

test('workflow is CI-only and every external action is pinned by SHA', () => {
  const workflow = read('.github/workflows/quality.yml');
  assert.doesNotMatch(workflow, /deploy-pages|configure-pages|upload-pages-artifact/);
  const actionUses = workflow.match(/^\s*- uses:\s+.+$/gm) || [];
  assert.ok(actionUses.length >= 2);
  for (const line of actionUses) {
    assert.match(line, /@[0-9a-f]{40}(?:\s|$)/, `action is not SHA-pinned: ${line.trim()}`);
  }
});

test('inventory records the public privacy and no-deploy boundary', () => {
  const inventory = read('SNAPSHOT_INVENTORY.md');
  assert.match(inventory, /Não inclui e-mail, telefone, localização exata/);
  assert.match(inventory, /GitHub Pages permanece desativado/);
});
