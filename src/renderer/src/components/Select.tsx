import { Icon } from '@iconify-icon/solid';
import expandIcon from '@iconify-icons/material-symbols/expand-all';
import { type Component, Index, type JSX, Show } from 'solid-js';
import * as styles from './Select.css';

type Props<T> = {
  label?: string;
  size: 'small' | 'medium' | 'large';
  each: [T, string][];
  current: T;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
};

const Select: Component<Props<number | string>> = (props) => {
  return (
    <div class={styles.root}>
      <Show when={props.label != null}>
        <span>{props.label}</span>
      </Show>
      <select class={styles.inner[props.size]} onChange={props.onChange}>
        <Index each={props.each}>
          {(e) => (
            <option value={e()[0]} selected={e()[0] === props.current}>
              {e()[1]}
            </option>
          )}
        </Index>
      </select>
      <Icon class={styles.icon} icon={expandIcon} />
    </div>
  );
};

export default Select;
