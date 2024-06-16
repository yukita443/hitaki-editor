import { contextBridge, ipcRenderer } from 'electron';
import type { FileData, FileIdentifier } from '../types/file.js';
import type { Theme, ThemeSource } from '../types/theme.js';

contextBridge.exposeInMainWorld('electron', {
  setThemeSource: (source: ThemeSource): void => ipcRenderer.send('set-theme-source', source),
  getTheme: (): Promise<Theme> => ipcRenderer.invoke('get-theme'),
  updateTheme: (callback: () => void): void => {
    ipcRenderer.on('update-theme', () => callback());
  },
  requestOpenFile: (callback: (initFile?: FileIdentifier & FileData) => void): void => {
    ipcRenderer.on('request-open-file', (event, initFile?: FileIdentifier & FileData) => {
      callback(initFile);
    });
  },
  cannotOpenFile: (initFile?: FileIdentifier & FileData): void => {
    ipcRenderer.send('cannot-open-file', initFile);
  },
  openFile: (encoding: string): Promise<(FileIdentifier & FileData) | undefined> => {
    return ipcRenderer.invoke('open-file', encoding);
  },
  requestSaveFile: (callback: (newFile: boolean) => void): void => {
    ipcRenderer.on('request-save-file', (event, newFile: boolean) => callback(newFile));
  },
  saveFile: (
    file: Partial<FileIdentifier> & FileData,
    encoding: string,
  ): Promise<FileIdentifier | undefined> => {
    return ipcRenderer.invoke('save-file', file, encoding);
  },
});
