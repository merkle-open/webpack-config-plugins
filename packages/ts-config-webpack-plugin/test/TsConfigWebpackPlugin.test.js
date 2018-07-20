const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');
const webpack = require('webpack');
const TsConfigWebpackPlugin = require('../src/TsConfigWebpackPlugin');

beforeAll(done => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach(done => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('TsConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new TsConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new TsConfigWebpackPlugin({});
	});

	it('should return an instance with the options assigned to it - including defaults', () => {
		const options = {};
		const instance = new TsConfigWebpackPlugin(options);
		expect(instance.options).toEqual({
			configFile: path.resolve(__dirname, '../tsconfig.json'),
		});
	});

	it('should allow to set a different config tsfile', () => {
		const rootTsConfig = path.resolve(__dirname, '../../../tsconfig.json');
		const options = { configFile: rootTsConfig };
		const instance = new TsConfigWebpackPlugin(options);
		expect(instance.options).toEqual({
			configFile: rootTsConfig,
		});
	});
});

describe('TsConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', done => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
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
			plugins: [new TsConfigWebpackPlugin()],
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
			plugins: [new TsConfigWebpackPlugin()],
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
			plugins: [new TsConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin({ mode: 'production' })],
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
			plugins: [new TsConfigWebpackPlugin()],
		});
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin({ mode: 'development' })],
		});
		const rule = JSON.stringify(compiler.options.module.rules, null, 2);
		const referenceRule = JSON.stringify(referenceCompiler.options.module.rules, null, 2);
		expect(rule).toEqual(referenceRule);
		done();
	});

	it('should generate the correct JS files in development mode', done => {
		const compiler = webpack({
			mode: 'development',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.js', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/main.js']);
			done();
		});
	});

	it('should generate the correct JS files in production mode', done => {
		const compiler = webpack({
			mode: 'production',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const generatedFiles = glob.sync('./fixtures/dist/**/*.js', {
				cwd: __dirname,
			});
			expect(generatedFiles).toEqual(['./fixtures/dist/main.js']);
			done();
		});
	});

	it('should set rules correctly', done => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		expect(compiler.options.module.rules.length).toBe(1);
		done();
	});

	it('should have rules matching ts and tsx files', done => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		const ruleToTest = compiler.options.module.rules[0];
		expect(ruleToTest.test.test('test.ts')).toBe(true);
		expect(ruleToTest.test.test('test.tsx')).toBe(true);
		expect(ruleToTest.test.test('testingts')).toBe(false);
		done();
	});
});
