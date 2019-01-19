import { spawn } from 'child_process';
import { existsSync, readdir, readFileSync, writeFileSync } from 'fs';
import * as inquirer from 'inquirer';
import * as path from 'path';
import { configOptionKeys, ConfigOptionKeys, configOptionLabels, generateConfigurations } from './config-generator';

export const generateConfigCli = async (cwd = process.cwd()) => {
	// Check if we can write to the existing file:
	const webpackConfigPath = path.resolve(cwd, 'webpack.config.js');

	const answers = (await inquirer.prompt([
		{
			type: 'checkbox',
			message: 'Select Packages',
			name: 'options',
			choices: (Object.keys(configOptionLabels) as Array<keyof typeof configOptionLabels>).map((key) => ({
				value: key,
				name: configOptionLabels[key],
			})),
		},
	])) as { options: Array<ConfigOptionKeys> };
	const { options } = answers;

	const configOptions = Object.assign(
		{},
		...configOptionKeys.map((configOption) => ({
			[configOption]: options.indexOf(configOption) !== -1,
		}))
	) as { [key in ConfigOptionKeys]: boolean };

	const result = generateConfigurations(configOptions);

	// If the generated webpack.config.js would be different from the existing
	// configuration ask the user if he wants to overwrite it
	const webpackConfigExist = existsSync(webpackConfigPath);
	const webpackConfigEqual = webpackConfigExist && readFileSync(webpackConfigPath, 'utf8') === result.webpackConfig;
	const webpackConfigNeedsUpdateFs = webpackConfigExist === false || webpackConfigEqual === false;
	const userAllowsWebackOverwrite =
		webpackConfigNeedsUpdateFs &&
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

	if (webpackConfigNeedsUpdateFs) {
		if (userAllowsWebackOverwrite) {
			console.log(
				`✍️  ${webpackConfigExist ? 'Overwriting' : 'Creating'} "${path.relative(cwd, webpackConfigPath)}"`
			);
			writeFileSync(webpackConfigPath, result.webpackConfig);
		} else {
			console.log(
				'⚠️ Skipping writing webpack.config.js\n💡  Add the following code to your webpack.config.js:\n\n' +
					result.webpackConfig +
					'\n'
			);
		}
	} else {
		console.log('Webpack config already up to date');
	}

	// Install all npm dependencies
	const runNpmInstall = await inquirer
		.prompt([
			{
				type: 'list',
				message: 'Run npm install',
				name: 'install',
				default: 1,
				choices: [
					{ value: 'yes', name: 'Yes - install the new dependencies' },
					{ value: 'no', name: 'No - just output them' },
				],
			},
		])
		.then((answers: { install: 'yes' | 'no' }) => answers.install === 'yes');

	if (runNpmInstall) {
		const installSuceeded = await spawnInheritAsync('npm', [
			'install',
			'--save-dev',
			...result.npmInstall.split(' '),
		]);
		if (installSuceeded) {
			console.log('✅  All dependencies were installed!');
		}
	} else {
		console.log('⚠️  Skipping NPM installation');
		console.log(`💡  To install the dependencies manually run:\n\nnpm install --save-dev ${result.npmInstall}\n`);
	}

	// If the user is using the proposed webpack config
	// we can give him additional guidance on what to do next
	const isDefaultWebpackConfig = !webpackConfigExist || userAllowsWebackOverwrite || !webpackConfigNeedsUpdateFs;
	if (isDefaultWebpackConfig) {
		const defaultSrcPath = path.resolve(process.cwd(), 'src');
		const doesEntryExist = await hasFile(defaultSrcPath, /^index\.(js|jsx|ts|tsx)$/);
		const entryName = configOptions.useTs ? '"src/index.ts" or "src/index.tsx"' : '"src/index.js"';
		console.log('\nNext steps:');
		if (doesEntryExist) {
			console.log(`💡  Webpack will look for ${entryName} which you have to create manually.`);
		} else {
			console.log(`💡  Webpack will use your ${entryName} for the build.`);
		}
		if (configOptions.useCli) {
			console.log('💡  Build your bundle with    webpack --mode production');
		}
		if (configOptions.useDevServer) {
			console.log('💡  Start the server with     webpack-dev-server --mode development');
		}
		if (configOptions.useCli || configOptions.useDevServer) {
			console.log(
				'💡  For more information on avaialble modes please go to https://webpack.js.org/concepts/mode/'
			);
		}
	}
};

/**
 * Spawn a child process and pipe all input and output to the process stdio
 */
async function spawnInheritAsync(cmd: string, args: Array<string>): Promise<boolean> {
	return new Promise<boolean>((resolve) =>
		spawn(cmd, args, {
			stdio: 'inherit',
		})
			.on('close', (code) => {
				// Any exit code other than 0 is considered to be an error.
				code ? resolve(false) : resolve(true);
			})
			.on('error', () => resolve(false))
	);
}

async function hasFile(pathToFolder: string, tester: RegExp): Promise<boolean> {
	return new Promise((resolve, reject) => {
		readdir(pathToFolder, (err, files) => {
			if (err) {
				return resolve(false);
			}
			resolve(files.some((file) => tester.test(file)));
		});
	});
}
