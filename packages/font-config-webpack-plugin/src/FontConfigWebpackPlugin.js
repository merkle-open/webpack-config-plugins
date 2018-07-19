// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	 mode?: 'production' | 'development'
	 format: string,
	 output: string
}} FontConfigWebpackPluginOptions */

'use strict';

/**
 * Common Development Config
 *
 * @param {FontConfigWebpackPluginOptions} options
 * @returns {any}
 */
const developmentConfig = options => ({
	module: {
		rules: [
			{
				test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: require.resolve('file-loader'),
						options: {
							name: options.format,
							outputPath: options.output,
						},
					},
				],
			},
		],
	},
	plugins: [],
});

/**
 * Common Production Config
 *
 * @param {FontConfigWebpackPluginOptions} options
 * @returns {any}
 */
const productionConfig = options => developmentConfig(options);

/**
 * @type {FontConfigWebpackPluginOptions}
 */
const defaultOptions = { format: '[name].[ext]', output: 'fonts/' };

class FontConfigWebpackPlugin {
	/**
	 * @param {Partial<FontConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		this.options = Object.assign({}, defaultOptions, options);
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		// From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
		const isProductionLikeMode = this.options.mode !== undefined
			? this.options.mode === 'production'
			: compiler.options.mode === 'production' || !compiler.options.mode;
		const config = isProductionLikeMode
			? productionConfig(this.options)
			: developmentConfig(this.options);
		// Merge config
		config.plugins.forEach(plugin => plugin.apply(compiler));
		compiler.hooks.afterEnvironment.tap('FontConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
	}
}

exports = module.exports = FontConfigWebpackPlugin;
