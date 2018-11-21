/**
 * Common Development Config
 *
 * @param {import("../JsConfigWebpackPlugin.js").JsConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: [/[/\\\\]node_modules[/\\\\]/], // exclude node_modules folder per default
				use: [
					// run process in multiple threads
					{
						loader: require.resolve('thread-loader'),
						options: {
							// set timeout for killing the worker processes when idle
							// '2000' (ms) means to set the timeout to 2s
							// default for this property is '500' (ms)
							// https://github.com/webpack-contrib/thread-loader#examples
							poolTimeout: 2000,
						},
					},
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
