import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, t } = useAppState();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-divider bg-white dark:bg-slate-800 dark:border-slate-700 text-slategray dark:text-slate-300 hover:bg-cream-100 dark:hover:bg-slate-700 hover:text-midnight dark:hover:text-white transition-colors"
      aria-label={isDark ? t('theme.light') : t('theme.dark')}
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
