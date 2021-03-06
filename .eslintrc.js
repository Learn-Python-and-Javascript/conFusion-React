module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks'
	],
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 6,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'settings': {
		'react': {
			'version': 'detect'
		}
	},
	'rules': {
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
		'react/jsx-indent': [
			'error',
			'tab'
		],
		'react/jsx-pascal-case': 0,
		'react/destructuring-assignment': 0,
		'no-underscore-dangle': 0,
		'indent': [
			'error',
			'tab'
		],
		'no-tabs': 0,
		'react/jsx-indent-props': 0,
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/prop-types': 0
	}
}
