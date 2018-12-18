// @ts-check
'use strict';
const typescript = require('typescript');

/**
 * Returns a string of all warnings or undefined if no warning was present
 *
 * @param {string} configFilePath
 * @returns {string | undefined} warnings
 */
function getTsConfigWarnings(configFilePath) {
	return beautifyWarnings(configFilePath, verifyTsConfig(configFilePath));
}

/**
 * Check for known TSConfig issues and output warnings
 * @param {string} configFilePath
 * @returns {string[]} warnings
 */
function verifyTsConfig(configFilePath) {
	/**
	 * @type {string[]}
	 */
	const warnings = [];
	const createConfigFileHost = {
		onUnRecoverableConfigFileDiagnostic() {},
		useCaseSensitiveFileNames: false,
		readDirectory: typescript.sys.readDirectory,
		fileExists: typescript.sys.fileExists,
		readFile: typescript.sys.readFile,
		getCurrentDirectory: typescript.sys.getCurrentDirectory,
	};
	const tsconfig = typescript.getParsedCommandLineOfConfigFile(configFilePath, {}, createConfigFileHost);
	if (!tsconfig) {
		return [`could not parse "${configFilePath}"`];
	}
	if (tsconfig.options.skipLibCheck === undefined) {
		warnings.push(
			'skipLibCheck option was NOT specified\n' +
				'By default the fork-ts-checker-webpack-plugin will check all types inside the node_modules directory\n' +
				'even for unused dependencies and slow down the type checking a lot.\n' +
				'To skip that checking add the following line to your tsconfig.json compilerOptions configuration:\n' +
				'"skipLibCheck": true\n' +
				'To keep the default behaviour with possible performance penalties set skipLibCheck to false to hide this warning.\n'
		);
	}
	if (tsconfig.options.moduleResolution === undefined) {
		warnings.push(
			'moduleResolution option was NOT specified\n' +
				'This will result in typescript warnings like "module not found".\n' +
				'To fix that add the following line to your tsconfig.json compilerOptions configuration:\n' +
				'"moduleResolution": "node"\n' +
				'To keep the default behaviour with possible type checking errors set moduleResolution to "classic" to hide this warning.\n'
		);
	}

	return warnings;
}

/**
 * Turns all warnings into a single string
 *
 * @param {string} configFilePath
 * @param {string[]} warnings
 * @returns {string|undefined} warnings
 */
function beautifyWarnings(configFilePath, warnings) {
	if (warnings.length === 0) {
		return;
	}
	const intro = `⚠️ ts-config-webpack-plugin found ${warnings.length} warning${
		warnings.length ? 's' : ''
	} in "${configFilePath}".`;
	return intro + '\n' + warnings.map((warning) => 'Warning: \n   ' + warning.split('\n').join('\n   ')).join('\n\n');
}

exports = module.exports = {
	getTsConfigWarnings,
	verifyTsConfig,
	beautifyWarnings,
};
