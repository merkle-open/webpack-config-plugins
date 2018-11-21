const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');
/**
 * Shared Asset Config
 *
 * @param {import("../src/AssetConfigWebpackPlugin.js").AssetConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [],
	},
	plugins: [
		new FontConfigWebpackPlugin({ mode: options.mode }),
		new ImageConfigWebpackPlugin({ mode: options.mode }),
	],
});
