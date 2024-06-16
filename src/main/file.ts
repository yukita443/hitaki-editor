import fs from 'node:fs/promises';
import path from 'node:path';
import { type BrowserWindow, dialog } from 'electron';
import type { FileData, FileIdentifier } from '../types/file.js';

export async function openFile(
  encoding = 'utf8',
): Promise<(FileIdentifier & FileData) | undefined> {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  if (result.canceled) return;

  const filePath = result.filePaths[0];

  let buffer!: Buffer;
  try {
    buffer = await fs.readFile(filePath);
  } catch (error) {
    if (error instanceof Error) {
      dialog.showMessageBox({
        type: 'error',
        message: `Can't open \`${path.basename(filePath)}\``,
        detail: error.message,
      });
      return;
    }
  }

  return {
    path: filePath,
    name: path.basename(filePath),
    content: buffer.toString('utf8'),
  };
}

export async function saveFile(
  window: BrowserWindow,
  file: Partial<FileIdentifier> & FileData,
  encoding = 'utf8',
): Promise<FileIdentifier | undefined> {
  const filePath = file.path ?? (await dialog.showSaveDialog(window, {})).filePath;
  if (filePath == null || filePath === '') {
    return;
  }

  try {
    await fs.writeFile(filePath, file.content, 'utf8');
  } catch (error) {
    if (error instanceof Error) {
      dialog.showMessageBox(window, {
        type: 'error',
        message: `Can't save as \`${path.basename(filePath)}\``,
        detail: error.message,
      });
      return;
    }
  }

  return {
    path: filePath,
    name: path.basename(filePath),
  };
}
