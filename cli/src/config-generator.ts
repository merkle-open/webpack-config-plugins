export interface ConfigLoaderTypeOptions {
	useJs: boolean;
	useTs: boolean;
	useScss: boolean;
	useCss: boolean;
	useFonts: boolean;
	useImages: boolean;
	useHtml: boolean;
	useClean: boolean;
	useDevServer: boolean;
	useCli: boolean;
}

export type GeneratedConfigs = {
	npmInstall: string;
	webpackConfig: string;
};

export type ConfigOptionKeys = keyof ConfigLoaderTypeOptions;

type PluginName =
	| 'js-config-webpack-plugin'
	| 'ts-config-webpack-plugin'
	| 'scss-config-webpack-plugin'
	| 'font-config-webpack-plugin'
	| 'image-config-webpack-plugin'
	| 'common-config-webpack-plugin'
	| 'asset-config-webpack-plugin'
	| 'html-webpack-plugin'
	| 'clean-webpack-plugin'
	| 'webpack-dev-server'
	| 'webpack-cli';

const moduleNames: { [option in ConfigOptionKeys]: PluginName } = {
	useJs: 'js-config-webpack-plugin',
	useTs: 'ts-config-webpack-plugin',
	useScss: 'scss-config-webpack-plugin',
	useCss: 'scss-config-webpack-plugin',
	useFonts: 'font-config-webpack-plugin',
	useImages: 'image-config-webpack-plugin',
	useHtml: 'html-webpack-plugin',
	useClean: 'clean-webpack-plugin',
	useDevServer: 'webpack-dev-server',
	useCli: 'webpack-cli',
};

export const configOptionKeys = Object.keys(moduleNames) as Array<ConfigOptionKeys>;

const assetConfigWebpackPluginChildren: Array<PluginName> = [
	'font-config-webpack-plugin',
	'image-config-webpack-plugin',
];

const commonConfigWebpackPluginChildren: Array<PluginName> = [
	'js-config-webpack-plugin',
	'ts-config-webpack-plugin',
	'scss-config-webpack-plugin',
	'asset-config-webpack-plugin',
];

const dependencies: { [option in PluginName]: Array<string> } = {
	'js-config-webpack-plugin': ['js-config-webpack-plugin', '@babel/core', '@babel/preset-env', '@babel/preset-react'],
	'ts-config-webpack-plugin': ['ts-config-webpack-plugin', 'typescript'],
	'scss-config-webpack-plugin': ['scss-config-webpack-plugin'],
	'font-config-webpack-plugin': ['font-config-webpack-plugin'],
	'image-config-webpack-plugin': ['image-config-webpack-plugin'],
	'common-config-webpack-plugin': ['common-config-webpack-plugin'],
	'asset-config-webpack-plugin': ['asset-config-webpack-plugin'],
	'html-webpack-plugin': ['html-webpack-plugin'],
	'clean-webpack-plugin': ['clean-webpack-plugin'],
	'webpack-dev-server': ['webpack-dev-server', 'webpack'],
	'webpack-cli': ['webpack', 'webpack-cli'],
};

const webpackPluginImports: { [option in PluginName]: string | false } = {
	'js-config-webpack-plugin': `const JsConfigWebpackPlugin = require('js-config-webpack-plugin')`,
	'ts-config-webpack-plugin': `const TsConfigWebpackPlugin = require('ts-config-webpack-plugin')`,
	'scss-config-webpack-plugin': `const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin')`,
	'font-config-webpack-plugin': `const FontsConfigWebpackPlugin = require('font-config-webpack-plugin')`,
	'image-config-webpack-plugin': `const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin')`,
	'common-config-webpack-plugin': `const CommonConfigWebpackPlugin = require('common-config-webpack-plugin')`,
	'asset-config-webpack-plugin': `const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin')`,
	'html-webpack-plugin': `const HtmlWebpackPlugin = require('html-webpack-plugin')`,
	'clean-webpack-plugin': `const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin`,
	'webpack-dev-server': false,
	'webpack-cli': false,
};

const webpackPluginConfigurations: { [option in PluginName]: string | false } = {
	'js-config-webpack-plugin': 'new JsConfigWebpackPlugin()',
	'ts-config-webpack-plugin': 'new TsConfigWebpackPlugin()',
	'scss-config-webpack-plugin': 'new ScssConfigWebpackPlugin()',
	'font-config-webpack-plugin': 'new FontsConfigWebpackPlugin()',
	'image-config-webpack-plugin': 'new ImagesConfigWebpackPlugin()',
	'common-config-webpack-plugin': 'new CommonConfigWebpackPlugin()',
	'asset-config-webpack-plugin': 'new AssetConfigWebpackPlugin()',
	'html-webpack-plugin': 'new HtmlWebpackPlugin()',
	'clean-webpack-plugin': `new CleanWebpackPlugin()`,
	'webpack-dev-server': false,
	'webpack-cli': false,
};

const webpackPluginExplanation: { [option in PluginName]: Array<string> | false } = {
	'js-config-webpack-plugin': [
		'Multi threading babel loader configuration with caching for .js and .jsx files',
		'see https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin/config',
	],
	'ts-config-webpack-plugin': [
		'Multi threading typescript loader configuration with caching for .ts and .tsx files',
		'see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config',
	],
	'scss-config-webpack-plugin': [
		'SCSS Configuration for .css .module.css and .scss .module.scss files',
		'see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config',
	],
	'font-config-webpack-plugin': [
		'File loader configuration for .woff and .woff2 files',
		'see https://github.com/namics/webpack-config-plugins/tree/master/packages/font-config-webpack-plugin/config',
	],
	'image-config-webpack-plugin': [
		'File loader configuration for .gif .jpg .jpeg .png and .svg files',
		'see https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin/config',
	],
	'common-config-webpack-plugin': [
		'Multi threading babel loader configuration with caching for .js and .jsx files',
		'Multi threading typescript loader configuration with caching for .ts and .tsx files',
		'SCSS Configuration for .css .module.css and .scss .module.scss files',
		'File loader configuration for .woff and .woff2 files',
		'File loader configuration for .gif .jpg .jpeg .png and .svg files',
		'https://github.com/namics/webpack-config-plugins/',
	],
	'asset-config-webpack-plugin': [
		'File loader configuration for .woff and .woff2 files',
		'File loader configuration for .gif .jpg .jpeg .png and .svg files',
		'https://github.com/namics/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin',
	],
	'html-webpack-plugin': ['Generate a base html file and injects all generated css and js files'],
	'clean-webpack-plugin': ['Cleans the dist folder before the build starts'],
	'webpack-dev-server': false,
	'webpack-cli': false,
};

export const configOptionLabels: { [fieldName in keyof ConfigLoaderTypeOptions]: string } = {
	useJs: 'Load ES6 (.js .jsx)',
	useTs: 'Load Typescript (.ts tsx)',
	useScss: 'Load Scss (.scss)',
	useCss: 'Load Css (.css)',
	useFonts: 'Load Fonts (.woff .woff2)',
	useImages: 'Load Images',
	useHtml: 'Use Html Plugin',
	useClean: 'Use Clean Plugin',
	useDevServer: 'webpack-dev-server',
	useCli: 'webpack-cli',
};

/**
 * Returns the module names for the given config
 *
 * e.g. getModulesForConfiguration({useJs: true}) // -> 'js-config-webpack-plugin'
 *
 * common-config-webpack-plugin
 * ├── js-config-webpack-plugin
 * ├── ts-config-webpack-plugin
 * ├── scss-config-webpack-plugin
 * └── asset-config-webpack-plugin
 *     ├── font-config-webpack-plugin
 *     └── image-config-webpack-plugin
 */
function getModuleNamesForConfiguration(configOptions: ConfigLoaderTypeOptions): Array<PluginName> {
	return (Object.keys(configOptions) as Array<keyof typeof configOptions>)
		.filter((key) => configOptions[key])
		.map((key) => moduleNames[key]);
}

/**
 * Reduce the plugins by using wrappers
 */
function combinePluginsToWrappers(moduleNamesForConfiguration: Array<PluginName>): Array<PluginName> {
	// Use Asset Plugin
	const useAssetConfigWebpackPlugin = !assetConfigWebpackPluginChildren.some(
		(moduleName) => moduleNamesForConfiguration.indexOf(moduleName) === -1
	);
	if (useAssetConfigWebpackPlugin) {
		moduleNamesForConfiguration = moduleNamesForConfiguration.filter(
			(moduleName) => assetConfigWebpackPluginChildren.indexOf(moduleName) === -1
		);
		moduleNamesForConfiguration.push('asset-config-webpack-plugin');
	}
	// Use common config plugin
	const useCommonConfigWebpackPlugin = !commonConfigWebpackPluginChildren.some(
		(moduleName) => moduleNamesForConfiguration.indexOf(moduleName) === -1
	);
	if (useCommonConfigWebpackPlugin) {
		moduleNamesForConfiguration = moduleNamesForConfiguration.filter(
			(moduleName) => commonConfigWebpackPluginChildren.indexOf(moduleName) === -1
		);
		moduleNamesForConfiguration.push('common-config-webpack-plugin');
	}
	return moduleNamesForConfiguration;
}

function unqiue<U extends string, T extends Array<any> = Array<U>>(array: T): T {
	return Array.from(new Set(array).keys()) as T;
}

export function generateConfigurations(configOptions: ConfigLoaderTypeOptions): GeneratedConfigs {
	const moduleNames = unqiue(combinePluginsToWrappers(getModuleNamesForConfiguration(configOptions)));
	moduleNames.sort();
	const dependencsToInstall: Array<string> = [];
	moduleNames.forEach((moduleName) => {
		dependencsToInstall.push(...dependencies[moduleName]);
	});

	const uniqueDependencsToInstall = unqiue(dependencsToInstall);
	uniqueDependencsToInstall.sort();

	const pluginImports = moduleNames
		.map((moduleName) => webpackPluginImports[moduleName])
		.filter((value) => value) as Array<string>;

	const pluginConfigurations = moduleNames
		.filter((moduleName) => webpackPluginConfigurations[moduleName])
		.map((moduleName) => {
			const moduleExplanation = webpackPluginExplanation[moduleName];
			const explanation =
				moduleExplanation === false ? '' : '// ' + moduleExplanation.join('\n    // ') + '\n    ';
			return explanation + webpackPluginConfigurations[moduleName];
		}) as Array<string>;

	return {
		npmInstall: uniqueDependencsToInstall.length ? `${[''].concat(uniqueDependencsToInstall).join(' ')}` : '',
		webpackConfig: pluginImports.length
			? `${pluginImports.join(';\n')};

module.exports = {
  plugins: [
    ${pluginConfigurations.join(',\n    ')},
  ],
};
`
			: '',
	};
}
