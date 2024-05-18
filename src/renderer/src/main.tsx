import 'ress';
import '@fontsource/noto-sans-jp/japanese-400.css';
import '@fontsource/dejavu-mono/400.css';
import './index.css';
import './worker.ts';
import { render } from 'solid-js/web';
import App from './components/App.jsx';

render(() => <App />, document.getElementById('root') as HTMLElement);
