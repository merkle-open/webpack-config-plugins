const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const EmptyPlugin = { apply: () => {} };

module.exports = (_, { mode }) => ({
	output: {
		filename: 'js/[name]-[hash].bundle.js',
		chunkFilename: 'js/async/[name]-[id]-[chunkhash].bundle.js',
	},
	plugins: [
		// Cleans the dist folder before the build starts
		new CleanWebpackPlugin(['dist']),
		// Generate a base html file and injects all generated css and js files
		new HtmlWebpackPlugin({ template: 'src/index.html' }),
		// Multi threading typescript loader configuration with caching for .ts and .tsx files
		// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
		new TsConfigWebpackPlugin(),
		// Offline Caching
		mode === 'production'
			? new OfflinePlugin({
					externals: [
						'https://raw.githubusercontent.com/namics/webpack-config-plugins/master/logo.png',
						'https://raw.githubusercontent.com/namics/webpack-config-plugins/master/plug.png',
					],
			  })
			: EmptyPlugin,
		new HtmlWebpackPlugin({ template: 'CNAME', inject: false, filename: 'CNAME' }),
	],
});
