/**
 * Common Development Config
 *
 * @param {import("../FontConfigWebpackPlugin.js").FontConfigWebpackPluginOptions} options
 * @returns {any}
 */
exports = module.exports = options => ({
	module: {
		rules: [
			{
				test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: require.resolve('file-loader'),
						options: {
							name: options.format,
							outputPath: options.output,
						},
					},
				],
			},
		],
	},
	plugins: [],
});
