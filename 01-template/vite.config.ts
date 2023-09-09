import { PluginOption, defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: './src',
    build: {
        outDir: 'dist'
    },
    plugins: [
        handlebars()
    ]
})