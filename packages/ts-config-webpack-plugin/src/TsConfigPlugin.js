// @ts-check
/** @typedef {import("webpack/lib/Compilation.js")} WebpackCompilation */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {import("webpack/lib/Chunk.js")} WebpackChunk */
/** @typedef {{ }} TsConfigPluginOptions */
'use strict';

const os = require('os');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

class TsConfigPlugin {
	/**
	 * @param {TsConfigPluginOptions} options
	 */
	constructor(options = {}) {
		this.options = options;
	}

	getCacheLoader() {
		return {
			loader: require.resolve('cache-loader'),
			options: {
				cacheDirectory: path.resolve(
					path.dirname(require.resolve('cache-loader')),
					'../.cache-loader'
				),
			},
		};
	}

	getThreadLoader() {
		return {
			loader: require.resolve('thread-loader'),
			options: {
				// there should be 1 cpu for the fork-ts-checker-webpack-plugin
				workers: os.cpus().length - 1,
			},
		};
	}

	/**
	 * @param {boolean} increaseSpeed
	 */
	getTsLoader(increaseSpeed = true) {
		return {
			loader: require.resolve('ts-loader'),
			options: {
				/**
				 * Increase build speed by disabling typechecking for the
				 * main process and is required to be used with thread-loader
				 * @see https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js
				 */
				happyPackMode: true,
				transpileOnly: increaseSpeed,
				experimentalWatchApi: increaseSpeed,
			},
		};
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const devtools = compiler.options.optimization.nodeEnv === 'development';

		[
			new ForkTsCheckerWebpackPlugin({
				async: false,
				checkSyntacticErrors: true,
			}),
		].forEach(plugin => plugin.apply(compiler));

		compiler.hooks.afterEnvironment.tap('TsConfigPlugin', () => {
			compiler.options.devtool = devtools ? 'source-map' : 'inline-source-map';

			if (devtools) {
				compiler.options.optimization.removeAvailableModules = false;
				compiler.options.optimization.removeEmptyChunks = false;
				compiler.options.optimization.splitChunks = false;
			}

			compiler.options.resolve.extensions.push('.ts', '.tsx', '.d.ts');

			compiler.options.module.rules.push({
				test: /.(tsx?|d.ts)$/, // ts, tsx, d.ts
				use: [
					// enable cache for all inputs
					this.getCacheLoader(),
					// run compilation threaded
					this.getThreadLoader(),
					// main typescript compilation process
					this.getTsLoader(devtools),
				],
			});
		});
	}
}

exports = module.exports = TsConfigPlugin;
