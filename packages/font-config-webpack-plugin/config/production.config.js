/**
 * Common Production Config
 *
 * @param {import("../src/FontConfigWebpackPlugin.js").FontConfigWebpackPluginOptions} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = (options) => require('./development.config')(options);
