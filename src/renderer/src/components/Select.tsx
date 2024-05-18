import { Icon } from '@iconify-icon/solid';
import expandIcon from '@iconify-icons/material-symbols/expand-all.js';
import { type Component, Index, type JSX } from 'solid-js';

type Props<T> = {
  label?: string;
  size: 'small' | 'medium' | 'large';
  each: [T, string][];
  current: T;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
};

const Select: Component<Props<number | string>> = (props) => {
  return (
    <div class='select'>
      {props.label}
      <select class={props.size} onChange={props.onChange}>
        <Index each={props.each}>
          {(e) => (
            <option value={e()[0]} selected={e()[0] === props.current}>
              {e()[1]}
            </option>
          )}
        </Index>
      </select>
      <Icon class='select-icon' icon={expandIcon} />
    </div>
  );
};

export default Select;
