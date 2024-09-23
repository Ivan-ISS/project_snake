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
        LocalSrorageUtil: 'readonly',
        randomWithСheck: 'readonly',
        Button: 'readonly',
        Header: 'readonly',
        Logo: 'readonly',
        Title: 'readonly',
        Main: 'readonly',
        Config: 'readonly',
        Resources: 'readonly',
        Field: 'readonly',
        Score: 'readonly',
        Snake: 'readonly',
        Food: 'readonly',
        SnakeGame: 'readonly',
        // добавить все необходимые глобальные переменные здесь
    },
};
