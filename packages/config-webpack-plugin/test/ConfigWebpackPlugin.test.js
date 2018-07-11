const ConfigWebpackPlugin = require('../src/ConfigWebpackPlugin');
const webpackExampleConfig = {
	dev: require('./fixtures/webpack.config.dev'),
	prod: require('./fixtures/webpack.config.prod'),
};

describe('ConfigWebpackPlugin', () => {
	it('should be creatable', () => {
		expect(new ConfigWebpackPlugin('Test')).toMatchSnapshot();
	});

	describe('run', () => {
		it('should be runnable with single env', resolve => {
			const plugin = new ConfigWebpackPlugin('TestRunSingle');
			plugin.attach(ConfigWebpackPlugin.HOOKS.DEV, resolve);
			plugin.runSingle(ConfigWebpackPlugin.HOOKS.DEV);
		});

		it('should be runnable with multiple envs', async () => {
			expect.assertions(2);

			let a, b;
			const plugin = new ConfigWebpackPlugin('TestRunMulti');

			plugin.attach(ConfigWebpackPlugin.HOOKS.DEV, () => (a = true));
			plugin.attach(ConfigWebpackPlugin.HOOKS.PROD, () => (b = true));
			plugin.run([ConfigWebpackPlugin.HOOKS.DEV, ConfigWebpackPlugin.HOOKS.PROD]);

			await expect(a).toBe(true);
			await expect(b).toBe(true);
		});

		it('should run the ALL hook in every env', async () => {
			expect.assertions(6);

			let a, b, c, d, e, f;
			const plugin = new ConfigWebpackPlugin('TestRunMultiA');

			plugin.attach(ConfigWebpackPlugin.HOOKS.ALL, () => (c = true));
			plugin.attach(ConfigWebpackPlugin.HOOKS.DEV, () => (a = true));
			plugin.attach(ConfigWebpackPlugin.HOOKS.PROD, () => (b = true));
			plugin.run([ConfigWebpackPlugin.HOOKS.DEV]);

			await expect(a).toBe(true); // dev hook
			await expect(b).toBe(undefined); // prod hook
			await expect(c).toBe(true); // shared hook

			plugin.clear();
			plugin.attach(ConfigWebpackPlugin.HOOKS.ALL, () => (f = true));
			plugin.attach(ConfigWebpackPlugin.HOOKS.PROD, () => (d = true));
			plugin.attach(ConfigWebpackPlugin.HOOKS.PROD, () => (e = true));
			plugin.run([ConfigWebpackPlugin.HOOKS.PROD]);

			await expect(d).toBe(true);
			await expect(e).toBe(true);
			await expect(f).toBe(true);
		});
	});

	describe('expose', () => {
		it('should expose without any hooks', () => {
			expect(new ConfigWebpackPlugin('TestExpose').expose()).toMatchSnapshot();
		});
	});
});
