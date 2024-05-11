import * as monaco from 'monaco-editor';
import { type Component, createEffect, onCleanup, onMount } from 'solid-js';
import { type EOL, type Indent, type Lang, eolOptions } from './App.jsx';

type Props = {
  indent: Indent;
  eol: EOL;
  lang: Lang;
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
    });
  });

  createEffect(() => editor.updateOptions({ tabSize: props.indent }));
  createEffect(() => editor.getModel()?.setEOL(eolOptions[props.eol][1]));

  createEffect(() => {
    const model = editor.getModel();
    if (model != null) {
      monaco.editor.setModelLanguage(model, props.lang);
    }
  });

  onCleanup(() => editor.dispose());

  // biome-ignore lint/style/noNonNullAssertion: https://docs.solidjs.com/configuration/typescript#ref-attribute
  return <div class='editor' ref={editorRef!} />;
};

export default Editor;
