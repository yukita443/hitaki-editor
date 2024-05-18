import { Icon } from '@iconify-icon/solid';
import expandIcon from '@iconify-icons/material-symbols/expand-all.js';
import { type Component, Index, type JSX } from 'solid-js';
import type { Theme } from '../../types/theme.js';
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
      <div class='select'>
        <select class='large' onChange={props.onLangChange}>
          <Index each={Object.entries(langOptions)}>
            {(e) => (
              <option value={e()[0]} selected={e()[0] === props.lang}>
                {e()[1]}
              </option>
            )}
          </Index>
        </select>
        <Icon class='select-icon' icon={expandIcon} />
      </div>
      <div class='select'>
        <select class='large' onChange={props.onThemeSourceChange}>
          <Index each={Object.entries(themeSourceOptions)}>
            {(e) => (
              <option value={e()[0]} selected={e()[0] === props.theme.source}>
                {e()[1]}
              </option>
            )}
          </Index>
        </select>
        <Icon class='select-icon' icon={expandIcon} />
      </div>
      <div class='space' />
      <div class='select'>
        Indent:
        <select class='small' onChange={props.onIndentChange}>
          <Index each={indentOptions}>
            {(e) => (
              <option value={e()} selected={e() === props.indent}>
                {e()}
              </option>
            )}
          </Index>
        </select>
        <Icon class='select-icon' icon={expandIcon} />
      </div>
      <div class='select'>
        <select class='large' onChange={props.onEncodingChange}>
          <Index each={Object.entries(encodingOptions)}>
            {(e) => (
              <option value={e()[0]} selected={e()[0] === props.encoding}>
                {e()[1]}
              </option>
            )}
          </Index>
        </select>
        <Icon class='select-icon' icon={expandIcon} />
      </div>
      <div class='select'>
        <select class='medium' onChange={props.onEOLChange}>
          <Index each={Object.entries(eolOptions)}>
            {(e) => (
              <option value={e()[0]} selected={e()[0] === props.eol}>
                {e()[1][0]}
              </option>
            )}
          </Index>
        </select>
        <Icon class='select-icon' icon={expandIcon} />
      </div>
    </div>
  );
};

export default StatusBar;
