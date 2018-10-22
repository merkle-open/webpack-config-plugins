# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.4.4"></a>
## [0.4.4](https://github.com/namics/webpack-config-plugins/compare/v0.4.3...v0.4.4) (2018-10-22)


### Bug Fixes

* **scss-config-webpack-plugin:** Fix url paths of generated production css files ([fa48bdf](https://github.com/namics/webpack-config-plugins/commit/fa48bdf))




<a name="0.4.3"></a>
## [0.4.3](https://github.com/namics/webpack-config-plugins/compare/v0.4.2...v0.4.3) (2018-09-17)


### Bug Fixes

* **ts-config-webpack-plugin:** Fix "Debug Failure. False expression: Output generation failed" ([cf7aba4](https://github.com/namics/webpack-config-plugins/commit/cf7aba4))




<a name="0.4.2"></a>
## [0.4.2](https://github.com/namics/webpack-config-plugins/compare/v0.4.1...v0.4.2) (2018-09-12)




**Note:** Version bump only for package webpack-config-plugins

<a name="0.4.1"></a>
## [0.4.1](https://github.com/namics/webpack-config-plugins/compare/v0.4.0...v0.4.1) (2018-09-12)




**Note:** Version bump only for package webpack-config-plugins

<a name="0.4.0"></a>
# [0.4.0](https://github.com/namics/webpack-config-plugins/compare/v0.3.0...v0.4.0) (2018-08-30)


### Bug Fixes

* **scss-config-webpack-plugin:** Prevent double scss loader execution ([ac58784](https://github.com/namics/webpack-config-plugins/commit/ac58784))
* **ts-config-webpack-plugin:** Set the maximum memory during tests to 512mb ([be11937](https://github.com/namics/webpack-config-plugins/commit/be11937))


### Features

* **common-config-webpack-plugin:** add js-config-webpack-plugin to plugins list ([6f4c283](https://github.com/namics/webpack-config-plugins/commit/6f4c283))
* **common-config-webpack-plugin:** Set tyscript and babel as fixed dependency ([ee2308e](https://github.com/namics/webpack-config-plugins/commit/ee2308e))
* **js-config-webpack-plugin:** Create js-config-webpack-plugin ([fbc346b](https://github.com/namics/webpack-config-plugins/commit/fbc346b))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/namics/webpack-config-plugins/compare/v0.2.0...v0.3.0) (2018-08-13)


### Features

* **ts-config-webpack-plugin:** upgrade fork dep & drop unnessary config ([4e4215f](https://github.com/namics/webpack-config-plugins/commit/4e4215f))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/namics/webpack-config-plugins/compare/v0.1.0...v0.2.0) (2018-08-10)


### Features

* **common-config-plugin:** Create common-config-plugin ([a0ef9f7](https://github.com/namics/webpack-config-plugins/commit/a0ef9f7))
* **ts-config-webpack-plugin:** Provide a fallback tsconfig.json file ([1d504d2](https://github.com/namics/webpack-config-plugins/commit/1d504d2))




<a name="0.1.0"></a>
# 0.1.0 (2018-08-07)


### Bug Fixes

* **config-webpack-plugin:** fix typo issues and tapable interface ([43338f1](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/43338f1))
* **font-config-webpack-plugin:** change type of 'options' param ([a46cd57](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/a46cd57))
* **scss-config-webpack-plugin:** change type of 'options' param ([2850877](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/2850877))
* **ts:** add correct emitter settings ([6f23c7b](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/6f23c7b))
* **ts:** remove output dir in config to prevent output ([a71dbeb](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/a71dbeb))
* **ts-config-webpack-plugin:** change type of 'options' param ([bc25ea3](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/bc25ea3))
* **ts-config-webpack-plugin:** fix fork process plugin injection ([48d3766](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/48d3766))
* **ts-config-webpack-plugin:** remove dist files from tsc ([7397b0e](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/7397b0e))
* **TsConfigWebpackPlugin:** Remove devTool side effect ([929fc28](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/929fc28)), closes [#7](https://git.namics.com/namics-frontend/webpack-config-plugins/issues/7)
* Adjust package.json main fields ([3e3d95b](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/3e3d95b))
* **TsConfigWebpackPlugin:** Use isProductionLike similar to the webpack core ([e0fc773](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/e0fc773)), closes [#9](https://git.namics.com/namics-frontend/webpack-config-plugins/issues/9)


### Features

* **AssetConfigWebpackPlugin:** Add AssetConfigWebpackPlugin base ([bee510b](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/bee510b))
* **config-webpack-plugin:** add expose method for webpack api ([d725d8b](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/d725d8b))
* **config-webpack-plugin:** add option and tapable config capabilities, update tests ([4179092](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/4179092))
* **config-webpack-plugin:** implement exposable api ([abcb022](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/abcb022))
* **config-webpack-plugin:** improve expose method ([fcd4e62](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/fcd4e62))
* **config-webpack-plugin:** try add base implementation of all webpack config plugins ([193925c](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/193925c))
* **font-config-webpack-plugin:** add font config plugin base ([73f8bf6](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/73f8bf6))
* **FontConfigWebpackPlugin:** Use static folder for static media exports ([6c75fcf](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/6c75fcf))
* **github:** add issue and pull request templates ([65e5470](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/65e5470))
* **helper:** add shared helper package ([ed726a8](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/ed726a8))
* **ImageConfigWebpackPlugin:** Add ImageConfigWebpackPlugin ([0d7cf51](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/0d7cf51)), closes [#23](https://git.namics.com/namics-frontend/webpack-config-plugins/issues/23)
* **npm:** add clean script (alias for lerna clean) ([a1858da](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/a1858da))
* **scss-config-webpack-plugin:** Add flexbugs postcss plugin ([50b705a](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/50b705a)), closes [#5](https://git.namics.com/namics-frontend/webpack-config-plugins/issues/5)
* **scss-config-webpack-plugin:** Add separate DEV and PROD configs, fix loader and plugin issues an ([59047d7](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/59047d7))
* **scss-config-webpack-plugin:** Add tests for CSS modules ([e17ea02](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/e17ea02)), closes [#3](https://git.namics.com/namics-frontend/webpack-config-plugins/issues/3)
* **scss-config-webpack-plugin:** Basic SCSS Config with Tests ([3b03fa1](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/3b03fa1))
* **ScssConfigWebpackPlugin:** Add only safe css-nano transforms ([fd71656](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/fd71656)), closes [#22](https://git.namics.com/namics-frontend/webpack-config-plugins/issues/22)
* **ts-config-webpack-plugin:** add basic ts-config-webpack-plugin implementation and tests ([e3d0f22](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/e3d0f22))
* **TsConfigWebpackPlugin:** Add option to set the tsconfig file location ([5c66127](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/5c66127))
* Allow to set the mode to development or production ([aa1b23f](https://git.namics.com/namics-frontend/webpack-config-plugins/commits/aa1b23f))
