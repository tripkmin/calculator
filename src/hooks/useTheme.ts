import { useEffect, useState } from 'react';
import { ThemeT } from 'types/type';

/* 
1. Apply previously configured settings if available.
2. If not available, check for prefer-scheme, and apply it if present.
3. If both are unavailable, default to Theme A.
*/

function useTheme() {
  const localTheme = localStorage.getItem('calc_theme');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let themeToApply: ThemeT = 'A';

  if (localTheme === 'A' || localTheme === 'B' || localTheme === 'C') {
    themeToApply = localTheme;
  } else if (prefersDarkMode) {
    themeToApply = 'C';
  }

  const [theme, setTheme] = useState<ThemeT>(themeToApply);

  useEffect(() => {
    localStorage.setItem('calc_theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export default useTheme;
