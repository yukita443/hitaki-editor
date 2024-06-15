import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [solid(), vanillaExtractPlugin()],
  },
});
