const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');
const webpack = require('webpack');
const FontConfigWebpackPlugin = require('../src/FontConfigWebpackPlugin');

// Allow tests to run 30s
jest.setTimeout(30000);

beforeAll((done) => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach((done) => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('FontConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new FontConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new FontConfigWebpackPlugin({});
	});

	it('should return an instance with the options assigned to it', () => {
		const options = { name: '[hash]-[name].[ext]' };
		const instance = new FontConfigWebpackPlugin(options);

		expect(instance.options).toEqual(options);
	});
});

describe('FontConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin()],
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
			plugins: [new FontConfigWebpackPlugin()],
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
			plugins: [new FontConfigWebpackPlugin()],
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
			plugins: [new FontConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin({ mode: 'production' })],
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
			plugins: [new FontConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin({ mode: 'development' })],
		});
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should generate the correct WOFF files in development mode', (done) => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.woff', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/static/media/OpenSans-Regular-webfont.c8ffdeb3.woff']);
			done();
		});
	});

	it('should generate the correct WOFF files in production mode', (done) => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.woff', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/static/media/OpenSans-Regular-webfont.c8ffdeb3.woff']);
			done();
		});
	});

	it('should set rules correctly', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin()],
		});
		expect(compiler.options.module.rules.length).toBe(1);
		done();
	});

	it('should have rules matching woff files', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new FontConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.woff')).toBe(true);
		expect(ruleToTest.test.test('testingwoff')).toBe(false);
		done();
	});
});
