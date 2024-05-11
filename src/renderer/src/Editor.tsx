import * as monaco from 'monaco-editor';
import { type Component, createEffect, onCleanup, onMount } from 'solid-js';
import { type EOL, type Indent, type Lang, eolOptions } from './App.jsx';

type Props = {
  indent: Indent;
  eol: EOL;
  lang: Lang;
  isDark: boolean;
  hidden: boolean;
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
      contextmenu: false,
      codeLens: false,
      autoDetectHighContrast: false,
      fontFamily: '"SF Mono", Consolas, "DejaVu Mono", "Hiragino Sans", "Noto Sans JP", monospace',
    });
  });

  createEffect(() => editor.updateOptions({ tabSize: props.indent }));
  createEffect(() => editor.updateOptions({ theme: props.isDark ? 'vs-dark' : 'vs' }));
  createEffect(() => editor.getModel()?.setEOL(eolOptions[props.eol][1]));

  createEffect(() => {
    const model = editor.getModel();
    if (model != null) {
      monaco.editor.setModelLanguage(model, props.lang);
    }
  });

  createEffect((showed: boolean) => {
    if (!props.hidden && !showed) {
      editor.focus();
      return true;
    }
    return false;
  }, false);

  onCleanup(() => editor.dispose());

  // biome-ignore lint/style/noNonNullAssertion: https://docs.solidjs.com/configuration/typescript#ref-attribute
  return <div class='editor' hidden={props.hidden} ref={editorRef!} />;
};

export default Editor;
