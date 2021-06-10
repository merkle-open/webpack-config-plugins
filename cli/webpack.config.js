const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	target: 'node',
	entry: {
		main: './cli/generate-webpack-config.ts',
	},
	output: {
		filename: 'generate-webpack-config.js',
	},
	plugins: [
		// Add the hashbang
		// inorder to be executable
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true,
		}),
		// Multi threading typescript loader configuration with caching for .ts and .tsx files
		// see https://github.com/merkle-open/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
		new TsConfigWebpackPlugin(),
	],
};
