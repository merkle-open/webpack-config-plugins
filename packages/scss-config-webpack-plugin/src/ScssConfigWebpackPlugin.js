// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	mode?: 'production' | 'development'
}} ScssConfigWebpackPluginOptions */

'use strict';
/**
 * @type {ScssConfigWebpackPluginOptions}
 */
const defaultOptions = {};
class ScssConfigWebpackPlugin {
	/**
	 * @param {Partial<ScssConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		this.options = Object.assign({}, defaultOptions, options);
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
		const config = isProductionLikeMode
			? require('../config/production.config')(this.options)
			: require('../config/development.config')(this.options);
		// Merge config
		config.plugins.forEach(plugin => plugin.apply(compiler));
		compiler.hooks.afterEnvironment.tap('ScssConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
	}
}

exports = module.exports = ScssConfigWebpackPlugin;
