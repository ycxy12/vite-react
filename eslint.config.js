import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
	{ ignores: ["dist"] },
	{
		env: {
			browser: true, // 浏览器环境（支持浏览器相关的全局变量）
			node: true, // Node.js 环境（支持 Node.js 相关的全局变量）
			es2021: true, // 支持 ECMAScript 2021 语法
			// 如果是 React 环境也可以加入 react（例如，如果你用的是 SSR 或类似环境）
			"shared-node-browser": true,
		},
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		settings: { react: { version: "18.3" } },
		plugins: {
			react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...reactHooks.configs.recommended.rules,
			"react/jsx-no-target-blank": "off",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		},
	},
]
