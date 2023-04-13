module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      tsx: true,
    },
  },
  ignorePatterns: ['src/components/editor/plugins/*'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/no-relative-parent-imports': 'error',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-floating-promises': [0],
    '@typescript-eslint/no-misused-promises': [0],
    'object-curly-newline': [0],
    'react/jsx-no-useless-fragment': [0],
    'import/no-extraneous-dependencies': [0],
    'react/require-default-props': [0],
    'react/jsx-wrap-multilines': [0],
    'implicit-arrow-linebreak': [0],
    'operator-linebreak': [0],
    'no-confusing-arrow': [0],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-curly-newline': [0],
    'no-underscore-dangle': [0],
    '@typescript-eslint/lines-between-class-members': [0],
    '@typescript-eslint/indent': [0],
    'function-paren-newline': [0],
    'arrow-parens': [0],
  },
};
