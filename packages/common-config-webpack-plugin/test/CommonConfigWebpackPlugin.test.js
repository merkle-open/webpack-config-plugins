const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const CommonConfigWebpackPlugin = require('../src/CommonConfigWebpackPlugin');

// Allow tests to run 30s
jest.setTimeout(30000);
// AppVeyor on Node6 will fail if the fork-ts-checker is not limited to 512 MB memory
require('fork-ts-checker-webpack-plugin').DEFAULT_MEMORY_LIMIT = 512;

beforeAll((done) => {
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

beforeEach((done) => {
	process.chdir(path.join(__dirname, 'fixtures'));
	rimraf(path.join(__dirname, 'fixtures/dist'), done);
});

describe('CommonConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new CommonConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new CommonConfigWebpackPlugin({});
	});
});

describe('CommonConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new CommonConfigWebpackPlugin()],
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
			plugins: [new CommonConfigWebpackPlugin()],
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
			plugins: [new CommonConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});
});
