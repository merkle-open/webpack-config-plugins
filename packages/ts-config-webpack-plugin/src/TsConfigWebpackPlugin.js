// @ts-check
/** @typedef {import("webpack/lib/Compiler")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	mode?: 'production' | 'development',
	configFile: string | undefined
}} TsConfigWebpackPluginOptions
 */

'use strict';
const tsconfig = require('tsconfig');
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
			? require('./config/production.config')(this.options)
			: require('./config/development.config')(this.options);
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
