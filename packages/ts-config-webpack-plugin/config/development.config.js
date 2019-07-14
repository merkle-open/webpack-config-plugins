const os = require('os');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const cpus = os.cpus().length;

// we use <max> - 1 workers for tricore cpus and higher, one cpu will be preserved
const tsLoaderWorkers = cpus > 2 ? cpus - 1 : 1;

/**
 * Common Development Config
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
							experimentalWatchApi: true,
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
			// don't block webpack's emit to wait for type checker, errors only visible inside CLI
			async: true,
			// checkSyntacticErrors is required as we use happyPackMode and the thread-loader to parallelise the builds
			checkSyntacticErrors: true,
			// Set the tsconfig.json path
			tsconfig: options.configFile,
			// Make use of a new API comming with TypeScript 2.7
			// which allows to speed up the type checking
			// https://github.com/namics/webpack-config-plugins/issues/39
			useTypescriptIncrementalApi: true,
			// To allow using this plugin even if there is no .ts or .tsx file
			// ignore "TS18003: No inputs were found in config file"
			ignoreDiagnostics: [18003],
		}),
	],
});
