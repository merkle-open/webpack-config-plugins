// @ts-check
/** @typedef {import("webpack/lib/Compilation.js")} WebpackCompilation */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {import("webpack/lib/Chunk.js")} WebpackChunk */
/** @typedef {{ }} ScssConfigWebpackPluginOptions */
'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const developmentConfig = () => ({
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{
						loader: require.resolve('style-loader'),
						options: {
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							importLoaders: 3,
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							plugins: loader => [
								require('autoprefixer'),
								require('iconfont-webpack-plugin')({
									resolve: loader.resolve,
								}),
							],
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [],
});

const productionConfig = () => ({
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							importLoaders: 3,
						},
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							plugins: loader => [
								require('autoprefixer'),
								require('iconfont-webpack-plugin')({
									resolve: loader.resolve,
								}),
							],
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCSSAssetsPlugin({}),
	],
});

class ScssConfigWebpackPlugin {
	/**
	 * @param {ScssConfigWebpackPluginOptions} options
	 */
	constructor(options = {}) {
		this.options = options;
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const isDevelopment = compiler.options.mode === 'development';

		const config = isDevelopment ? developmentConfig() : productionConfig();

		config.plugins.forEach(plugin => plugin.apply(compiler));

		compiler.hooks.afterEnvironment.tap('ScssConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(config.module.rules[0]);
		});
	}
}

exports = module.exports = ScssConfigWebpackPlugin;
