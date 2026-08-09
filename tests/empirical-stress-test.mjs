import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

test('Empirical Stress Test 1: Build Output & SPA Client Router', async (t) => {
  await t.test('dist/ contains index.html, 404.html, sitemap.xml, robots.txt', () => {
    assert.ok(fs.existsSync(path.join(DIST_DIR, 'index.html')), 'dist/index.html missing');
    assert.ok(fs.existsSync(path.join(DIST_DIR, '404.html')), 'dist/404.html missing');
    assert.ok(fs.existsSync(path.join(DIST_DIR, 'robots.txt')), 'dist/robots.txt missing');
    assert.ok(fs.existsSync(path.join(DIST_DIR, 'sitemap.xml')), 'dist/sitemap.xml missing');
  });

  await t.test('index.html and 404.html bundle ClientRouter script for smooth SPA transitions', () => {
    const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const html404 = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf8');

    assert.ok(
      indexHtml.includes('ClientRouter') || indexHtml.includes('astro-route-announcer') || indexHtml.includes('data-astro-transition'),
      'index.html missing ClientRouter / ViewTransitions script bundle'
    );

    assert.ok(
      html404.includes('ClientRouter') || html404.includes('astro-route-announcer') || html404.includes('data-astro-transition'),
      '404.html missing ClientRouter / ViewTransitions script bundle'
    );
  });

  await t.test('Navigation links exist between / and /404 without hard redirects', () => {
    const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const html404 = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf8');

    // 404 page has link back to /
    assert.ok(html404.includes('href="/"'), '404.html must contain link to home (href="/")');

    // index.html or header has navigation links
    assert.ok(indexHtml.includes('href="#sobre"') && indexHtml.includes('href="#projetos"'), 'index.html contains internal section links');
  });
});

test('Empirical Stress Test 2: Theme Persistence & pedro-ivo-theme LocalStorage Key', async (t) => {
  await t.test('Inline script and theme.js consistently use pedro-ivo-theme key', () => {
    const layoutPath = path.join(ROOT_DIR, 'src', 'layouts', 'Layout.astro');
    const themeJsPath = path.join(ROOT_DIR, 'src', 'scripts', 'theme.js');

    const layoutCode = fs.readFileSync(layoutPath, 'utf8');
    const themeJsCode = fs.readFileSync(themeJsPath, 'utf8');

    assert.ok(layoutCode.includes("STORAGE_KEY = 'pedro-ivo-theme'"), 'Layout.astro inline script must use pedro-ivo-theme key');
    assert.ok(themeJsCode.includes("STORAGE_KEY = 'pedro-ivo-theme'"), 'theme.js must use pedro-ivo-theme key');
  });

  await t.test('theme.js registers astro:after-swap and astro:page-load event listeners for View Transitions re-hydration', () => {
    const themeJsPath = path.join(ROOT_DIR, 'src', 'scripts', 'theme.js');
    const themeJsCode = fs.readFileSync(themeJsPath, 'utf8');

    assert.ok(themeJsCode.includes("addEventListener('astro:after-swap'"), 'theme.js must listen to astro:after-swap');
    assert.ok(themeJsCode.includes("addEventListener('astro:page-load'"), 'theme.js must listen to astro:page-load');
  });
});

test('Empirical Stress Test 3: Accessibility Attributes (A11y)', async (t) => {
  await t.test('Theme toggle button features initial aria-pressed="false" and aria-label', () => {
    const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const html404 = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf8');

    assert.ok(indexHtml.includes('aria-pressed="false"'), 'index.html theme toggle must have aria-pressed="false"');
    assert.ok(indexHtml.includes('aria-label="Ativar tema escuro"'), 'index.html theme toggle must have aria-label');

    assert.ok(html404.includes('aria-pressed="false"'), '404.html theme toggle must have aria-pressed="false"');
    assert.ok(html404.includes('aria-label="Ativar tema escuro"'), '404.html theme toggle must have aria-label');
  });

  await t.test('Skip-link targets valid #conteudo main container in both index.html and 404.html', () => {
    const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const html404 = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf8');

    assert.ok(indexHtml.includes('href="#conteudo"'), 'index.html must have skip-link with href="#conteudo"');
    assert.ok(indexHtml.includes('id="conteudo"'), 'index.html must have element with id="conteudo"');

    assert.ok(html404.includes('href="#conteudo"'), '404.html must have skip-link with href="#conteudo"');
    assert.ok(html404.includes('id="conteudo"'), '404.html must have element with id="conteudo"');
  });

  await t.test('Global CSS contains prefers-reduced-motion media query', () => {
    const globalCssPath = path.join(ROOT_DIR, 'src', 'styles', 'global.css');
    const globalCss = fs.readFileSync(globalCssPath, 'utf8');

    assert.ok(globalCss.includes('@media (prefers-reduced-motion: reduce)'), 'global.css must contain prefers-reduced-motion media query');
    assert.ok(globalCss.includes('animation-duration: 0.01ms !important'), 'prefers-reduced-motion media query must disable/reduce animations');
  });
});
