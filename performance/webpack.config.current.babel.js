const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin-current');
const JsConfigWebpackPlugin = require('js-config-webpack-plugin-current');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin-current');

module.exports = {
	plugins: [
		// File loader configuration for .gif .jpg .jpeg .png and .svg files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin/config
		new ImagesConfigWebpackPlugin(),
		// Multi threading babel loader configuration with caching for .js and .jsx files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin/config
		new JsConfigWebpackPlugin(),
		// SCSS Configuration for .css .module.css and .scss .module.scss files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
		new ScssConfigWebpackPlugin(),
	],
};
