const CpuProfilerWebpackPlugin = require('cpuprofile-webpack-plugin');
const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = {
	context: __dirname,
	plugins: [
		// File loader configuration for .gif .jpg .jpeg .png and .svg files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin/config
		new ImagesConfigWebpackPlugin(),
		// Multi threading typescript loader configuration with caching for .ts and .tsx files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
		new TsConfigWebpackPlugin(),
		// Profile performance
		new CpuProfilerWebpackPlugin(),
	],
};
