module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 15,
        sourceType: 'module',
    },
    rules: {
        semi: 'error',
        quotes: ['error', 'single'],
    },
    globals: {
        ROOT: 'readonly',
        Header: 'readonly',
        Logo: 'readonly',
        Title: 'readonly',
        // добавить все необходимые глобальные переменные здесь
    },
};
