import 'ress';
import './index.css';
import '@fontsource/noto-sans-jp/japanese-400.css';
import '@fontsource/dejavu-mono/400.css';
import { render } from 'solid-js/web';
import App from './App.jsx';

render(() => <App />, document.getElementById('root') as HTMLElement);
