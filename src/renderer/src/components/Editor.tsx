import * as monaco from 'monaco-editor';
import { type Component, createEffect, onCleanup, onMount } from 'solid-js';
import type { Theme } from '../../../types/theme.js';
import type { EOL, Indent, Lang } from './App.jsx';
import * as styles from './Editor.css.js';

type Props = {
  value: string;
  indent: Indent;
  eol: EOL;
  lang: Lang;
  theme: Theme;
  onChange: (value: string) => void;
};

const Editor: Component<Props> = (props) => {
  let editorRef: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;

  onMount(() => {
    editor = monaco.editor.create(editorRef, {
      automaticLayout: true,
      minimap: { enabled: false },
      roundedSelection: false,
      renderWhitespace: 'none',
      codeLens: false,
      autoDetectHighContrast: false,
    });

    editor.onDidChangeModelContent((e) => {
      if (!e.isFlush) {
        props.onChange(editor.getValue());
      }
    });

    editor.focus();
  });

  createEffect(() => editor.updateOptions({ tabSize: props.indent }));
  createEffect(() => editor.updateOptions({ theme: props.theme.isDark ? 'vs-dark' : 'vs' }));
  createEffect(() => editor.getModel()?.setEOL(monaco.editor.EndOfLineSequence[props.eol]));

  createEffect(() => {
    if (editor.getValue() !== props.value) {
      editor.setValue(props.value);
    }
  });

  createEffect(() => {
    const model = editor.getModel();
    if (model != null) {
      monaco.editor.setModelLanguage(model, props.lang);
    }
  });

  onCleanup(() => editor.dispose());

  // biome-ignore lint/style/noNonNullAssertion: https://docs.solidjs.com/configuration/typescript#ref-attribute
  return <div class={styles.root} ref={editorRef!} />;
};

export default Editor;
