const autoprefixer = require('autoprefixer');

/**
 * Common Development Config
 *
 * @param {Required<import("../src/ScssConfigWebpackPlugin.js").ScssConfigWebpackPluginOptions>} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [
			{
				test: /\.s?css$/,
				exclude: /\.module\.s?css$/,
				use: [
					{
						loader: require.resolve('style-loader'),
						options: {
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							importLoaders: 3,
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							plugins: (loader) => [
								require('postcss-flexbugs-fixes'),
								autoprefixer({
									// flexbox: "no-2009" will add prefixes only for final and IE versions of specification.
									// @see https://github.com/postcss/autoprefixer#disabling
									flexbox: 'no-2009',
								}),
								require('iconfont-webpack-plugin')({
									resolve: loader.resolve,
								}),
							],
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.module\.s?css$/,
				use: [
					{
						loader: require.resolve('style-loader'),
						options: {
							sourceMap: false,
						},
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: false,
							importLoaders: 3,
							modules: true,
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							plugins: (loader) => [
								require('postcss-flexbugs-fixes'),
								autoprefixer({
									// flexbox: "no-2009" will add prefixes only for final and IE versions of specification.
									// @see https://github.com/postcss/autoprefixer#disabling
									flexbox: 'no-2009',
								}),
								require('iconfont-webpack-plugin')({
									resolve: loader.resolve,
								}),
							],
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [],
});
