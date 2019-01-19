const rimraf = require('rimraf');
const { spawn } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const rimrafAsync = promisify(rimraf);
const { generateProject } = require('./libs/project-generator');
const { installPackages } = require('./libs/install-environment');
const { outputTimings, calculateTimings } = require('./libs/time-calculations');
const path = require('path');

const measurements = 30;
const transpilerSettings = {
	babel: {
		ext: 'js',
	},
	typescript: {
		ext: 'tsx',
	},
};

/**
 * @type {'typescript' | 'babel'}
 */
const transpiler = process.env.transpiler === 'babel' ? 'babel' : 'typescript';
const projectModuleCountMultiplier = Number(process.env.moduleMultiplier || 1);

const transpilerExt = transpilerSettings[transpiler].ext;
console.log('Running measurments for', transpiler, projectModuleCountMultiplier);

async function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Launches the webpack dev server with the given command line arguments
 * If the onReady argument returns true kill the server
 *
 * https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblx0U3Bhd25bU3Bhd24gd2VicGFjay1kZXYtc2VydmVyXSAtLT58SW5pdGlhbCBDb21waWxlfCBXYWl0KFdhaXQgZm9yOiAnQ29tcGlsZWQgc3VjY2Vzc2Z1bGx5Jylcblx0V2FpdCAtLT4gTWVhc3VyZShNZWFzdXJlIHRpbWUpXG5cdE1lYXN1cmUgLS0-IFNsZWVwKFdhaXQgZm9yIDE1MDBtcylcblx0U2xlZXAgLS0-IFRyaWdnZXJCdWlsZChNb2RpZnkgYSB3YXRjaGVkIGZpbGUpXG5cdFRyaWdnZXJCdWlsZCAtLT4gfEluY3JlbWVudGFsIGNvbXBpbGV8IFdhaXRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19
 *
 * graph TD
	Spawn[Spawn webpack-dev-server] -->|Initial Compile| Wait(Wait for: 'Compiled successfully')
	Wait --> Measure(Measure time)
	Measure --> Sleep(Wait for 1500ms)
	Sleep --> TriggerBuild(Modify a watched file)
	TriggerBuild --> |Incremental compile| Wait
 */

async function launchWebpackDevServer(args, environmentName, onReady) {
	let runs = 0;
	let startTime;
	return new Promise((resolve, reject) => {
		const timings = [];

		const webpackDevServerProcess = spawn(
			'node',
			[
				path.resolve(`environments/${environmentName}/node_modules/webpack-dev-server/bin/webpack-dev-server`),
			].concat(args.split(' ')),
			{
				stdio: ['pipe', 'pipe', 'inherit'],
			}
		);
		webpackDevServerProcess.on('err', reject);
		webpackDevServerProcess.on('close', (exitCode) =>
			Number(exitCode) !== 0 ? reject(exitCode) : resolve(timings)
		);

		webpackDevServerProcess.stdout.pipe(process.stdout);
		webpackDevServerProcess.stdout.on('data', async (data) => {
			if (String(data).indexOf('Compiled successfully') !== -1) {
				if (startTime) {
					const elapsed =
						process.hrtime(startTime)[0] + Math.round(process.hrtime(startTime)[1] / 1000000) / 1000;
					timings.push(elapsed);
				}
				// Wait for a moment to prevent running into thresholds
				await sleep(3500);
				runs++;
				const readyHandlerResult = onReady(runs);
				if (!readyHandlerResult) {
					webpackDevServerProcess.stdin.end();
				}
				startTime = process.hrtime();
			}
		});
	});
}

(async () => {
	process.cwd(__dirname);

	await rimrafAsync('./profiles');

	// Configs as in webpack.config.NAME.js
	const environments = ['latest', 'current'];
	const results = {};
	let generatedComponentCount;

	for (let i = 0; i < environments.length; i++) {
		const environmentName = environments[i];
		await installPackages(environmentName);
		// DEV Server
		console.log('\n------------------------------');
		console.log('🚀 Start ' + environmentName);
		console.log('------------------------------\n');
		generatedComponentCount = await generateProject(transpiler, environmentName, projectModuleCountMultiplier);
		const timings = await launchWebpackDevServer(
			`--mode development --config environments/${environmentName}/webpack.config.${transpiler}.js`,
			environmentName,
			(run) => {
				if (run > measurements) {
					// Kill dev server:
					return false;
				}
				console.log('\n------------------------------');
				console.log('🎬  Run ' + environmentName, run);
				console.log('------------------------------\n');
				fs.writeFileSync(
					`environments/${environmentName}/src/index.${transpilerExt}`,
					fs.readFileSync(`environments/${environmentName}/src/index.${transpilerExt}`) + '\n// ' + run
				);
				// Keep dev server alive:
				return true;
			}
		);

		console.log('\n------------------------------');
		outputTimings('DevServer ' + environmentName, timings.slice(1));
		console.log('------------------------------\n');
		results[environmentName] = calculateTimings(timings.slice(1));
	}

	console.log('\n------------------------------');
	console.log('Summary');

	console.log('\n⏰   Results in seconds:\n', results);

	console.log('\n⚛️  Generated components:', generatedComponentCount);

	console.log('\n⏰   Time difference:\n', {
		average:
			Math.abs(results.current.average - results.latest.average).toFixed(2) +
			`s ${
				results.current.average > results.latest.average ? 'slower' : 'faster'
			} than the latest released npm version`,
		averageRelative:
			Math.round((results.current.average / results.latest.average) * 100) +
			'% of the latest released npm version build duration',
		median:
			Math.abs(results.current.median - results.latest.median).toFixed(2) +
			`s ${
				results.current.median > results.latest.median ? 'slower' : 'faster'
			} than the latest released npm version`,
		medianRelative:
			Math.round((results.current.median / results.latest.median) * 100) +
			'% of the latest released npm version build duration',
	});

	// Bail out if project would slow down to much:
	const slowdownThresholdInPercent = 10;
	if (Math.round((results.current.average / results.latest.average) * 100 - 100) > slowdownThresholdInPercent) {
		throw new Error(
			`💣 Failed because the current build is over ${slowdownThresholdInPercent}% slower than the last build. (${Math.round(
				(results.current.average / results.latest.average) * 100 - 100
			)}%)`
		);
	}
	console.log('done');
})().catch((e) => {
	console.error('\n' + e);
	process.exit(1);
});
