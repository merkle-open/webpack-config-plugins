import * as inquirer from 'inquirer';
import * as path from 'path';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { spawn } from 'child_process';
import { configOptionLabels, configOptionKeys, ConfigOptionKeys, generateConfigurations } from './config-generator';

(async () => {
	// Check if we can write to the existing file:
	const webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js');

	const answers = await inquirer.prompt([
		{
			type: 'checkbox',
			message: 'Select Packages',
			name: 'options',
			choices: (Object.keys(configOptionLabels) as Array<keyof typeof configOptionLabels>).map((key) => ({
				value: key,
				name: configOptionLabels[key],
			})),
		},
	]);
	const { options } = answers as { options: Array<ConfigOptionKeys> };

	const configOptions = Object.assign(
		{},
		...configOptionKeys.map((configOption) => ({
			[configOption]: options.indexOf(configOption) !== -1,
		}))
	) as { [key in ConfigOptionKeys]: boolean };

	const result = generateConfigurations(configOptions);

	const webpackConfigExist = existsSync(webpackConfigPath);
	const webpackConfigEqual = webpackConfigExist && readFileSync(webpackConfigPath, 'utf8') === result.webpackConfig;
	const writeToDisk =
		webpackConfigExist === false ||
		webpackConfigEqual === true ||
		(await inquirer
			.prompt([
				{
					type: 'list',
					message: 'You already have a webpack.config.js - should it be overwritten?',
					name: 'overwrite',
					default: 1,
					choices: [
						{ value: 'yes', name: 'Yes - overwrite my config' },
						{ value: 'no', name: 'No - keep my config as is' },
					],
				},
			])
			.then((answers: { overwrite: 'yes' | 'no' }) => answers.overwrite === 'yes'));

	if (writeToDisk) {
		console.log(
			`${webpackConfigExist ? 'Overwriting' : 'Creating'} "${path.relative(process.cwd(), webpackConfigPath)}"`
		);
		writeFileSync(webpackConfigPath, result.webpackConfig);
	} else {
		console.log(
			'Skip writing webpack.config.js -- add the following code to your webpack.config.js:\n\n' +
				result.webpackConfig +
				'\n'
		);
	}

	const runNpmInstall = await inquirer
		.prompt([
			{
				type: 'list',
				message: 'Run npm install',
				name: 'overwrite',
				default: 1,
				choices: [
					{ value: 'yes', name: 'Yes - install the new dependencies' },
					{ value: 'no', name: 'No - just output them' },
				],
			},
		])
		.then((answers: { overwrite: 'yes' | 'no' }) => answers.overwrite === 'yes');

	if (runNpmInstall) {
		await new Promise((resolve) =>
			spawn('npm', ['install', '--save-dev', ...result.npmInstall.split(' ')], {
				stdio: 'inherit',
			}).on('close', resolve)
		);
	} else {
		console.log(`To install the dependencies run:\n\nnpm install -save-dev ${result.npmInstall}`);
	}
})().catch((err) => {
	console.error(err);
	process.exit(1);
});
