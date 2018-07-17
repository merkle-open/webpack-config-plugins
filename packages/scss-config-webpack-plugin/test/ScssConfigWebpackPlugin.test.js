const path = require('path');
const rimraf = require('rimraf');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const ScssConfigWebpackPlugin = require('../src/ScssConfigWebpackPlugin');
const jsDomWindowContext = require('./jsDomWindowContext');

beforeAll(done => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach(done => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('ScssConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new ScssConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new ScssConfigWebpackPlugin({});
	});

	it('should return an instance with the options assigned to it', () => {
		const options = {};
		const instance = new ScssConfigWebpackPlugin(options);

		expect(instance.options).toEqual(options);
	});
});

describe('ScssConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', done => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should compile without errors in development mode', done => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should compile without errors in production mode', done => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should allow to set the production mode mode', done => {
		const referenceCompiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin({ mode: 'production' })],
		});
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should allow to set the development mode mode', done => {
		const referenceCompiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin({ mode: 'development' })],
		});
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should generate no CSS files in development mode', done => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.css', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual([]);
			done();
		});
	});

	it('should generate the correct CSS files in production mode', done => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.css', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/css/main.min.css']);
			done();
		});
	});

	it('should generate separate CSS files with the correct contents', done => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const cssFilePath = path.resolve(__dirname, './fixtures/dist/css/main.min.css');
			const contents = fs.readFileSync(cssFilePath).toString();
			expect(contents).toMatchSnapshot();
			done();
		});
	});

	it('should generate JS with the CSS class inlined inside eval()', done => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const jsFilePath = path.resolve(__dirname, './fixtures/dist/main.js');
			const contents = fs.readFileSync(jsFilePath).toString();
			const classOccurrenceIndex = contents.search('.test');
			expect(classOccurrenceIndex).not.toBe(-1);
			done();
		});
	});

	it('should set rules correctly', done => {
		const compiler = webpack({
			plugins: [new ScssConfigWebpackPlugin()],
		});
		expect(compiler.options.module.rules.length).toBe(2);
		done();
	});

	it('should have rules matching scss and css files', done => {
		const compiler = webpack({
			plugins: [new ScssConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.scss')).toBe(true);
		expect(ruleToTest.test.test('test.css')).toBe(true);
		expect(ruleToTest.test.test('testingscss')).toBe(false);
		done();
	});

	it('should generate css that is minified', done => {
		const compiler = webpack({
			mode: 'production',
			entry: path.join(__dirname, 'fixtures/simple/src/css.js'),
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const cssSourceFilePath = path.resolve(__dirname, './fixtures/simple/src/regular.css');
			const contentsSource = fs.readFileSync(cssSourceFilePath).toString();
			const cssDistFilePath = path.resolve(__dirname, './fixtures/dist/css/main.min.css');
			const contentsMinified = fs.readFileSync(cssDistFilePath).toString();
			expect(contentsMinified.length).toBeLessThan(contentsSource.length);
			done();
		});
	});

	it('should generate css that contains the class', done => {
		const compiler = webpack({
			mode: 'production',
			entry: path.join(__dirname, 'fixtures/simple/src/css.js'),
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const cssFilePath = path.resolve(__dirname, './fixtures/dist/css/main.min.css');
			const contents = fs.readFileSync(cssFilePath).toString();
			const classOccurrenceIndex = contents.search('.test');
			expect(classOccurrenceIndex).not.toBe(-1);
			done();
		});
	});

	it('should generate valid css in development mode', done => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			jsDomWindowContext({
				html: '<div class="test"></div>',
				js: path.resolve(__dirname, './fixtures/dist/main.js'),
			})
				.then(({ window, document }) => {
					const height = window.getComputedStyle(document.querySelector('.test')).height;
					expect(height).toBe('5px');
				})
				.then(done, done);
		});
	});

	it('should generate valid css in production mode', done => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			jsDomWindowContext({
				html: '<div class="test"></div>',
				js: path.resolve(__dirname, './fixtures/dist/main.js'),
				css: path.resolve(__dirname, './fixtures/dist/css/main.min.css'),
			})
				.then(({ window, document }) => {
					const height = window.getComputedStyle(document.querySelector('.test')).height;
					expect(height).toBe('5px');
				})
				.then(done, done);
		});
	});

	it('should load and provide CSS modules', done => {
		const compiler = webpack({
			mode: 'development',
			entry: path.join(__dirname, 'fixtures/modules/src/index.js'),
			context: path.join(__dirname, 'fixtures/modules'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			jsDomWindowContext({
				js: path.resolve(__dirname, './fixtures/dist/main.js'),
			})
				.then(({ window, document }) => {
					const color = window.getComputedStyle(document.getElementById('css-module'))
						.color;
					expect(color).toBe('red');
				})
				.then(done, done);
		});
	});

	it('should load and provide CSS modules in production', done => {
		const compiler = webpack({
			mode: 'production',
			entry: path.join(__dirname, 'fixtures/modules/src/index.js'),
			context: path.join(__dirname, 'fixtures/modules'),
			plugins: [new ScssConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			jsDomWindowContext({
				js: path.resolve(__dirname, './fixtures/dist/main.js'),
				css: path.resolve(__dirname, './fixtures/dist/css/main.min.css'),
			})
				.then(({ window, document }) => {
					const color = window.getComputedStyle(document.getElementById('css-module'))
						.color;
					expect(color).toBe('red');
				})
				.then(done, done);
		});
	});
});
