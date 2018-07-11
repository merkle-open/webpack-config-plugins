const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: ['./src/index'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.prod.js',
	},
	optimize: {
		minimize: true,
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.min.html',
		}),
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
			},
		],
	},
};
