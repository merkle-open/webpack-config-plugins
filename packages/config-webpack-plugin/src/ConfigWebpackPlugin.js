// @ts-check
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef { (compiler: WebpackCompiler, options: any) => any | never } ConfigWebpackPluginHook */
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
	 * tbd.
	 * @param {string} name
	 */
	constructor(name) {
		this.name = name;
		/** @type {ConfigWebpackPluginHook[]} */
		this._hooks = [];
	}

	/**
	 * Cleanup method
	 */
	clear() {
		this._hooks = [];
	}

	/**
	 * tbd.
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
	 * tbd.
	 * @param {ConfigWebpackPluginHookId[]} hookId
	 * @param {WebpackCompiler} compiler
	 * @param {any} [options]
	 */
	run(hookId, compiler, options) {
		return hookId
			.concat([HOOKS.ALL])
			.map(singleId => this.runSingle(singleId, compiler, options));
	}

	/**
	 * tbd.
	 * @param {ConfigWebpackPluginHookId} hookId
	 * @param {WebpackCompiler} compiler
	 * @param {any} [options]
	 */
	runSingle(hookId, compiler, options) {
		const hooksToRun = this._hooks[hookId] || [];

		if (hooksToRun.length === 0 && process.env.WEBPACK_CONFIG_PLUGIN) {
			console.warn(`No hooks for "${hookId}" found, did you forget to attach hooks?`);
		}

		return hooksToRun.map(hook => {
			hook(compiler, options);
		});
	}

	/**
	 * Exposes the plugin for the Webpack API
	 * @param {string} [tapableHook='afterEnvironment']		The hook to tap the plugin on
	 */
	expose(tapableHook = 'afterEnvironment') {
		const plugin = this;

		return class {
			/**
			 * Provide abstract options capability
			 * @param {Object.<string, any>} [options]
			 */
			constructor(options) {
				this.name = plugin.name;
				this.options = options;
				this._optionsSnapshot = null;
			}

			/**
			 * Main apply method, core of the plugin class
			 * @param {WebpackCompiler} compiler
			 */
			apply(compiler) {
				const tapableFn = compiler.hooks[tapableHook];
				this._optionsSnapshot = compiler.options;

				if (!tapableFn || typeof tapableFn.tap !== 'function') {
					throw new Error(
						`${plugin.name} taps on ${tapableHook}, but this is not a valid tapable.`
					);
				}

				compiler.hooks.afterEnvironment.tap(plugin.name, () => {
					plugin.run([compiler.options.mode], compiler, this.options);
				});
			}

			toString() {
				return `${plugin.name} { ... }`;
			}
		};
	}
}

module.exports = ConfigWebpackPlugin;
module.exports.HOOKS = HOOKS;
