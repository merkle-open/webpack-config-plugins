/**
 * Common Production Config
 *
 * @param {FontConfigWebpackPluginOptions} options
 * @returns {any}
 */
exports = module.exports = options => require('./development.config')(options);
