const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = {
	mode: 'production',
	target: 'node',
	output: {
		filename: 'generate-webpack-config.js',
	},
	plugins: [
		// Multi threading typescript loader configuration with caching for .ts and .tsx files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
		new TsConfigWebpackPlugin(),
	],
};
