/**
 * Common Development Config
 *
 * @param {import("../src/ImageConfigWebpackPlugin.js").ImageConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => ({
	module: {
		rules: [
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
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
