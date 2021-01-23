module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: ['plugin:vue/recommended', '@vue/airbnb'],
    settings: {
        'import/resolver': {
            webpack: {
                config: 'node_modules/@vue/cli-service/webpack.config.js',
            },
        },
    },
    rules: {
        'vue/no-v-html': 'off',
        'vue/html-indent': [2, 4],
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'generator-star-spacing': 'off',
        'import/no-extraneous-dependencies': 0,
        'consistent-return': 0,
        'no-param-reassign': 0,
        'no-plusplus': 0,
        'no-console': 0,
        'no-debugger': 0,
        quotes: ['error', 'single'],
        'jsx-quotes': [2, 'prefer-single'],
        'max-len': ['error', { code: 200 }],
        indent: ['error', 4, { SwitchCase: 1 }],
        'import/extensions': ['error', 'always', { js: 'never', vue: 'never' }],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
