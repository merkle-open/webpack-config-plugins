const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const AssetConfigWebpackPlugin = require('../src/AssetConfigWebpackPlugin');

// Allow tests to run 30s
jest.setTimeout(30000);

beforeAll((done) => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach((done) => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('AssetConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new AssetConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new AssetConfigWebpackPlugin({});
	});
});

describe('AssetConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new AssetConfigWebpackPlugin()],
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
			plugins: [new AssetConfigWebpackPlugin()],
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
			plugins: [new AssetConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});
});
