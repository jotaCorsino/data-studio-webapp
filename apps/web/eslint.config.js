import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'coverage'],
  },
  {
    files: ['**/*.js'],
    rules: js.configs.recommended.rules,
  },
  ...tseslint.configs.recommended,
);
