const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const safeParser = require('postcss-safe-parser');

/**
 *
 * Common Production Config
 *
 * @param {import("../src/ScssConfigWebpackPlugin.js").ScssConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = options => ({
	module: {
		rules: [
			{
				test: /\.s?css$/,
				exclude: /\.module\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
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
							plugins: loader => [
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
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							importLoaders: 3,
							modules: true,
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							plugins: loader => [
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
	plugins: [
		// Extract css to a custom file
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
			chunkFilename: '[id].css',
		}),
		// Minify css - but use only safe css-nano transformations
		// https://github.com/facebook/create-react-app/pull/4706
		new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { parser: safeParser, safe: true } }),
	],
});
