import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
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
];
