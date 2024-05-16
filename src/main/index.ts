import path from 'node:path';
import { env } from 'node:process';
import { BrowserWindow, Menu, app, ipcMain, nativeTheme, shell } from 'electron';
import type { Theme, ThemeSource } from '../types/theme.js';
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

  setMenuEnabled(true);

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
});

ipcMain.handle(
  'get-theme',
  (): Theme => ({
    source: nativeTheme.themeSource,
    isDark: nativeTheme.shouldUseDarkColors,
  }),
);
