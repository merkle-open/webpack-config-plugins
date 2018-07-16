// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {{ }} ScssConfigWebpackPluginOptions */
'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * Common Development Config
 *
 * @param {ScssConfigWebpackPluginOptions} options
 * @returns {any}
 */
const developmentConfig = options => ({
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

/**
 *
 * Common Production Config
 *
 * @param {ScssConfigWebpackPluginOptions} options
 * @returns {any}
 */
const productionConfig = options => ({
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

/**
 * @type {ScssConfigWebpackPluginOptions}
 */
const defaultOptions = {};

class ScssConfigWebpackPlugin {
	/**
	 * @param {Partial<ScssConfigWebpackPluginOptions>} options
	 */
	constructor(options = {}) {
		this.options = Object.assign({}, defaultOptions, options);
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		// From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
		const isProductionLikeMode =
			compiler.options.mode === 'production' || !compiler.options.mode;
		const config = isProductionLikeMode
			? productionConfig(this.options)
			: developmentConfig(this.options);
		// Merge config
		config.plugins.forEach(plugin => plugin.apply(compiler));
		compiler.hooks.afterEnvironment.tap('ScssConfigWebpackPlugin', () => {
			compiler.options.module.rules.push(config.module.rules[0]);
		});
	}
}

exports = module.exports = ScssConfigWebpackPlugin;
