module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    // Configuration modérée - Warnings au lieu d'erreurs pour faciliter la migration
    'no-console': 'warn', // Autoriser console.log en développement avec warning
    '@typescript-eslint/no-unused-vars': 'warn', // Variables non utilisées en warning
    'import/prefer-default-export': 'off', // Désactiver car nous utilisons des exports nommés
    
    // Règles de style Airbnb
    'quotes': ['error', 'single'], // Guillemets simples obligatoires
    'semi': ['error', 'always'], // Point-virgules obligatoires
    'indent': ['error', 2], // Indentation 2 espaces
    '@typescript-eslint/indent': ['error', 2], // Indentation TypeScript
    'comma-dangle': ['error', 'always-multiline'], // Virgule finale sur les objets multilignes
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    
    // Règles TypeScript spécifiques
    '@typescript-eslint/explicit-function-return-type': 'off', // Types de retour optionnels
    '@typescript-eslint/no-explicit-any': 'warn', // any en warning pour migration progressive
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/quotes': ['error', 'single'], // Guillemets simples TypeScript
    '@typescript-eslint/naming-convention': 'warn', // Convention de nommage en warning
    
    // Règles pour Express/Node.js
    'consistent-return': 'off', // Désactiver car Express middlewares n'ont pas toujours de return
    'no-param-reassign': ['error', { 'props': false }], // Autoriser modification des propriétés des paramètres
    
    // Règles d'import - Configuration plus permissive pour la migration
    'import/extensions': 'off', // Désactiver temporairement pour la migration
    'import/no-extraneous-dependencies': 'off', // Désactiver temporairement
    'import/order': 'warn', // Ordre des imports en warning
    'import/no-cycle': 'warn', // Cycles de dépendances en warning
    
    // Règles pour les fonctions async/await
    'no-await-in-loop': 'warn', // Warning car parfois nécessaire avec MongoDB
    'no-restricted-syntax': 'off', // Autoriser for...of et autres syntaxes modernes
    'no-restricted-globals': 'warn', // isNaN en warning pour migration progressive
    
    // Règles pour les objets et tableaux
    'object-curly-newline': ['error', { 'consistent': true }],
    'max-len': ['warn', { 'code': 120, 'ignoreComments': true }], // Ligne max 120 caractères
    
    // Règles spécifiques MongoDB/Mongoose
    'no-underscore-dangle': ['error', { 'allow': ['_id', '_doc'] }], // Autoriser _id MongoDB
    
    // Règles de formatage
    'eol-last': 'error', // Nouvelle ligne à la fin des fichiers
    'no-trailing-spaces': 'error', // Pas d'espaces en fin de ligne
    
    // Autres règles permissives pour la migration
    'no-useless-escape': 'warn', // Échappements inutiles en warning
    'no-useless-catch': 'warn', // Try/catch inutiles en warning
    'no-plusplus': 'off', // Autoriser ++ et --
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    // Configuration spécifique pour les fichiers de scripts/seed
    {
      files: ['src/scripts/**/*.ts'],
      rules: {
        'no-console': 'off', // Autoriser console.log dans les scripts
        'import/no-extraneous-dependencies': 'off',
      },
    },
    // Configuration spécifique pour les types et interfaces
    {
      files: ['src/types/**/*.ts', 'src/**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off', // Interfaces peuvent avoir des propriétés non utilisées
      },
    },
  ],
};