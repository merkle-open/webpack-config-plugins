/**
 * Common Development Config
 *
 * @param {import("../src/FontConfigWebpackPlugin.js").FontConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [
			{
				test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: require.resolve('file-loader'),
						options: {
							name: options.name,
						},
					},
				],
			},
		],
	},
	plugins: [],
});
