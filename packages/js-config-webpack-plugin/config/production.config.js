/**

 * Common Production Config
 *
 * @param {import("../JsConfigWebpackPlugin.js").JsConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)>, optimization: { minimizer: Array<(new (): any)>} }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: [/[/\\\\]node_modules[/\\\\]/], // exclude node_modules folder per default
				use: [
					// run process in multiple threads
					require.resolve('thread-loader'),
					{
						loader: require.resolve('babel-loader'),
						options: {
							extends: options.babelConfigFile,
							// cache builds, future builds attempt to read from cache to avoid needing to run expensive babel processings
							cacheDirectory: true,
							// do not include superfluous whitespace characters and line terminators
							// https://babeljs.io/docs/en/babel-core/#options
							compact: true,
						},
					},
				],
			},
		],
	},
	plugins: [],
});
