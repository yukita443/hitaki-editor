import { createVar, globalStyle } from '@vanilla-extract/css';

export const vars = {
  color: {
    text: createVar(),
    border: createVar(),
    background: createVar(),
    backgroundHover: createVar(),
  },
};

globalStyle(':root', {
  vars: {
    [vars.color.text]: 'black',
    [vars.color.border]: '#e6e6e6',
    [vars.color.background]: 'white',
    [vars.color.backgroundHover]: '#f1f1f1',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [vars.color.text]: '#f1f1f1',
        [vars.color.border]: '#373737',
        [vars.color.background]: '#1e1e1e',
        [vars.color.backgroundHover]: '#2f2f2f',
      },
    },
  },
});

globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
});
