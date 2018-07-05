// @ts-check
/** @typedef {import("webpack/lib/Compilation.js")} WebpackCompilation */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {import("webpack/lib/Chunk.js")} WebpackChunk */
/** @typedef {{ }} ScssConfigWebpackPluginOptions */
'use strict';

class ScssConfigWebpackPlugin {
	/**
	 * @param {ScssConfigWebpackPluginOptions} options
	 */
	constructor(options = {}) {
		this.options = options;
	}

	/**
	 * Returns the style loader.
	 */
	getStyleLoader() {
		return {
			loader: require.resolve('style-loader'),
			options: {
				sourceMap: true,
			},
		};
	}

	/**
	 * Returns the CSS Loader.
	 */
	getCssLoader() {
		return {
			loader: require.resolve('css-loader'),
			options: {
				sourceMap: true,
				importLoaders: 3,
			},
		};
	}

	/**
	 * Returns the CSS Loader.
	 */
	getPostCssLoader() {
		return {
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
		};
	}

	/**
	 * Returns the Url Loader.
	 */
	getUrlLoader() {
		return {
			loader: require.resolve('resolve-url-loader'),
		};
	}

	/**
	 * Returns the SASS Loader.
	 */
	getSassLoader() {
		return {
			loader: require.resolve('sass-loader'),
			options: {
				sourceMap: true,
			},
		};
	}

	/**
	 * @param {WebpackCompiler} compiler
	 */
	apply(compiler) {
		const devtools = compiler.options.optimization.nodeEnv === 'development';

		compiler.hooks.afterEnvironment.tap('ScssConfigWebpackPlugin', () => {
			//compiler.options.devtool = devtools ? 'source-map' : 'inline-source-map';

			compiler.options.resolve.extensions.push('.scss');

			compiler.options.module.rules.push({
				test: /\.scss$/, // scss
				use: [
					// Inject CSS with <style> tags.
					this.getStyleLoader(),
					// Resolve @import and url inside CSS
					this.getCssLoader(),
					// Autoprefix and transpile CSS
					this.getPostCssLoader(),
					// Load files inside url()
					this.getUrlLoader(),
					// Compiles SASS to CSS
					this.getSassLoader(),
				],
			});
		});
	}
}

exports = module.exports = ScssConfigWebpackPlugin;
