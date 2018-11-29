// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{
	mode?: 'production' | 'development',
	filename?: string;
	chunkFilename?: string;
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

		// Use compiler.options.output configuration also for css
		// Replace folder names called js and extends called js to css
		// E.g. 'js/x.[id].js' -> 'css/x.[id].css'
		const filename = compiler.options.output.filename.replace(/(^|\/|\\|\.)js($|\/|\\)/g, '$1css$2');
		const chunkFilename = compiler.options.output.chunkFilename.replace(/(^|\/|\\|\.)js($|\/|\\)/g, '$1css$2');

		const config = isProductionLikeMode
			? require('../config/production.config')(
					Object.assign({ filename, chunkFilename, mode: 'production' }, this.options)
			  )
			: require('../config/development.config')(
					Object.assign({ filename, chunkFilename, mode: 'development' }, this.options)
			  );
		// Merge config
		compiler.options.plugins.push(...config.plugins);
		compiler.hooks.afterEnvironment.tap('ScssConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(...config.module.rules);
		});
	}
}

exports = module.exports = ScssConfigWebpackPlugin;
