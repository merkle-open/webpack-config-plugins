// @file
// Generate a boilerplate project to test
//

const { exec } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const execAsync = promisify(exec);
const rimrafAsync = promisify(require('rimraf'));
const writeFileAsync = promisify(fs.writeFile);
const path = require('path');

/**
 * Generate 100 components (multiplied by the `projectModuleCountMultiplier`)
 * to the src folder
 *
 * @param {"babel" | "typescript"} transpiler
 * @param {"current" | "latest"} environmentName
 * @param {number} [projectModuleCountMultiplier]
 *
 * Returns the amount of generated components
 */
async function generateProject(transpiler, environmentName, projectModuleCountMultiplier = 1) {
	const cwdBefore = process.cwd();
	// create-react-component-folder works only with relative paths
	// there fore we set it to the project root
	process.chdir(path.resolve(__dirname, '..', 'environments', environmentName));

	const baseAtoms = [
		'Address',
		'Box',
		'Button',
		'Captcha',
		'CaptchaInvisible',
		'ChartBar',
		'ChartDonut',
		'Checkbox',
		'DateField',
		'EkomiSeal',
		'ExtendedNumberInput',
		'Footer',
		'FormField',
		'FormFieldset',
		'Hbox',
		'HorizontalShadow',
		'Icon',
		'IconBox',
		'Iframe',
		'Image',
		'ImageBox',
		'ImageCircle',
		'Input',
		'Link',
		'LinkAction',
		'LinkScroll',
		'LinkSelect',
		'Logo',
		'MenuButton',
		'NativeSelect',
		'PlayButton',
		'ProcessCheckbox',
		'ProcessRadio',
		'ProcessState',
		'Radio',
		'RichText',
		'Separator',
		'Spinner',
		'Sticker',
		'Textarea',
		'Thumbnail',
		'TimeField12h',
		'TimeField24h',
		'Tooltip',
		'TooltipPush',
		'TypeSelect',
		'ValidationFeedback',
		'YoutubeVideo',
	];
	const baseMolecules = [
		'Accordion',
		'AgencyLocator',
		'AgencyMap',
		'BottomTabs',
		'Breadcrumbs',
		'Carousel',
		'CategoryTags',
		'ChartWrapper',
		'ChatRealperson',
		'ClosableBox',
		'Collapsible',
		'CommentApp',
		'ConsultantContact',
		'ContentFilter',
		'ContentToggle',
		'ConversationFilter',
		'ConversationSlider',
		'ConversationStage',
		'ConversationStageAem',
		'DatePicker',
		'FileUpload',
		'FlexRow',
		'FlyoutMenu',
		'Form',
		'Gallery',
		'HorizontalList',
		'HorizontalScroller',
		'LinkCarousel',
		'List',
		'MainNavigation',
		'Map',
		'MultiFileUpload',
		'MultiStepForm',
		'OnlineCheck',
		'OptionSelector',
		'OrderedList',
		'ProcessLayout',
		'ProductComparison',
		'ProtectionForestMap',
		'PulloutMenu',
		'RadioGroup',
		'ScreenOverlay',
		'SearchOverlay',
		'SidebarNavigation',
		'SidebarOverlay',
		'SlideShow',
		'SocialSharing',
		'SocialWall',
		'Table',
		'TextMedia',
		'VerticalScroller',
		'VerticalSeparator',
	];

	const atoms = [];
	const molecules = [];

	for (let i = 0; i < projectModuleCountMultiplier; i++) {
		atoms.push(...baseAtoms.map((atom) => atom + i));
		molecules.push(...baseMolecules.map((molecule) => molecule + i));
	}

	const rootPath = 'src';
	const options = { typescript: transpiler === 'typescript' };

	await rimrafAsync(rootPath);
	await rimrafAsync('tsconfig.json');

	await Promise.all([
		generateComponents(rootPath + '/components/atoms', atoms, options),
		generateComponents(rootPath + '/components/molecules', molecules, options),
	]);

	const componentPaths = atoms
		.map((atom) => [atom, 'components/atoms/' + atom])
		.concat(molecules.map((molecule) => [molecule, 'components/molecules/' + molecule]));

	const indexFileContent = `
		import React from 'react';
		import {render} from 'react-dom';

		${componentPaths.map(([name, modulePath]) => `import ${name} from './${modulePath}';`).join('\n')}

		const App = () => (
			<ul>
				${new Date()}
				${componentPaths.map(([name]) => `<${name} />`).join('\n')}
			</ul>
		);

		render(<App />, document.getElementById('root'));
	`;

	await writeFileAsync(rootPath + '/index.' + (transpiler === 'typescript' ? 'tsx' : 'js'), indexFileContent);

	const tsConfig = {
		compilerOptions: {
			/* Basic Options */
			target:
				'es5' /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
			module:
				'ESNext' /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
			lib: ['dom', 'es2017'] /* Specify library files to be included in the compilation. */,
			// "allowJs": true,                       /* Allow javascript files to be compiled. */
			// "checkJs": true,                       /* Report errors in .js files. */
			jsx: 'react' /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
			// "declaration": true,                   /* Generates corresponding '.d.ts' file. */
			// "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
			// "sourceMap": true,                     /* Generates corresponding '.map' file. */
			// "outFile": "./",                       /* Concatenate and emit output to single file. */
			// "outDir": "./",                        /* Redirect output structure to the directory. */
			// "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
			// "composite": true,                     /* Enable project compilation */
			// "removeComments": true,                /* Do not emit comments to output. */
			// "noEmit": true,                        /* Do not emit outputs. */
			// "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
			// "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
			// "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

			/* Strict Type-Checking Options */
			strict: true /* Enable all strict type-checking options. */,
			noImplicitAny: false /* Raise error on expressions and declarations with an implied 'any' type. */,
			// "strictNullChecks": true,              /* Enable strict null checks. */
			// "strictFunctionTypes": true,           /* Enable strict checking of function types. */
			// "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
			// "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
			// "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

			/* Additional Checks */
			// "noUnusedLocals": true,                /* Report errors on unused locals. */
			// "noUnusedParameters": true,            /* Report errors on unused parameters. */
			// "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
			// "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

			/* Module Resolution Options */
			moduleResolution:
				'node' /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
			// "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
			// "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
			// "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
			// "typeRoots": [],                       /* List of folders to include type definitions from. */
			// "types": [],                           /* Type declaration files to be included in compilation. */
			// "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
			esModuleInterop: true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
			// "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

			/* Source Map Options */
			// "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
			// "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
			// "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
			// "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

			/* Experimental Options */
			experimentalDecorators: true /* Enables experimental support for ES7 decorators. */,
			// "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */,
			skipLibCheck: true,
		},
	};

	if (transpiler === 'typescript') {
		await writeFileAsync('./tsconfig.json', JSON.stringify(tsConfig, null, 2));
	}

	process.chdir(cwdBefore);
	return atoms.length + molecules.length;
}

async function generateComponents(rootPath, componentNames, { typescript, scss }) {
	const components = componentNames.map((component) => JSON.stringify('components/' + component)).join(' ');
	const options = ['--notest', typescript && '--typescript', scss && '--scss'].filter((option) => option).join(' ');
	return await execAsync(
		`node ${require.resolve('create-react-component-folder')} ${options} "${rootPath}/${
			componentNames[0]
		}" ${components}`,
		{ maxBuffer: 1024 * 1000 }
	);
}

module.exports = {
	generateProject,
};
