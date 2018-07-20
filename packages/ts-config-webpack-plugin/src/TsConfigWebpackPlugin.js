// @ts-check
/** @typedef {import("webpack/lib/Compiler")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	mode?: 'production' | 'development',
	configFile: string
}} TsConfigWebpackPluginOptions
 */

'use strict';
const os = require('os');
const path = require('path');
const tsconfig = require('tsconfig');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/**
 * Common Development Config
 *
 * @param {TsConfigWebpackPluginOptions} options
 * @returns {any}
 */
const developmentConfig = options => ({
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
							workers: os.cpus().length - 1,
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
							transpileOnly: true,
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

/**
 *
 * Common Production Config
 *
 * @param {TsConfigWebpackPluginOptions} options
 * @returns {any}
 */
const productionConfig = options => ({
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
							workers: os.cpus().length - 1,
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
							transpileOnly: true,
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
			// checkSyntacticErrors is required as we use happyPackMode and the thread-loader to parallelise the builds
			checkSyntacticErrors: true,
			// Set the tsconfig.json path
			tsconfig: options.configFile,
		}),
	],
});

class TsConfigWebpackPlugin {
	/**
	 * @param {Partial<TsConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		const defaults = {
			configFile: options.configFile || tsconfig.resolveSync(process.cwd()),
		};
		this.options = Object.assign(defaults, options);
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		// From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
		const isProductionLikeMode =
			this.options.mode !== undefined
				? this.options.mode === 'production'
				: compiler.options.mode === 'production' || !compiler.options.mode;

		// Get Typescript config
		const config = isProductionLikeMode
			? productionConfig(this.options)
			: developmentConfig(this.options);
		// Merge config
		config.plugins.forEach(plugin => plugin.apply(compiler));
		compiler.hooks.afterEnvironment.tap('TsConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
		// Prepend missing typescript file extensions
		const typescriptExtensions = ['.ts', '.tsx', '.d.ts'].filter(
			ext => !compiler.options.resolve.extensions.includes(ext)
		);
		compiler.options.resolve.extensions.unshift(...typescriptExtensions);
	}
}

exports = module.exports = TsConfigWebpackPlugin;
