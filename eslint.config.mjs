// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/html-self-closing': 'off',
      '@typescript-eslint/unified-signatures': 'off',
    },
    files: ['**/*.ts', '**/*.vue', '**/*.js', '**/*.css', '**/*.scss'],
  },
)
