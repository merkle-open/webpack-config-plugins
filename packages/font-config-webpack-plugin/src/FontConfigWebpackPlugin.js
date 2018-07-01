// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {{ format: string, output: string }} FontConfigWebpackPluginOptions */
'use strict';

const path = require('path');

class FontConfigWebpackPlugin {
	/**
	 * @param {FontConfigWebpackPluginOptions} options
	 */
	constructor(options = { format: '[name].[ext]', output: 'fonts/' }) {
		this.options = options;
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		compiler.hooks.afterEnvironment.tap('FontConfigWebpackPlugin', () => {
			compiler.options.resolve.extensions.push('woff', 'woff2', 'ttf', 'eot', 'svg');

			compiler.options.module.rules.push({
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: require.resolve('cache-loader'),
						options: {
							cacheDirectory: path.resolve(
								path.dirname(require.resolve('cache-loader')),
								'../.cache-loader'
							),
						},
					},
					{
						loader: require.resolve('file-loader'),
						options: {
							name: this.options.format,
							outputPath: this.options.output,
						},
					},
				],
			});
		});
	}
}

exports = module.exports = FontConfigWebpackPlugin;
