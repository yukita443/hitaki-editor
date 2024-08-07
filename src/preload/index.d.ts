import type { Encoding, FileData, FileIdentifier } from '../types/file';
import type { Theme, ThemeSource } from '../types/theme';

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export interface ElectronAPI {
  setThemeSource: (source: ThemeSource) => void;
  getTheme: () => Promise<Theme>;
  updateTheme: (callback: () => void) => void;
  requestOpenFile: (callback: (initFile?: FileIdentifier & FileData) => void) => void;
  cannotOpenFile: (initFile?: FileIdentifier & FileData) => void;
  openFile: (encoding: Encoding) => Promise<(FileIdentifier & FileData) | undefined>;
  requestSaveFile: (callback: (newFile: boolean) => void) => void;
  saveFile: (
    file: Partial<FileIdentifier> & FileData,
    encoding: Encoding,
  ) => Promise<FileIdentifier | undefined>;
}
