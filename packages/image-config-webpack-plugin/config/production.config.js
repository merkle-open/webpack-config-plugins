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
						loader: require.resolve('url-loader'),
						options: {
							name: options.name,
							limit: 512,
						},
					},
				],
			},
		],
	},
	plugins: [],
});
