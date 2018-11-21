// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	mode?: 'production' | 'development',
	configFile: string
}} TsConfigWebpackPluginOptions
 */

'use strict';
const tsconfig = require('tsconfig');
const path = require('path');

class TsConfigWebpackPlugin {
	/**
	 * @param {Partial<TsConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		this.options = options;
	}

	/**
	 * Search for a tsconfig file
	 * @param {string} contextPath
	 * @returns {string}
	 */
	resolveTsConfigFilePath(contextPath) {
		// Try to locate a tsconfig relative to the cwd
		const resolvedFile = tsconfig.resolveSync(contextPath);
		if (resolvedFile) {
			return resolvedFile;
		}
		// If no tsconfig can be found fallback to the tsconfig.base.json
		// Based on ts-loaders default tsconfig.json: https://github.com/TypeStrong/ts-loader/blob/002c0f651cf1a8e27b0e232b7fe4a982ddce6323/src/compilerSetup.ts#L57
		console.warn(
			"Couldn't find a tsconfig.json in the current working directory.\nYou can either set the configFile path explicitly or create a new config:\n  npx tsc --init"
		);
		return path.resolve(__dirname, '../config/tsconfig.base.json');
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const defaultOptions = {
			configFile: this.options.configFile || this.resolveTsConfigFilePath(compiler.context),
		};
		const options = Object.assign({}, defaultOptions, this.options);
		// From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
		const isProductionLikeMode =
			options.mode !== undefined
				? options.mode === 'production'
				: compiler.options.mode === 'production' || !compiler.options.mode;

		// Get Typescript config
		const config = isProductionLikeMode
			? require('../config/production.config')(options)
			: require('../config/development.config')(options);
		// Merge config
		compiler.options.plugins.push(...config.plugins);
		compiler.hooks.afterEnvironment.tap('TsConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
		// Prepend missing typescript file extensions (high priority)
		const typescriptPreExtensions = ['.ts', '.tsx'].filter(
			(ext) => !compiler.options.resolve.extensions.includes(ext)
		);
		compiler.options.resolve.extensions.unshift(...typescriptPreExtensions);
		// Append missing definition type extensions (low priority)
		const typescriptPostExtensions = ['.d.ts'].filter((ext) => !compiler.options.resolve.extensions.includes(ext));
		compiler.options.resolve.extensions.push(...typescriptPostExtensions);
	}
}

exports = module.exports = TsConfigWebpackPlugin;
