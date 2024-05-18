import type { Component, JSX } from 'solid-js';
import type { Theme } from '../../../types/theme.js';
import {
  type EOL,
  type Encoding,
  type Indent,
  type Lang,
  encodingOptions,
  eolOptions,
  indentOptions,
  langOptions,
  themeSourceOptions,
} from './App.jsx';
import Select from './Select.jsx';

type Props = {
  indent: Indent;
  eol: EOL;
  lang: Lang;
  encoding: Encoding;
  theme: Theme;

  onIndentChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onEOLChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onLangChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onEncodingChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onThemeSourceChange: JSX.EventHandler<HTMLSelectElement, Event>;
};

const StatusBar: Component<Props> = (props) => {
  return (
    <div class='statusbar'>
      <Select
        size='large'
        each={Object.entries(langOptions)}
        current={props.lang}
        onChange={props.onLangChange}
      />
      <Select
        size='large'
        each={Object.entries(themeSourceOptions)}
        current={props.theme.source}
        onChange={props.onThemeSourceChange}
      />
      <div class='space' />
      <Select
        label='Indent:'
        size='small'
        each={indentOptions.map((i) => [i, i.toString()])}
        current={props.indent}
        onChange={props.onIndentChange}
      />
      <Select
        size='large'
        each={Object.entries(encodingOptions)}
        current={props.encoding}
        onChange={props.onEncodingChange}
      />
      <Select
        size='medium'
        each={Object.entries(eolOptions)}
        current={props.eol}
        onChange={props.onEOLChange}
      />
    </div>
  );
};

export default StatusBar;
