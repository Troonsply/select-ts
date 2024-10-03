import { defineConfig } from 'vite';

export default defineConfig({
    base: '/select-ts/',
    build: {
        outDir: 'docs'  //для GitHub Pages
    }
});