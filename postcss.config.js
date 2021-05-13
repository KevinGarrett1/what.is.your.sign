/* eslint-disable global-require */
const tailWindCss = require('tailwindcss');

module.exports = {
	plugins: [
		tailWindCss('./tailwind.js'),
		require('autoprefixer'),

		require('postcss-preset-env')({
			features: {
				'focus-within-pseudo-class': false,
			},
			stage: 1,
		}),
		require('cssnano'),
		require('postcss-import'),
	],
};
