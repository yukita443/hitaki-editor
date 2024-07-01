import { Menu, type MenuItemConstructorOptions } from 'electron';
import { createWindow, createWindowWithFile } from './index.js';

const isMac = process.platform === 'darwin';

export function createMenu(): Menu {
  const template: MenuItemConstructorOptions[] = [
    ...((isMac ? [{ role: 'appMenu' }] : []) as MenuItemConstructorOptions[]),
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => createWindow(),
        },
        { type: 'separator' },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: (item, window) => {
            if (window == null) {
              createWindowWithFile();
            } else {
              window.webContents.send('request-open-file');
            }
          },
        },
        { type: 'separator' },
        {
          id: 'save',
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: (item, window) => window?.webContents.send('request-save-file', false),
        },
        {
          id: 'save-as',
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: (item, window) => window?.webContents.send('request-save-file', true),
        },
        { type: 'separator' },
        {
          label: isMac ? 'Close' : 'Quit',
          accelerator: isMac ? 'Cmd+W' : 'Alt+F4',
          role: isMac ? 'close' : 'quit',
        },
      ],
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
  ];

  return Menu.buildFromTemplate(template);
}

export function setMenuEnabled(enabled: boolean) {
  const items = ['save', 'save-as']
    .map((s) => Menu.getApplicationMenu()?.getMenuItemById(s))
    .filter((e) => e != null);
  for (const item of items) {
    item.enabled = enabled;
  }
}
