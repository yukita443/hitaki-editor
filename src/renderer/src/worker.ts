import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_id, label) {
    switch (label) {
      case 'html':
        return new htmlWorker();
      case 'css':
        return new cssWorker();
      case 'javascript':
      case 'typescript':
        return new tsWorker();
      case 'json':
        return new jsonWorker();
      default:
        return new editorWorker();
    }
  },
};
