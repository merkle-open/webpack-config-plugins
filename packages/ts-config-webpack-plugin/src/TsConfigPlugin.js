// @ts-check
/** @typedef {import("webpack/lib/Compilation.js")} WebpackCompilation */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {import("webpack/lib/Chunk.js")} WebpackChunk */
'use strict';

const os = require('os');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

class TsConfigPlugin {
	constructor(options = {}) {}

	getCacheLoader() {
		return {
			loader: require.resolve('cache-loader'),
			options: {
				cacheDirectory: path.resolve('node_modules/.cache-loader'),
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

	getTsLoader() {
		return {
			loader: require.resolve('ts-loader'),
			options: {
				/**
				 * Increase build speed by disabling typechecking for the
				 * main process and is required to be used with thread-loader
				 * @see https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js
				 */
				happyPackMode: true,
				transpileOnly: true, // TODO: set to false in prod
				experimentalWatchApi: true, // TODO: set to false in prod
			},
		};
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const opts = {
			prod: compiler.options.optimization.nodeEnv === 'production',
		};

		compiler.hooks.afterEnvironment.tap('TsConfigPlugin', () => {
			compiler.options.devtool = opts.prod ? 'source-map' : 'cheap-eval-source-map';

			compiler.options.resolve.extensions.concat(['.ts', '.tsx', '.d.ts']);

			compiler.options.module.rules.push({
				test: /.(tsx?|d.ts)$/, // ts, tsx, d.ts
				use: [this.getCacheLoader(), this.getThreadLoader(), this.getTsLoader()],
			});

			compiler.options.plugins.push(
				new ForkTsCheckerWebpackPlugin({
					async: false,
					checkSyntacticErrors: true,
				})
			);
		});
	}
}

exports = module.exports = TsConfigPlugin;
