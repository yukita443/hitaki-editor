import { style } from '@vanilla-extract/css';
import { vars } from '../index.css';

export const root = style({
  display: 'flex',
  gridRow: 2,
  padding: '0 10px',
  borderTop: `solid 1px ${vars.color.border}`,
  userSelect: 'none',
});

export const space = style({
  flexGrow: 1,
});
