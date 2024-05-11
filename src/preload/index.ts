import { contextBridge, ipcRenderer } from 'electron';
import type { Theme, ThemeSource } from '../main/index.js';

contextBridge.exposeInMainWorld('electron', {
  setThemeSource: (source: ThemeSource): void => ipcRenderer.send('set-theme-source', source),
  getTheme: (): Promise<Theme> => ipcRenderer.invoke('get-theme'),
});
