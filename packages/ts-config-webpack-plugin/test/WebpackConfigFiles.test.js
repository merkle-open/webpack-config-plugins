const productionConfig = require('../config/production.config');
const developmentConfig = require('../config/development.config');

function filesRegexTests(filesRegex) {
	it('files regex matches .ts file ending', (done) => {
		expect(filesRegex.test('demo.ts')).toBe(true);
		done();
	});

	it('files regex matches .tsx file ending', (done) => {
		expect(filesRegex.test('demo.tsx')).toBe(true);
		done();
	});

	it('files regex matches .d.ts file ending', (done) => {
		expect(filesRegex.test('demo.d.ts')).toBe(true);
		done();
	});

	it('files regex doesn\'t match "asdfts" (escaping the first dot)', (done) => {
		expect(filesRegex.test('asdfts')).toBe(false);
		done();
	});

	it('files regex doesn\'t match "asdftsx" (escaping the first dot)', (done) => {
		expect(filesRegex.test('asdftsx')).toBe(false);
		done();
	});

	it('files regex doesn\'t match "demo.dxts" (escaping the second dot)', (done) => {
		expect(filesRegex.test('demo.dxts')).toBe(false);
		done();
	});
}

describe('TsConfigWebpackPlugin production config file', () => {
	const filesRegex = productionConfig({}).module.rules[0].test;

	filesRegexTests(filesRegex);
});

describe('TsConfigWebpackPlugin development config file', () => {
	const filesRegex = developmentConfig({}).module.rules[0].test;

	filesRegexTests(filesRegex);
});
