import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                IconsResolver({
                    prefix: 'Icon',
                    enabledCollections: ['lucide'],
                }),
            ],
        }),
        Icons({
            scale: 1,
            defaultClass: 'icon',
            defaultStyle: '',
        }),
    ],
})
