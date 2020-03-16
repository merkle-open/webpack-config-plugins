// @ts-check
// webpack compiler options properties are marked as optional
// although most of them are not optional
// as a temporary work around this this is fixed with
// `import('ts-essentials').DeepRequired`
/** @typedef {import('ts-essentials').DeepRequired<import("webpack").Compiler>} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	 mode?: 'production' | 'development'
}} CommonConfigWebpackPluginOptions */

'use strict';
class CommonConfigWebpackPlugin {
	/**
	 * @param {Partial<CommonConfigWebpackPluginOptions>} options
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
		compiler.hooks.afterEnvironment.tap('CommonConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
	}
}

exports = module.exports = CommonConfigWebpackPlugin;
