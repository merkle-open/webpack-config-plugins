const path = require('path');
const rimraf = require('rimraf');
const fs = require('fs');
const webpack = require('webpack');
const ScssConfigWebpackPlugin = require('../src/ScssConfigWebpackPlugin');

// declare global test timeout to 10s for async tests
jest.setTimeout(20 * 1000);

const runWithinWebpackContext = (callback, settings = {}) => {
	webpack({
		mode: settings.mode || 'development',
		entry: path.resolve(__dirname, 'fixtures/index.js'),
		target: 'node',
		node: {
			global: false,
		},
		output: {
			path: path.resolve(__dirname, 'fixtures/dist'),
			filename: 'bundle.js',
			libraryTarget: 'umd',
		},
		module: {
			rules: [],
		},
		resolve: {
			extensions: ['.js'],
		},
		plugins: [new ScssConfigWebpackPlugin(settings.pluginOptions)],
	}).run((_, stats) => {
		callback({
			_,
			stats,
			options: stats.compilation.options,
			errors: stats.compilation.errors,
		});
	});
};

afterEach(resolve => {
	rimraf(path.join(__dirname, 'fixtures/dist'), resolve);
});

describe('ScssConfigWebpackPlugin', () => {
	it('should be creatable without options', () => {
		new ScssConfigWebpackPlugin();
	});

	describe('options', () => {
		it('options should match the last options snapshot (dev)', resolve => {
			runWithinWebpackContext(({ options }) => {
				expect(options).toMatchSnapshot();
				resolve();
			});
		});
	});

	it('options should match the last custom options snapshot (dev)', resolve => {
		runWithinWebpackContext(
			({ options }) => {
				expect(options).toMatchSnapshot();
				resolve();
			},
			{
				pluginOptions: {
					name: '[name]-[hash].[ext]',
				},
			}
		);
	});

	describe('runnable webpack context', () => {
		it('should finish without errors', () => {
			runWithinWebpackContext(({ errors }) => {
				expect(errors).toEqual([]);
			});
		});

		it('should set plugins correctly', resolve => {
			runWithinWebpackContext(({ options }) => {
				expect(options.plugins.length).toBe(1);
				expect(options.plugins[0] instanceof ScssConfigWebpackPlugin).toBe(true);
				resolve();
			});
		});

		it('should set rules correctly', resolve => {
			runWithinWebpackContext(({ options }) => {
				const ruleToTest = options.module.rules[0];
				expect(options.module.rules.length).toBe(1); // -1 is the rule defined in the test config
				expect(ruleToTest.test.test('test.scss')).toBe(true);
				expect(ruleToTest.test.test('testingscss')).toBe(false);
				resolve();
			});
		});

		it(
			'should generate correct output',
			() => {
				runWithinWebpackContext(() => {
					const bundlePath = path.resolve(__dirname, './fixtures/dist/bundle.js');
					const contents = fs.readFileSync(bundlePath).toString();
					expect(contents).toBeDefined();
				});
			},
			{ mode: 'production' }
		);
	});
});
