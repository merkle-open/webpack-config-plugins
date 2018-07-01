const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const FontConfigWebpackPlugin = require('../src/FontConfigWebpackPlugin');

// declare global test timeout to 10s for async tests
jest.setTimeout(20 * 1000);

const runWithinWebpackContext = (callback, settings = {}) => {
	webpack({
		mode: settings.mode || 'development',
		entry: path.resolve(__dirname, 'fixtures/entry.js'),
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
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		resolve: {
			extensions: ['.js', '.css'],
		},
		plugins: [new FontConfigWebpackPlugin(settings.pluginOptions)],
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
	jest.resetModules();
	rimraf(path.join(__dirname, 'fixtures/dist'), resolve);
});

describe('FontConfigWebpackPlugin', () => {
	it('should be creatable without options', () => {
		new FontConfigWebpackPlugin();
	});

	describe('options', () => {
		it('options should match the last options snapshot (dev)', resolve => {
			runWithinWebpackContext(({ options }) => {
				expect(options).toMatchSnapshot();
				resolve();
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

		// TODO: This test throws timeout error!
		it.skip(
			'options should match the last options snapshot (prod)',
			resolve => {
				runWithinWebpackContext(({ options }) => {
					expect(options).toMatchSnapshot();
					resolve();
				});
			},
			{ mode: 'production' }
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
				expect(options.plugins[0] instanceof FontConfigWebpackPlugin).toBe(true);
				resolve();
			});
		});

		it('should set rules correctly', resolve => {
			runWithinWebpackContext(({ options }) => {
				const ruleToTest = options.module.rules[1];
				expect(options.module.rules.length - 1).toBe(1); // -1 is the rule defined in the test config
				expect(ruleToTest.test.test('webfont.eot')).toBe(true);
				expect(ruleToTest.test.test('webfont.ttf')).toBe(true);
				expect(ruleToTest.test.test('webfont.woff')).toBe(true);
				expect(ruleToTest.test.test('webfont.woff2')).toBe(true);
				expect(ruleToTest.test.test('webfont.svg')).toBe(true);
				resolve();
			});
		});
	});
});
