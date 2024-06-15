import 'ress';
import './index.css.js';
import './worker.js';
import { render } from 'solid-js/web';
import App from './components/App.jsx';

render(() => <App />, document.getElementById('root') as HTMLElement);
