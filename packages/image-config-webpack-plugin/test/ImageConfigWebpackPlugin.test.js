const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');
const webpack = require('webpack');
const ImageConfigWebpackPlugin = require('../src/ImageConfigWebpackPlugin');

// Allow tests to run 30s
jest.setTimeout(30000);

beforeAll((done) => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach((done) => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('ImageConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new ImageConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new ImageConfigWebpackPlugin({});
	});

	it('should return an instance with the options assigned to it', () => {
		const options = { name: '[hash]-[name].[ext]' };
		const instance = new ImageConfigWebpackPlugin(options);

		expect(instance.options).toEqual(options);
	});
});

describe('ImageConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should compile without errors in development mode', (done) => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should compile without errors in production mode', (done) => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should allow to set the production mode mode', (done) => {
		const referenceCompiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin({ mode: 'production' })],
		});
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should allow to set the development mode mode', (done) => {
		const referenceCompiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin({ mode: 'development' })],
		});
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should generate the correct SVG files in development mode', (done) => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.png', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/static/media/webpack-logo.81da10d7.png']);
			done();
		});
	});

	it('should generate the correct SVG files in production mode', (done) => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.png', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/static/media/webpack-logo.81da10d7.png']);
			done();
		});
	});

	it('should set rules correctly', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		expect(compiler.options.module.rules.length).toBe(1);
		done();
	});

	it('should have rules matching svg files', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.svg')).toBe(true);
		expect(ruleToTest.test.test('testingsvg')).toBe(false);
		done();
	});

	it('should have rules matching png files', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.png')).toBe(true);
		expect(ruleToTest.test.test('testingpng')).toBe(false);
		done();
	});

	it('should have rules matching jpg files', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.jpg')).toBe(true);
		expect(ruleToTest.test.test('testingjpg')).toBe(false);
		done();
	});

	it('should have rules matching jpeg files', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.jpeg')).toBe(true);
		expect(ruleToTest.test.test('testingjpeg')).toBe(false);
		done();
	});

	it('should have rules matching gif files', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new ImageConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.gif')).toBe(true);
		expect(ruleToTest.test.test('testinggif')).toBe(false);
		done();
	});
});
