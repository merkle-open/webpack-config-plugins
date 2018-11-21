const path = require('path');
const glob = require('glob');
const rimraf = require('rimraf');
const webpack = require('webpack');
const JsConfigWebpackPlugin = require('../src/JsConfigWebpackPlugin');
const jsDomWindowContext = require('./jsDomWindowContext');

// Allow tests to run 10s
jest.setTimeout(10000);

beforeAll((done) => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach((done) => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('JsConfigWebpackPlugin standalone (without context)', () => {
	it('should be creatable without options', () => {
		new JsConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new JsConfigWebpackPlugin({});
	});

	it('should return an instance with the options assinged to it - including defaults (here no defaults)', () => {
		const simulatedContext = path.resolve(__dirname, '../test/fixtures/simple/');
		// no other options regarding js-config-webpack-plugin
		// testing the option-assignment with the mode 'production'
		const options = {
			babelConfigFile: path.resolve(simulatedContext, '.babelrc'),
			mode: 'production',
		};
		const instance = new JsConfigWebpackPlugin(options);
		expect(instance.options).toEqual({
			babelConfigFile: path.resolve(simulatedContext, '.babelrc'),
			mode: 'production',
		});
	});
});

describe('JsConfigWebpackPlugin inside context', () => {
	// 'done' used for testing async compiler method run
	it('should compile without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});

		// run compiler instance hook into 'after-run' with callback
		compiler.run((_, stats) => {
			// compilation error after run should be empty array
			expect(stats.compilation.errors).toEqual([]);
			// call callback-method 'done' to finish test
			done();
		});
	});

	it('should compile without errors in development mode', (done) => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run((_, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should allow to add the production mode within the js-config-webpack-plugin', (done) => {
		const referenceCompiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin({ mode: 'production' })],
		});

		// compiler instance should have production mode active thus the rules should be the same
		// as in the referenceCompiler instance
		// rules have diffs between prod and dev
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should allow to add the development mode within the js-config-webpack-plugin', (done) => {
		const referenceCompiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin({ mode: 'development' })],
		});

		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should have the correct babelConfigFile option in development mode', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel');
		const babelConfigFileContext = path.join(__dirname, '../config');
		const babelConfigFileName = '.babelrc.base.json';

		const instance = webpack({
			mode: 'development',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin()],
		});

		const ruleToTest = instance.options.module.rules[0];
		const ruleOptions = ruleToTest.use[1].options;

		expect(ruleOptions.extends).toEqual(path.resolve(babelConfigFileContext, babelConfigFileName));
		done();
	});

	it('should have the correct babelConfigFile option in production mode', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel');
		const babelConfigFileContext = path.join(__dirname, '../config');
		const babelConfigFileName = '.babelrc.base.json';

		const instance = webpack({
			mode: 'production',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin()],
		});

		const ruleToTest = instance.options.module.rules[0];
		const ruleOptions = ruleToTest.use[1].options;

		expect(ruleOptions.extends).toEqual(path.resolve(babelConfigFileContext, babelConfigFileName));
		done();
	});

	it('should allow to pass the babelConfigFile option in development mode', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel');
		const babelConfigFilePath = path.join(webpackContext, '.babelrc');

		const instance = webpack({
			mode: 'development',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin({ babelConfigFile: babelConfigFilePath })],
		});

		const ruleToTest = instance.options.module.rules[0];
		const ruleOptions = ruleToTest.use[1].options;

		expect(path.resolve(webpackContext, babelConfigFilePath)).toEqual(ruleOptions.extends);
		done();
	});

	it('should allow to pass the babelConfigFile option in production mode', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel');
		const babelConfigFilePath = path.join(webpackContext, '.babelrc');

		const instance = webpack({
			mode: 'production',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin({ babelConfigFile: babelConfigFilePath })],
		});

		const ruleToTest = instance.options.module.rules[0];
		const ruleOptions = ruleToTest.use[1].options;

		expect(ruleOptions.extends).toEqual(path.resolve(webpackContext, babelConfigFilePath));
		done();
	});

	it('the correct .babelrc file should be registered', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel');
		const babelConfigFilePath = path.join(__dirname, '.babelrc');

		const compiler = webpack({
			mode: 'development',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin({ babelConfigFile: babelConfigFilePath })],
		});

		const ruleToTest = compiler.options.module.rules[0].use[1];
		const ruleOptions = ruleToTest.options;

		// should fail because .babelrc file searches a not installed plugin
		// means that babelrc file was found
		compiler.run(() => {
			expect(ruleOptions.extends).toBe(path.resolve(webpackContext, babelConfigFilePath));
			done();
		});
	});

	it('the correct base .babelrc file should be registered and invoked', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel');
		const babelConfigFileContext = path.join(__dirname, '../config');
		const babelConfigFileName = '.babelrc.base.json';

		const compiler = webpack({
			mode: 'production',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin()],
		});

		const ruleToTest = compiler.options.module.rules[0].use[1];
		const ruleOptions = ruleToTest.options;

		// should not fail because base-file of babelrc has no errors
		compiler.run((_, stats) => {
			expect(ruleOptions.extends).toBe(path.resolve(babelConfigFileContext, babelConfigFileName));
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('the correct custom babelrc file should be registered and invoked', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/babel-custom/');
		const babelConfigFilePath = path.resolve(webpackContext, '.custom.babelrc');

		const compiler = webpack({
			mode: 'production',
			context: webpackContext,
			plugins: [new JsConfigWebpackPlugin({ babelConfigFile: babelConfigFilePath })],
		});

		const ruleToTest = compiler.options.module.rules[0].use[1];
		const ruleOptions = ruleToTest.options;

		compiler.run((_, stats) => {
			// compilation should fail because of not known plugin within babel configuration file
			expect(stats.compilation.errors).not.toEqual([]);

			// property setting
			expect(ruleOptions.extends).toBe(babelConfigFilePath);
			done();
		});
	});

	it('the correct babelrc file should be found witihin the context, registered and then invoked (production)', (done) => {
		const webpackContextSrc = path.resolve(__dirname, 'fixtures/babel/src');

		// the resolveRelativeConfigFile method searches for following files:
		// .babelrc and package.json
		// https://babeljs.io/docs/en/babelrc.html#lookup-behavior
		const babelConfigFileName = '.babelrc';

		// without babelConfigFile paramter the lookup should start
		const compiler = webpack({
			mode: 'production',
			context: webpackContextSrc,
			entry: './index.js',
			plugins: [new JsConfigWebpackPlugin()],
		});

		const ruleToTest = compiler.options.module.rules[0].use[1];
		// lookup bubbles up the directory tree
		// means that the .bablerc file should be located one level up the context of webpack
		const webpackContext = path.resolve(__dirname, 'fixtures/babel');

		compiler.run((_, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.js', {
				cwd: __dirname,
			});

			// generation of file
			expect(stats.compilation.errors).toEqual([]);
			expect(generatedFiles).toEqual(['./fixtures/dist/main.js']);

			// path settings
			expect(ruleToTest.options.extends).toBe(path.join(webpackContext, babelConfigFileName));

			done();
		});
	});

	it('the correct babelrc file should be found witihin the context, registered and then invoked (development)', (done) => {
		const webpackContextSrc = path.resolve(__dirname, 'fixtures/babel/src');

		// the resolveRelativeConfigFile method searches for following files:
		// .babelrc and package.json
		// https://babeljs.io/docs/en/babelrc.html#lookup-behavior
		const babelConfigFileName = '.babelrc';

		// without babelConfigFile paramter the lookup should start
		const compiler = webpack({
			mode: 'development',
			context: webpackContextSrc,
			entry: './index.js',
			plugins: [new JsConfigWebpackPlugin()],
		});

		const ruleToTest = compiler.options.module.rules[0].use[1];
		// lookup bubbles up the directory tree
		// means that the .bablerc file should be located one level up the context of webpack
		const webpackContext = path.resolve(__dirname, 'fixtures/babel');

		compiler.run((_, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.js', {
				cwd: __dirname,
			});

			// generation of file
			expect(stats.compilation.errors).toEqual([]);
			expect(generatedFiles).toEqual(['./fixtures/dist/main.js']);

			// path settings
			expect(ruleToTest.options.extends).toBe(path.join(webpackContext, babelConfigFileName));

			done();
		});
	});

	it('should generate one file called main.js in development mode', (done) => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run((_, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.js', {
				cwd: __dirname,
			});
			expect(stats.compilation.errors).toEqual([]);
			expect(generatedFiles).toEqual(['./fixtures/dist/main.js']);
			done();
		});
	});

	it('should generate one file called main.js in production mode', (done) => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run((_, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.js', {
				cwd: __dirname,
			});
			expect(stats.compilation.errors).toEqual([]);
			expect(generatedFiles).toEqual(['./fixtures/dist/main.js']);
			done();
		});
	});

	it('should have rules matching all extensions', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new JsConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		// test the 'test'-regex within the rule
		expect(ruleToTest.test.test('test.js')).toBe(true);
		expect(ruleToTest.test.test('test.jsx')).toBe(true);
		expect(ruleToTest.test.test('test.mjs')).toBe(true);
		expect(ruleToTest.test.test('test.mmjs')).toBe(false);
		done();
	});

	it('file in production mode should have the correct code and should be executed correctly inside window-context', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/window-context');

		const compiler = webpack({
			mode: 'production',
			context: webpackContext,
			entry: './index.js',
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run(() => {
			// test inside Window-context
			jsDomWindowContext({
				// include the main.js file within the Window-Context
				js: path.join(__dirname, 'fixtures/dist/main.js'),
			})
				.then(({ window }) => {
					expect(window.WindowManager).toBeDefined();
					expect(window.WindowManager.getWindowInnerWidth).toBeDefined();
					expect(window.WindowManager.getWindowInnerHeight).toBeDefined();
				})
				.then(done, done);
		});
	});

	it('file in development mode should have the correct code and should be executed correctly inside window-context', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/window-context/');

		const compiler = webpack({
			mode: 'development',
			context: webpackContext,
			entry: './index.js',
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run(() => {
			jsDomWindowContext({
				js: path.resolve(__dirname, 'fixtures/dist/main.js'),
			})
				.then(({ window }) => {
					expect(window.WindowManager).toBeDefined();
					expect(window.WindowManager.getWindowInnerWidth).toBeDefined();
					expect(window.WindowManager.getWindowInnerHeight).toBeDefined();
				})
				.then(done, done);
		});
	});

	it('file in production mode should manipulate the DOM correctly', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/dom-manipulation/');
		const compiler = webpack({
			mode: 'production',
			context: webpackContext,
			entry: './index.js',
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run(() => {
			jsDomWindowContext({
				html: '<div id="container"></div>',
				js: path.resolve(__dirname, './fixtures/dist/main.js'),
			})
				.then(({ _, document }) => {
					const numberOfChildren = document.querySelector('#container').children.length;
					expect(numberOfChildren).toBe(2);
				})
				.then(done, done);
		});
	});

	it('file in development mode should manipulate the DOM correctly', (done) => {
		const webpackContext = path.join(__dirname, 'fixtures/dom-manipulation/');

		const compiler = webpack({
			mode: 'production',
			context: webpackContext,
			entry: './index.js',
			plugins: [new JsConfigWebpackPlugin()],
		});

		compiler.run(() => {
			jsDomWindowContext({
				html: '<div id="container"></div>',
				js: path.resolve(__dirname, './fixtures/dist/main.js'),
			})
				.then(({ _, document }) => {
					const numberOfChildren = document.querySelector('#container').children.length;
					expect(numberOfChildren).toBe(2);
				})
				.then(done, done);
		});
	});
});
