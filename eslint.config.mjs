import { globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginPlaywright from 'eslint-plugin-playwright'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/test-results/**', '**/playwright-report/**']),

  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}']
  },

  skipFormatting,

  {
    name: 'app/rules',
    rules: {
      // コンポーネント名は Index.vue や Button.vue のような1単語の命名を採用しているため
      'vue/multi-word-component-names': 'off'
    }
  }
)
