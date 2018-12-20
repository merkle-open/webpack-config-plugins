const { exec } = require('child_process');
const { promisify } = require('util');
const { stat } = require('fs');
const execAsync = promisify(exec);
const statAsync = promisify(stat);
const path = require('path');
const { generateProject } = require('./libs/project-generator');
const { installPackages } = require('./libs/install-environment');
const { outputTimings } = require('./libs/time-calculations');

/**
 * @type {'typescript' | 'babel'}
 */
const transpiler = process.env.transpiler === 'babel' ? 'babel' : 'typescript';

async function measure(name, prepare, execution) {
	const timings = [];
	const runCount = 3;
	console.log('🚀 Start ' + name);
	for (let i = 0; i < runCount; i++) {
		console.log('🎬 Run ', i);
		await prepare();
		const start = process.hrtime();
		await execution();
		const elapsed = process.hrtime(start)[0] + Math.round(process.hrtime(start)[1] / 1000000) / 1000;
		timings.push(elapsed);
	}
	outputTimings(name, timings);
}

(async () => {
	process.cwd(__dirname);

	await installPackages('current');
	await installPackages('latest');

	// Build without a clean project generation before each run
	await measure(
		'current - with file cache',
		async () => {
			process.chdir(path.resolve(__dirname, './environments/current'));
			await generateProject(transpiler, 'current');
			await execAsync(`node_modules/.bin/webpack-cli --config webpack.config.${transpiler}.js --mode production`);
		},
		async () => {
			await execAsync(`node_modules/.bin/webpack-cli --config webpack.config.${transpiler}.js --mode production`);
		}
	);

	await measure(
		'latest - with file cache',
		async () => {
			process.chdir(path.resolve(__dirname, './environments/latest'));
			await generateProject(transpiler, 'latest');
			await execAsync(`node_modules/.bin/webpack-cli --config webpack.config.${transpiler}.js --mode production`);
		},
		async () => {
			await execAsync(`node_modules/.bin/webpack-cli --config webpack.config.${transpiler}.js --mode production`);
		}
	);

	// Build with a clean project generation before each run
	await measure(
		'current',
		async () => {
			process.chdir(path.resolve(__dirname, './environments/current'));
			await generateProject(transpiler, 'current');
		},
		async () => {
			await execAsync(`node_modules/.bin/webpack-cli --config webpack.config.${transpiler}.js --mode production`);
		}
	);

	await measure(
		'latest',
		async () => {
			process.chdir(path.resolve(__dirname, './environments/latest'));
			await generateProject(transpiler, 'latest');
		},
		async () => {
			await execAsync(`node_modules/.bin/webpack-cli --config webpack.config.${transpiler}.js --mode production`);
		}
	);

	const stats = await statAsync('dist/main.js');
	const fileSizeInBytes = stats.size;
	const fileSizeInMegabytes = fileSizeInBytes / 1000.0;
	console.log('File Size of "dist/main.js"', fileSizeInMegabytes.toFixed(0), 'KB');

	console.log('done');
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
