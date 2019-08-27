module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',

    rules: {
        indent: ['warn', 'tab'],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-console': 0
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
};
