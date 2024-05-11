import * as monaco from 'monaco-editor';
import { type Component, onCleanup, onMount } from 'solid-js';

const Editor: Component = () => {
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

  onCleanup(() => editor.dispose());

  // biome-ignore lint/style/noNonNullAssertion: https://docs.solidjs.com/configuration/typescript#ref-attribute
  return <div class='editor' ref={editorRef!} />;
};

export default Editor;
