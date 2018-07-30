const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
/**
 * Shared Asset Config
 *
 * @param {import("../AssetConfigWebpackPlugin.js").AssetConfigWebpackPluginOptions} options
 * @returns {any}
 */
exports = module.exports = options => ({
	module: {
		rules: [],
	},
	plugins: [new FontConfigWebpackPlugin({ mode: options.mode })],
});
