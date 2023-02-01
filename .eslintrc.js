/**
 * node_modules/react-scripts/config/webpack.config.js
 *    ...
 *    useEslintrc: false,
 *    ...
 *
 * meaning that this file is not going to be used for npm start/build.
 * It is currently used by Intellij IDEA only (Settings...).
 *
 * As of April 21, not sure we need to add devDependencies in package.json
 * as eslint and several plugins are required for Create React App and already
 * present as dependencies.
 *
 * Found some more info: https://create-react-app.dev/docs/setting-up-your-editor/
 *
 */
module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        project: "./tsconfig.json"
    },
    plugins: [
        "@typescript-eslint", "react-hooks"
    ],
    rules: {
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    overrides: [
        {
            "files": ["*.spec.ts"], // Or *.test.js
            "rules": {
                "eslint-disable": 0,
                "require-jsdoc": "off"
            }
        }
    ],
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    }
};
