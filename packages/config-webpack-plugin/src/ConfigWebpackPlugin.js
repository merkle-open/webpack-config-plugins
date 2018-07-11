// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef { (compiler: WebpackCompiler) => any } ConfigWebpackPluginHook */
/** @typedef { 'development' | 'production' | '*' } ConfigWebpackPluginHookId */
/** @typedef {{ [id: string]: ConfigWebpackPluginHookId }} ConfigWebpackPluginHookMap */

/** @type {ConfigWebpackPluginHookMap} */
const HOOKS = {
	ALL: '*',
	DEV: 'development',
	PROD: 'production',
};

/**
 * Unifies the config webpack plugins API to one class
 * @author Jan Biasi
 * @version 1.0
 */
class ConfigWebpackPlugin {
	/**
	 * @param {string} name
	 */
	constructor(name) {
		this.name = name;
		/** @type {ConfigWebpackPluginHook[]} */
		this._hooks = [];
	}

	clear() {
		this._hooks = [];
	}

	/**
	 *
	 * @param {ConfigWebpackPluginHookId} hook
	 * @param {ConfigWebpackPluginHook} handler
	 */
	attach(hook, handler) {
		if (!Array.isArray(this._hooks[hook])) {
			this._hooks[hook] = [];
		}

		this._hooks[hook].push(handler);
	}

	/**
	 *
	 * @param {ConfigWebpackPluginHookId[]} hookId
	 * @param {WebpackCompiler} compiler
	 */
	run(hookId, compiler) {
		return hookId.concat([HOOKS.ALL]).map(singleId => this.runSingle(singleId, compiler));
	}

	/**
	 *
	 * @param {ConfigWebpackPluginHookId} hookId
	 * @param {WebpackCompiler} compiler
	 */
	runSingle(hookId, compiler) {
		const hooksToRun = this._hooks[hookId] || [];

		if (hooksToRun.length === 0) {
			console.warn(`No hooks for "${hookId}" found, did you forget to attach hooks?`);
		}

		return hooksToRun.map(hook => {
			hook(compiler);
		});
	}

	/**
	 * Exposes the plugin for the Webpack API
	 */
	expose() {
		const plugin = this;

		return class {
			/**
			 * @param {WebpackCompiler} compiler
			 */
			apply(compiler) {
				compiler.hooks.afterEnvironment.tap(plugin.name, () => {
					plugin.run([compiler.options.mode], compiler);
				});
			}
		};
	}
}

module.exports = ConfigWebpackPlugin;
module.exports.HOOKS = HOOKS;
