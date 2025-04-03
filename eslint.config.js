import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          quoteProps: 'consistent',
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],
    },
  },
  {
    files: ['*.tsx'],
    parserOptions: {
      project: './tsconfig.json',
    },
  },
]);
