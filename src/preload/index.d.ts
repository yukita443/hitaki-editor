import type { Theme, ThemeSource } from '../renderer/src/App.tsx';

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export interface ElectronAPI {
  setThemeSource: (source: ThemeSource) => void;
  getTheme: () => Promise<Theme>;
}
