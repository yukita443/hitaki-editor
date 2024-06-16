import path from 'node:path';
import { env } from 'node:process';
import { BrowserWindow, Menu, app, ipcMain, nativeTheme, shell } from 'electron';
import type { FileData, FileIdentifier } from '../types/file.js';
import type { Theme, ThemeSource } from '../types/theme.js';
import { openFile, saveFile } from './file.js';
import { createMenu, setMenuEnabled } from './menu.js';

const isDevelop = !app.isPackaged;
const isMac = process.platform === 'darwin';

export function createWindow(): BrowserWindow {
  const basePos = BrowserWindow.getFocusedWindow()?.getPosition();

  const mainWindow = new BrowserWindow({
    ...(basePos == null
      ? {
          x: 200,
          y: 150,
        }
      : {
          x: basePos[0] + 29,
          y: basePos[1] + 29,
        }),
    width: 700,
    height: 450,
    minWidth: 500,
    minHeight: 100,
    title: 'Untitled',
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  if (BrowserWindow.getAllWindows().length === 1) {
    setMenuEnabled(true);
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (isDevelop && env.ELECTRON_RENDERER_URL != null) {
    mainWindow.loadURL(env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  return mainWindow;
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(createMenu());
  createWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (isMac) {
    setMenuEnabled(false);
  } else {
    app.quit();
  }
});

ipcMain.on('set-theme-source', (event, source: ThemeSource) => {
  nativeTheme.themeSource = source;
  BrowserWindow.getAllWindows().forEach((e) => e.webContents.send('update-theme'));
});

ipcMain.handle(
  'get-theme',
  (): Theme => ({
    source: nativeTheme.themeSource,
    isDark: nativeTheme.shouldUseDarkColors,
  }),
);

ipcMain.on('cannot-open-file', async (event, initFile?: FileIdentifier & FileData) => {
  const file = initFile ?? (await openFile());
  if (file == null) return;

  const newWindow = createWindow();

  if (isMac) {
    newWindow.setRepresentedFilename(file.path);
  }

  newWindow.on('ready-to-show', () => {
    newWindow.webContents.send('request-open-file', file);
  });
});

ipcMain.handle('open-file', async (event, encoding: string) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const file = await openFile(encoding);
  if (file == null || window == null) return;

  if (isMac) {
    window.setRepresentedFilename(file.path);
  }

  return file;
});

ipcMain.handle(
  'save-file',
  async (event, file: Partial<FileIdentifier> & FileData, encoding: string) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window == null) return;
    const fileIdentifier = await saveFile(window, file, encoding);
    if (fileIdentifier == null) return;

    if (isMac) {
      window.setRepresentedFilename(fileIdentifier.path);
    }

    return fileIdentifier;
  },
);

nativeTheme.on('updated', () => {
  BrowserWindow.getAllWindows().forEach((e) => e.webContents.send('update-theme'));
});
