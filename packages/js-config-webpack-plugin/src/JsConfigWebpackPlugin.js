// @ts-check
/** @typedef {import("webpack/lib/Compiler")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	mode?: 'production' | 'development',
	babelConfigFile?: string,
}} JsConfigWebpackPluginOptions
 */

'use strict';
const path = require('path');
const findPackageData = require('@babel/core/lib/config/files/package').findPackageData;
const findRelativeConfig = require('@babel/core/lib/config/files/configuration').findRelativeConfig;
const findRootConfig = require('@babel/core/lib/config/files/configuration').findRootConfig;

class JsConfigWebpackPlugin {
	/**
	 * @param {Partial<JsConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		this.options = options;
	}

	/**
	 * Search for a .bablerc file
	 * @param {string} contextPath
	 * @param {string} environmentName
	 * @returns {string}
	 */
	resolveBabelConfigFilePath(contextPath, environmentName) {
		// From https://github.com/babel/babel/blob/52a569056c6008c453bf26219461655c7d0322c4/packages/babel-core/src/config/files/package.js#L15
		const packageData = findPackageData(contextPath);
		// needed because babels `findRelativeConfig` search just in parent directories
		packageData.directories.push(packageData.filepath);
		// From https://github.com/babel/babel/blob/52a569056c6008c453bf26219461655c7d0322c4/packages/babel-core/src/config/files/configuration.js#L26
		const resolvedRelativeConfig = findRelativeConfig(packageData, environmentName);
		const resolvedRootConfig = findRootConfig(packageData.filepath, environmentName);

		// babel.config.js
		if (resolvedRootConfig && resolvedRootConfig.filepath) {
			return resolvedRootConfig.filepath;
		}

		// .babelrc.js and .babelrc
		if (resolvedRelativeConfig && resolvedRelativeConfig.config) {
			return resolvedRelativeConfig.config.filepath;
		}

		console.warn(
			`Couldn't find an appropriate babel configuration file in the current directory.
			Please check if the name of the file is correct and if it's in the correct directory.
			For further information please check the documentation: https://babeljs.io/docs/en/babelrc.html`
		);

		return path.resolve(__dirname, '../config/.babelrc.base.json');
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const defaultOptions = {
			babelConfigFile:
				this.options.babelConfigFile ||
				this.resolveBabelConfigFilePath(compiler.context, compiler.options.mode || this.options.mode),
		};

		const options = Object.assign(this.options, defaultOptions);

		// From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
		const isProductionLikeMode =
			this.options.mode !== undefined
				? this.options.mode === 'production'
				: compiler.options.mode === 'production' || !compiler.options.mode;

		const config = isProductionLikeMode
			? require('../config/production.config')(options)
			: require('../config/development.config')(options);

		config.plugins.forEach((plugin) => plugin.apply(compiler));
		compiler.hooks.afterEnvironment.tap('JsConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});

		const javascriptExtensions = ['.js', '.jsx', '.mjs'].filter(
			(ext) => !compiler.options.resolve.extensions.includes(ext)
		);

		compiler.options.resolve.extensions.unshift(...javascriptExtensions);
	}
}

exports = module.exports = JsConfigWebpackPlugin;
