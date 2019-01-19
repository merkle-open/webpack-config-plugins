import * as inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { generateConfigCli } from '.';
import { ConfigOptionKeys } from './config-generator';

// Fix invalid mockFs typings
jest.mock('inquirer');

let folderIndex = 0;
function generateTmpFolder(name = String(folderIndex++)) {
	const tmpFolder = path.resolve(__dirname, '../tmp');
	const tmpSubFolder = path.join(tmpFolder, name);
	rimraf.sync(tmpSubFolder);
	try {
		fs.mkdirSync(tmpFolder);
	} catch (e) {}
	try {
		fs.mkdirSync(tmpSubFolder);
	} catch (e) {}
	return tmpSubFolder;
}

function mergeLoggerMockCalls(fn: ReturnType<typeof jest.fn>) {
	return fn.mock.calls.reduce((result, call) => result + call.join(' ') + '\n', '\n');
}

type InquirerQuestions = { options: Array<ConfigOptionKeys>; overwrite: 'yes' | 'no'; install: 'yes' | 'no' };
const mockInquirer = (mockAnswers: Partial<InquirerQuestions>) => {
	inquirer.prompt.mockImplementation(async (questions: Array<{ name: string }>) => {
		if (questions.length !== 1) {
			throw new Error('Can only mock single questions');
		}
		const answer = (mockAnswers as any)[questions[0].name];
		if (typeof answer === undefined) {
			throw new Error('Missing mock for ' + questions[0].name);
		}
		return {
			[questions[0].name]: answer,
		};
	});
};

// Combinations to test
// prettier-ignore
const combinations: Array<{ options: Array<ConfigOptionKeys> }> = [
	{ options: ['useClean','useCli','useCss','useDevServer','useFonts','useHtml','useImages','useJs','useScss','useTs'] },
	{ options: ['useClean','useCli','useCss','useDevServer','useFonts','useHtml','useImages','useScss','useTs'] },
	{ options: ['useClean','useCli','useCss','useDevServer','useFonts','useHtml','useImages','useScss','useJs'] },
	{ options: ['useCli', 'useTs'] },
	{ options: ['useCli', 'useJs'] },
	{ options: ['useDevServer', 'useTs'] },
	{ options: ['useDevServer', 'useJs'] },
	{ options: ['useDevServer', 'useTs', 'useImages', 'useScss'] },
	{ options: ['useDevServer', 'useJs', 'useImages', 'useScss'] },
];

describe('cli', () => {
	test.each(combinations as any)(
		`it should run without errors for options %j`,
		async ({ options }: { options: Array<ConfigOptionKeys> }) => {
			const logger = jest.fn();
			console.log = logger;
			mockInquirer({ options, overwrite: 'no', install: 'no' });
			await generateConfigCli(process.cwd());
			expect(logger.mock.calls.length).not.toBe(0);
		}
	);

	test.each(combinations as any)(
		`it output the correct webpack.config.js content for %j`,
		async ({ options }: { options: Array<ConfigOptionKeys> }) => {
			const logger = jest.fn();
			console.log = logger;
			mockInquirer({ options, overwrite: 'no', install: 'no' });
			await generateConfigCli(process.cwd());
			expect(mergeLoggerMockCalls(logger)).toMatchSnapshot();
		}
	);

	test.each(combinations as any)(
		`it logs a understandable instruction if webpack.config.js content is written %j`,
		async ({ options }: { options: Array<ConfigOptionKeys> }) => {
			const tmpSubFolder = generateTmpFolder(options.join('-'));
			const logger = jest.fn();
			console.log = logger;
			mockInquirer({ options, overwrite: 'yes', install: 'no' });
			await generateConfigCli(tmpSubFolder);
			expect(mergeLoggerMockCalls(logger)).toMatchSnapshot();
		}
	);
});
