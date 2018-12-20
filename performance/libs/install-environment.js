// @file
// Generate a boilerplate project to test
//

const rimraf = require('rimraf');
const { exec } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const execAsync = promisify(exec);
const renameAsync = promisify(fs.rename);
const rimrafAsync = promisify(rimraf);
const path = require('path');
const mkdirAsync = promisify(fs.mkdir);

/**
 * Turn webpack-config-plugin packages into installable .tgz files
 */
async function buildUnreleasedPackages() {
	const cwdBefore = process.cwd();
	const unreleasedPackagesSourceFolder = path.resolve(__dirname, '../../packages/');
	const unreleasedPackagesDistFolder = path.resolve(__dirname, '../packages');
	await rimrafAsync(unreleasedPackagesDistFolder);
	await mkdirAsync(unreleasedPackagesDistFolder);
	process.chdir(unreleasedPackagesDistFolder);
	console.log('🎁  Packing current packages');
	await Promise.all(
		fs
			.readdirSync(unreleasedPackagesSourceFolder)
			.filter((packageName) => fs.statSync(path.join(unreleasedPackagesSourceFolder, packageName)).isDirectory())
			.map((packageName) => execAsync(`npm pack "${path.resolve(__dirname, '../../packages/' + packageName)}"`))
	);
	// Remove version number from file name
	await Promise.all(
		fs
			.readdirSync(unreleasedPackagesDistFolder)
			.filter((tarPackageName) => /\.tgz/.test(tarPackageName))
			.map((tarPackageName) =>
				renameAsync(
					path.join(unreleasedPackagesDistFolder, tarPackageName),
					path.join(unreleasedPackagesDistFolder, tarPackageName.replace(/\-\d[^-]+$/, '.tgz'))
				)
			)
	);

	process.chdir(cwdBefore);
}

/**
 * Copy the webpack-config-plugins without node_modules from
 * @param {'latest'|'current'} environment
 */
async function installPackages(environment) {
	const cwdBefore = process.cwd();
	await buildUnreleasedPackages();
	process.chdir(path.resolve(__dirname, '../environments', environment));
	console.log('🗑️  Removing packages for ' + environment);
	await rimrafAsync('package-lock.json');
	await rimrafAsync('node_modules');

	console.log('💿  Installing packages for ' + environment);
	await execAsync('npm install');
	process.chdir(cwdBefore);
}

module.exports = {
	installPackages,
};
