// @ts-check
/** @typedef {{ mode?: string, entry?: string, plugins?: Array }} WebpackContextSettings */

const path = require('path');
const webpack = require('webpack');

const runWithinWebpackContext = (callback, settings = {}) => {
	/**
	 * FIXME: ts-check does not recognize correct webpack.Stats type
	 * @param {Function} callback
	 */
	const createResolver = callback => (_, stats) => {
		callback({
			_,
			stats,
			options: stats.compilation.options,
			errors: stats.compilation.errors,
		});
	};

	/** @type {any} */
	const config = {
		mode: settings.mode || 'development',
		entry: settings.entry || path.resolve(process.cwd(), 'index.js'),
		output: {
			path: path.resolve(process.cwd(), 'test/fixtures/dist'),
			filename: 'bundle.js',
			libraryTarget: 'umd',
		},
		resolve: {
			extensions: [],
		},
		module: {
			rules: [],
		},
		plugins: settings.plugins || [],
	};

	try {
		webpack(config).run(createResolver(callback));
	} catch (err) {
		throw new Error(`runWithinWebpackContext: ${err.message}`);
	}
};

module.exports = runWithinWebpackContext;
