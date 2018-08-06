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
