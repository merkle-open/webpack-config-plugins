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
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 3,
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							postcssOptions: (loader) => {
								return {
									plugins: [
										require('iconfont-webpack-plugin')({
											resolve: loader.resolve,
										}),
										require('postcss-flexbugs-fixes'),
										require('autoprefixer')({
											// flexbox: "no-2009" will add prefixes only for final and IE versions of specification.
											// @see https://github.com/postcss/autoprefixer#disabling
											flexbox: 'no-2009',
										}),
									],
								};
							},
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							implementation: require('sass'),
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
							esModule: true,
							modules: {
								namedExport: true,
							},
						},
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 3,
							esModule: true,
							modules: {
								namedExport: true,
							},
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							postcssOptions: (loader) => {
								return {
									plugins: [
										require('iconfont-webpack-plugin')({
											resolve: loader.resolve,
										}),
										require('postcss-flexbugs-fixes'),
										require('autoprefixer')({
											// flexbox: "no-2009" will add prefixes only for final and IE versions of specification.
											// @see https://github.com/postcss/autoprefixer#disabling
											flexbox: 'no-2009',
										}),
									],
								};
							},
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							implementation: require('sass'),
						},
					},
				],
			},
		],
	},
	plugins: [],
});
