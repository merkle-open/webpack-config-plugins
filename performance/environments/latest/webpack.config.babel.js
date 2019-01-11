const CpuProfilerWebpackPlugin = require('cpuprofile-webpack-plugin');
const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin');
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');

module.exports = {
	context: __dirname,
	plugins: [
		// File loader configuration for .gif .jpg .jpeg .png and .svg files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin/config
		new ImagesConfigWebpackPlugin(),
		// Multi threading babel loader configuration with caching for .js and .jsx files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin/config
		new JsConfigWebpackPlugin(),
		// Profile performance
		new CpuProfilerWebpackPlugin(),
	],
};
