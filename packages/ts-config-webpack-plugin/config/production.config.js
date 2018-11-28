const os = require('os');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const cpus = os.cpus().length;

// we use <max> - 1 workers for tricore cpus and higher, one cpu will be preserved
const tsLoaderWorkers = cpus > 2 ? cpus - 1 : 1;

/**
 *
 * Common Production Config
 *
 * @param {import("../src/TsConfigWebpackPlugin.js").TsConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [
			{
				// .ts, .tsx, .d.ts
				test: /\.(tsx?|d.ts)$/,
				use: [
					{
						// enable file based cache
						loader: require.resolve('cache-loader'),
						options: {
							cacheDirectory: path.resolve(
								path.dirname(require.resolve('cache-loader')),
								'../.cache-loader'
							),
						},
					},
					{
						// run compilation threaded
						loader: require.resolve('thread-loader'),
						options: {
							// there should be 1 cpu for the fork-ts-checker-webpack-plugin
							workers: tsLoaderWorkers,
						},
					},
					{
						// main typescript compilation loader
						loader: require.resolve('ts-loader'),
						options: {
							/**
							 * Increase build speed by disabling typechecking for the
							 * main process and is required to be used with thread-loader
							 * @see https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js
							 * Requires to use the ForkTsCheckerWebpack Plugin
							 */
							happyPackMode: true,
							// Set the tsconfig.json path
							configFile: options.configFile,
						},
					},
				],
			},
		],
	},
	plugins: [
		// Webpack plugin that runs typescript type checker on a separate process.
		new ForkTsCheckerWebpackPlugin({
			// block webpack's emit to wait for type checker/linter and to add errors to the webpack's compilation
			// also required for the the overlay functionality of webpack-dev-server
			async: false,
			// checkSyntacticErrors is required as we use happyPackMode and the thread-loader to parallelise the builds
			checkSyntacticErrors: true,
			// Set the tsconfig.json path
			tsconfig: options.configFile,
		}),
	],
});
