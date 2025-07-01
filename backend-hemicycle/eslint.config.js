import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...js.configs.recommended.rules,
      
      // Critical errors - Variables and scope
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
      
      // TypeScript - Critical errors only (permissive)
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      
      // Syntax and logic errors
      'no-constant-condition': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-extra-boolean-cast': 'error',
      'no-func-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-sparse-arrays': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      
      // Basic security errors
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      
      // Async/await - Critical errors
      'no-async-promise-executor': 'error',
      
      // Disable style rules (permissive)
      'prefer-const': 'off',
      'no-var': 'off',
      'object-shorthand': 'off',
      'prefer-arrow-callback': 'off',
      'prefer-template': 'off',
      'quote-props': 'off',
      'quotes': 'off',
      'semi': 'off',
      'comma-dangle': 'off',
      'indent': 'off',
      'no-trailing-spaces': 'off',
      'eol-last': 'off'
    }
  },
  {
    ignores: [
      'dist/',
      'build/',
      'coverage/',
      'node_modules/',
      '.env',
      '.env.*',
      '!.env.example',
      '*.log',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      '.tmp/',
      '.cache/',
      '.vscode/',
      '.idea/',
      '.DS_Store',
      'Thumbs.db',
      '__tests__/',
      '*.test.ts',
      '*.spec.ts',
      '*.md',
      'docs/'
    ]
  }
];