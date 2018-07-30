/**
 * Common Production Config
 *
 * @param {import("../FontConfigWebpackPlugin.js").FontConfigWebpackPluginOptions} options
 * @returns {any}
 */
exports = module.exports = options => require('./development.config')(options);
