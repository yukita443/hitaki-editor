import { style } from '@vanilla-extract/css';
import { vars } from '../index.css.js';

export const root = style({
  borderTop: `solid 1px ${vars.color.border}`,
  userSelect: 'none',

  padding: '0 10px',
  display: 'flex',
  gridRow: 2,
});

export const space = style({
  flexGrow: 1,
});
