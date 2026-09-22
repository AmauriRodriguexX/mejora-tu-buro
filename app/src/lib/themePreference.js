const THEME_KEY = 'mb-theme-preference';
const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

function systemTheme() {
  return window.matchMedia(SYSTEM_DARK_QUERY).matches ? 'dark' : 'light';
}

function storedTheme() {
  try {
    return window.localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

export function getThemePreference() {
  const stored = storedTheme();
  return stored === 'dark' || stored === 'light' ? stored : systemTheme();
}

export function followsSystemTheme() {
  return !storedTheme();
}

export function saveThemePreference(theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Keep the in-memory preference even when browser storage is unavailable.
  }
}

export function resetThemePreference() {
  try {
    window.localStorage.removeItem(THEME_KEY);
  } catch {
    // The live system preference can still be restored without storage.
  }
  return systemTheme();
}

export function watchSystemTheme(onChange) {
  const media = window.matchMedia(SYSTEM_DARK_QUERY);
  const update = () => {
    if (followsSystemTheme()) onChange(media.matches ? 'dark' : 'light');
  };
  media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
}
