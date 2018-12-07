const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');
const webpack = require('webpack');
const TsConfigWebpackPlugin = require('../src/TsConfigWebpackPlugin');
const fs = require('fs');
const validateSourcemap = require('sourcemap-validator');

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

describe('TsConfigWebpackPlugin standalone', () => {
	it('should be creatable without options', () => {
		new TsConfigWebpackPlugin();
	});

	it('should be creatable with options', () => {
		new TsConfigWebpackPlugin({});
	});

	it('should find a relative located tsconfig.json file', () => {
		const options = {};
		const instance = new TsConfigWebpackPlugin(options);
		const resolvedPath = instance.resolveTsConfigFilePath(__dirname);
		expect(resolvedPath).toEqual(path.resolve(__dirname, '../tsconfig.json'));
	});
});

describe('TsConfigWebpackPlugin inside webpack context', () => {
	it('should compile without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			expect(stats.compilation.errors).toEqual([]);
			done();
		});
	});

	it('should compile definition files without errors', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/definitions'),
			plugins: [new TsConfigWebpackPlugin()],
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
			plugins: [new TsConfigWebpackPlugin()],
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
			plugins: [new TsConfigWebpackPlugin()],
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

	it('should allow to set the development mode mode', (done) => {
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

	it('should generate the correct JS files in development mode', (done) => {
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

	it('should generate the correct JS files in production mode', (done) => {
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

	it('should set rules correctly', (done) => {
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		expect(compiler.options.module.rules.length).toBe(1);
		done();
	});

	it('should have rules matching ts and tsx files', (done) => {
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

	it('should warn if --skipLibCheck is not specified', (done) => {
		const origWarn = console.warn;
		let warnMessage;
		console.warn = (msg) => (warnMessage = msg);
		const compiler = webpack({
			context: path.join(__dirname, 'fixtures/no-lib-check'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			console.warn = origWarn;
			expect(Boolean(warnMessage)).toEqual(true);
			expect(warnMessage).toMatchSnapshot();
			done();
		});
	});
});

describe('TsConfigWebpackPlugin sourcemaps', () => {
	const extractEval = (evalStatement) => {
		const start = evalStatement.indexOf('"') + 1;
		const end = evalStatement.lastIndexOf('"');
		return eval(`"${evalStatement.substr(start, end - start)}"`);
	};

	it('should generate a valid sourcemap in eval mode', (done) => {
		/**
		 * https://webpack.js.org/configuration/devtool/
		 * eval - Each module is executed with eval() and //@ sourceURL.
		 * This is pretty fast. The main disadvantage is that it doesn't display line numbers
		 * correctly since it gets mapped to transpiled code instead of the original code (No Source Maps from Loaders).
		 */
		const compiler = webpack({
			mode: 'development',
			devtool: 'eval',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const distFile = fs.readFileSync(path.resolve(__dirname, 'fixtures/dist/main.js'), 'utf8');
			const match = distFile.match(/\# sourceURL=([\:\\\/\.a-z0-9]+)(.)/i) || {
				1: 'No sourcemap found',
			};
			expect(match[0]).not.toBeFalsy();
			expect(match[1]).toBe('webpack:///./src/index.ts');
			done();
		});
	});

	it('should generate a valid sourcemap in eval-source-map mode', (done) => {
		/**
		 * https://webpack.js.org/configuration/devtool/
		 * eval-source-map - Each module is executed with eval() and a SourceMap is added as a DataUrl to the eval().
		 * Initially it is slow, but it provides fast rebuild speed and yields real files.
		 * Line numbers are correctly mapped since it gets mapped to the original code.
		 * It yields the best quality SourceMaps for development.
		 */
		const compiler = webpack({
			mode: 'development',
			devtool: 'eval-source-map',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const srcFile = fs.readFileSync(path.resolve(__dirname, 'fixtures/simple/src/index.ts'), 'utf8');
			const distFile = fs.readFileSync(path.resolve(__dirname, 'fixtures/dist/main.js'), 'utf8');
			// Webpack wraps the code in eval blocks so it has to be extracted before it can be analyzed
			const evalSourceMap = extractEval(distFile.substr(distFile.indexOf('eval(')).split('\n', 2)[0]);
			expect(evalSourceMap).not.toBeFalsy();
			const match = evalSourceMap.match(/\# sourceMappingURL=data\:[^,]+,([\:/a-z0-9+-]+)/i) || {
				1: 'No sourcemap found',
			};
			expect(match[0]).not.toBeFalsy();
			const sourceMapString = Buffer.from(match[1], 'base64').toString();
			validateSourcemap(evalSourceMap, sourceMapString, srcFile);
			done();
		});
	});

	it('should generate a valid sourcemap in cheap-module-eval-source-map mode', (done) => {
		/**
		 * https://webpack.js.org/configuration/devtool/
		 * cheap-module-eval-source-map - Similar to cheap-eval-source-map, however,
		 * in this case Source Maps from Loaders are processed for better results.
		 * However Loader Source Maps are simplified to a single mapping per line.
		 */
		const compiler = webpack({
			mode: 'development',
			devtool: 'cheap-module-eval-source-map',
			context: path.join(__dirname, 'fixtures/simple'),
			plugins: [new TsConfigWebpackPlugin()],
		});
		compiler.run((err, stats) => {
			const srcFile = fs.readFileSync(path.resolve(__dirname, 'fixtures/simple/src/index.ts'), 'utf8');
			const distFile = fs.readFileSync(path.resolve(__dirname, 'fixtures/dist/main.js'), 'utf8');
			// Webpack wraps the code in eval blocks so it has to be extracted before it can be analyzed
			const evalSourceMap = extractEval(distFile.substr(distFile.indexOf('eval(')).split('\n', 2)[0]);
			expect(evalSourceMap).not.toBeFalsy();
			const match = evalSourceMap.match(/\# sourceMappingURL=data\:[^,]+,([\:/a-z0-9+-]+)/i) || {
				1: 'No sourcemap found',
			};
			expect(match[0]).not.toBeFalsy();
			const sourceMapString = Buffer.from(match[1], 'base64').toString();
			validateSourcemap(evalSourceMap, sourceMapString, srcFile);
			done();
		});
	});
});
