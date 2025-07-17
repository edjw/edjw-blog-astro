import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        ignores: [
            'node_modules/',
            'dist/',
            '.astro/',
            '*.d.ts',
        ],
    },
    js.configs.recommended,
    // Use Astro's jsx-a11y config instead of the regular one
    ...eslintPluginAstro.configs['jsx-a11y-recommended'],
    ...tseslint.configs.recommended,
    // Put Astro config after TypeScript to ensure proper overrides
    ...eslintPluginAstro.configs.recommended,
    prettier,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2022,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            'jsx-a11y': jsxA11y,
        },
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_'
            }],
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
];