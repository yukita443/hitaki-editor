import { Menu, type MenuItemConstructorOptions } from 'electron';

import { createWindow } from './index.js';

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
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
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
  Menu.getApplicationMenu()?.items.forEach((item) => {
    item.submenu?.items
      .filter((e) => ['Save', 'Save As...'].includes(e.label))
      .forEach((e) => {
        e.enabled = enabled;
      });
  });
}
