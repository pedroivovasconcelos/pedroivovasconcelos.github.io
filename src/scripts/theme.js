/**
 * src/scripts/theme.js
 * Theme Management and Client Router Re-hydration Script
 */

const STORAGE_KEY = 'pedro-ivo-theme';
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function readStoredTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch (_error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (_error) {
    // Storage preference fallback
  }
}

function getActiveTheme() {
  const currentAttr = document.documentElement.getAttribute('data-theme');
  if (currentAttr === 'dark' || currentAttr === 'light') {
    return currentAttr;
  }
  const stored = readStoredTheme();
  if (stored) return stored;
  return mediaQuery.matches ? 'dark' : 'light';
}

function updateToggleUI(theme) {
  const toggle = document.querySelector('[data-theme-toggle]');
  const icon = document.querySelector('[data-theme-icon]');
  const isDark = theme === 'dark';

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute(
      'aria-label',
      isDark ? 'Ativar tema claro' : 'Ativar tema escuro'
    );
  }

  if (icon) {
    icon.textContent = isDark ? '☀' : '◐';
  }
}

function applyTheme(theme, persist = false) {
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleUI(theme);
  if (persist) {
    storeTheme(theme);
  }
}

function initThemeUI() {
  const activeTheme = getActiveTheme();
  document.documentElement.setAttribute('data-theme', activeTheme);
  updateToggleUI(activeTheme);

  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle && !toggle.dataset.themeInitialized) {
    toggle.dataset.themeInitialized = 'true';
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }
}

function initFooterYear() {
  const yearNodes = document.querySelectorAll('[data-current-year]');
  const currentYear = String(new Date().getFullYear());
  yearNodes.forEach((node) => {
    node.textContent = currentYear;
  });
}

const handleSystemThemeChange = (event) => {
  if (!readStoredTheme()) {
    applyTheme(event.matches ? 'dark' : 'light', false);
  }
};

if (typeof mediaQuery.addEventListener === 'function') {
  mediaQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof mediaQuery.addListener === 'function') {
  mediaQuery.addListener(handleSystemThemeChange);
}

document.addEventListener('astro:after-swap', () => {
  const activeTheme = getActiveTheme();
  document.documentElement.setAttribute('data-theme', activeTheme);
});

document.addEventListener('astro:page-load', () => {
  initThemeUI();
  initFooterYear();
});

// Run once immediately on initial module script execution as well
initThemeUI();
initFooterYear();
