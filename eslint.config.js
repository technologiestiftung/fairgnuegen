import globals from "globals";
import technologiestiftung from "@technologiestiftung/eslint-config";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

export default [
	...technologiestiftung,
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		plugins: {
			react,
			import: importPlugin,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.app.json",
				},
			},
		},
		rules: {
			// suppress errors for missing 'import React' in files
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowShortCircuit: true,
				},
			],
			"import/extensions": [
				"error",
				"ignorePackages",
				{
					js: "never",
					mjs: "never",
					cjs: "never",
					ts: "never",
					tsx: "never",
					jsx: "never",
				},
			],
		},
	},
];
