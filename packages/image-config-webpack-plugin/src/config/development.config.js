/**
 * Common Development Config
 *
 * @param {import("../ImageConfigWebpackPlugin.js").ImageConfigWebpackPluginOptions} options
 * @returns {any}
 */
exports = module.exports = options => ({
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
