const rimraf = require('rimraf');
const { exec } = require('child_process');
const { promisify } = require('util');
const { stat } = require('fs');
const execAsync = promisify(exec);
const statAsync = promisify(stat);
const rimrafAsync = promisify(rimraf);
const { generateProject, copyPlugins } = require('./libs/project-generator');
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

	await copyPlugins();
	await rimrafAsync('./profiles');

	// Build without a clean project generation before each run
	await measure(
		'current - with file cache',
		async () => {
			await generateProject(transpiler);
			await execAsync(`webpack --config webpack.config.current.${transpiler}.js --mode production`);
		},
		async () => {
			await execAsync(`webpack --config webpack.config.current.${transpiler}.js --mode production`);
		}
	);

	await measure(
		'latest - with file cache',
		async () => {
			await generateProject(transpiler);
			await execAsync(`webpack --config webpack.config.latest.${transpiler}.js --mode production`);
		},
		async () => {
			await execAsync(`webpack --config webpack.config.latest.${transpiler}.js --mode production`);
		}
	);

	// Build with a clean project generation before each run
	await measure(
		'current',
		async () => {
			await generateProject(transpiler);
		},
		async () => {
			await execAsync(`webpack --config webpack.config.current.${transpiler}.js --mode production`);
		}
	);

	await measure(
		'latest',
		async () => {
			await generateProject(transpiler);
		},
		async () => {
			await execAsync(`webpack --config webpack.config.latest.${transpiler}.js --mode production`);
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
