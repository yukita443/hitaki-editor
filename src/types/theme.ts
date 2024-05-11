export type ThemeSource = 'system' | 'light' | 'dark';

export type Theme = {
  source: ThemeSource;
  isDark: boolean;
};
