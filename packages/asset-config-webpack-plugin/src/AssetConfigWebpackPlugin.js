// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	 mode?: 'production' | 'development'
}} AssetConfigWebpackPluginOptions */

'use strict';
class AssetConfigWebpackPlugin {
	/**
	 * @param {Partial<AssetConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		this.options = Object.assign({}, options);
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const config = require('../config/shared.config.js')(this.options);
		// Merge config
		config.plugins.forEach((plugin) => plugin.apply(compiler));
		compiler.hooks.afterEnvironment.tap('AssetConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
	}
}

exports = module.exports = AssetConfigWebpackPlugin;
