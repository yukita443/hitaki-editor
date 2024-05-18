import type * as monaco from 'monaco-editor';
import { type Component, type JSX, createResource, createSignal } from 'solid-js';
import type { Theme, ThemeSource } from '../../../types/theme.js';
import Editor from './Editor.jsx';
import StatusBar from './StatusBar.jsx';

export type Indent = (typeof indentOptions)[number];
export type Encoding = 'utf8' | 'utf16le';
export type EOL = keyof typeof monaco.editor.EndOfLineSequence;
export type Lang = 'css' | 'html' | 'typescript';

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
  css: 'CSS',
  html: 'HTML',
  typescript: 'TypeScript',
};

export const themeSourceOptions: Record<ThemeSource, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

const App: Component = () => {
  const [indent, setIndent] = createSignal<Indent>(4);
  const [eol, setEOL] = createSignal<EOL>('LF');
  const [lang, setLang] = createSignal<Lang>('html');
  const [encoding, setEncoding] = createSignal<Encoding>('utf8');

  const [theme, { refetch }] = createResource<Theme>(() => window.electron.getTheme(), {
    initialValue: {
      source: 'system',
      isDark: false,
    },
  });

  window.electron.updateTheme(() => refetch());

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
    <>
      <Editor
        indent={indent()}
        eol={eol()}
        lang={lang()}
        theme={theme()}
        hidden={theme.state !== 'ready'}
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
    </>
  );
};

export default App;
