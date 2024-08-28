import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../index.css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',

  selectors: {
    '& + &': {
      borderLeft: `solid 1px ${vars.color.border}`,
    },
  },
});

const innerBase = style({
  height: '100%',
  paddingLeft: 6,
  color: 'inherit',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.backgroundHover,
    },
  },
});

export const inner = styleVariants({
  small: [innerBase, { width: 30 }],
  medium: [innerBase, { width: 60 }],
  large: [innerBase, { width: 95 }],
});

export const icon = style({
  position: 'absolute',
  right: 2,
  fontSize: 14,
  pointerEvents: 'none',
});
