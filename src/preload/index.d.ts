import type { Theme, ThemeSource } from '../types/theme.ts';

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export interface ElectronAPI {
  setThemeSource: (source: ThemeSource) => void;
  getTheme: () => Promise<Theme>;
  updateTheme: (callback: () => void) => void;
}
