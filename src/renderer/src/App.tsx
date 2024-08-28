import type * as monaco from 'monaco-editor';
import {
  type Component,
  type JSX,
  createEffect,
  createResource,
  createSignal,
  lazy,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Encoding, FileData, FileIdentifier } from '../../types/file';
import type { Theme, ThemeSource } from '../../types/theme';
import * as styles from './App.css';
import StatusBar from './components/StatusBar';

const Editor = lazy(() => import('./components/Editor'));

export type Indent = (typeof indentOptions)[number];
export type EOL = keyof typeof monaco.editor.EndOfLineSequence;

export type Lang =
  | 'bat'
  | 'csharp'
  | 'cpp'
  | 'css'
  | 'go'
  | 'html'
  | 'java'
  | 'javascript'
  | 'json'
  | 'markdown'
  | 'plaintext'
  | 'powershell'
  | 'python'
  | 'rust'
  | 'shell'
  | 'typescript'
  | 'xml'
  | 'yaml';

export const indentOptions = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const encodingOptions: Record<Encoding, string> = {
  utf8: 'UTF-8',
  utf16le: 'UTF-16LE',
};

export const eolOptions: Record<EOL, string> = {
  LF: 'LF',
  CRLF: 'CRLF',
};

export const langOptions: Record<Lang, string> = {
  bat: 'Batch',
  csharp: 'C#',
  cpp: 'C/C++',
  css: 'CSS',
  go: 'Go',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  json: 'JSON',
  markdown: 'Markdown',
  plaintext: 'Plain Text',
  powershell: 'PowerShell',
  python: 'Python',
  rust: 'Rust',
  shell: 'Shell Script',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
};

export const themeSourceOptions: Record<ThemeSource, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

const App: Component = () => {
  let modified = false;
  const [isSaved, setSaved] = createSignal(true);
  const [currentFile, setCurrentFile] = createStore<Partial<FileIdentifier> & FileData>({
    content: '',
  });

  const [indent, setIndent] = createSignal<Indent>(4);
  const [eol, setEOL] = createSignal<EOL>('LF');
  const [lang, setLang] = createSignal<Lang>('plaintext');
  const [encoding, setEncoding] = createSignal<Encoding>('utf8');

  const [theme, { refetch }] = createResource<Theme>(() => window.electron.getTheme(), {
    initialValue: {
      source: 'system',
      isDark: false,
    },
  });

  createEffect(() => {
    document.title = (currentFile.name ?? 'Untitled') + (isSaved() ? '' : ' *');
  });

  window.electron.updateTheme(() => refetch());

  window.electron.requestOpenFile(async (initFile) => {
    if (modified) {
      window.electron.cannotOpenFile(initFile);
      return;
    }

    const file = initFile ?? (await window.electron.openFile(encoding()));
    if (file == null) return;

    modified = true;
    setCurrentFile('path', file.path);
    setCurrentFile('name', file.name);
    setCurrentFile('content', file.content);
  });

  window.electron.requestSaveFile(async (newFile) => {
    let file: FileIdentifier | undefined;
    if (!newFile && currentFile.path != null) {
      file = await window.electron.saveFile(
        {
          path: currentFile.path,
          content: currentFile.content,
        },
        encoding(),
      );
    } else {
      file = await window.electron.saveFile({ content: currentFile.content }, encoding());
    }
    if (file?.name == null || file?.path == null) {
      return;
    }

    setSaved(true);
    setCurrentFile('path', file.path);
    setCurrentFile('name', file.name);
  });

  const handleEditorChange = (value: string) => {
    modified = true;
    setSaved(false);
    setCurrentFile('content', value);
  };

  const handleIndentChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
    setIndent(Number(e.currentTarget.value) as Indent);
  };

  const handleEOLChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
    setEOL(e.currentTarget.value as EOL);
  };

  const handleLangChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
    setLang(e.currentTarget.value as Lang);
  };

  const handleEncodingChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
    setEncoding(e.currentTarget.value as Encoding);
  };

  const handleThemeSourceChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
    window.electron.setThemeSource(e.currentTarget.value as ThemeSource);
  };

  return (
    <div class={styles.root}>
      <Editor
        value={currentFile.content}
        indent={indent()}
        eol={eol()}
        lang={lang()}
        theme={theme()}
        onChange={handleEditorChange}
      />
      <StatusBar
        indent={indent()}
        eol={eol()}
        lang={lang()}
        encoding={encoding()}
        theme={theme()}
        onIndentChange={handleIndentChange}
        onEOLChange={handleEOLChange}
        onLangChange={handleLangChange}
        onEncodingChange={handleEncodingChange}
        onThemeSourceChange={handleThemeSourceChange}
      />
    </div>
  );
};

export default App;
