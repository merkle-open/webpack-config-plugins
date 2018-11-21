const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const TSConfigWebpackPlugin = require('ts-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const JSConfigWebpackPlugin = require('js-config-webpack-plugin');
/**
 * Shared Common Config
 *
 * @param {import("../src/CommonConfigWebpackPlugin.js").CommonConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [],
	},
	plugins: [
		new AssetConfigWebpackPlugin({ mode: options.mode }),
		new ScssConfigWebpackPlugin({ mode: options.mode }),
		new TSConfigWebpackPlugin({ mode: options.mode }),
		new JSConfigWebpackPlugin({ mode: options.mode }),
	],
});
