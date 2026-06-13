import { defineConfig } from 'vite';

export default defineConfig({
  // Set this to your subdirectory if deploying to e.g. yourname.github.io/portfolio
  // base set to repo name for GitHub Pages
  base: 'VanshShah-Portfolio',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
