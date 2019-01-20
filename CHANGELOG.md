# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.1](https://github.com/namics/webpack-config-plugins/compare/v1.3.0...v1.3.1) (2019-01-20)


### Bug Fixes

* **common-config-webpack-plugin:** Update typescript ([64d144c](https://github.com/namics/webpack-config-plugins/commit/64d144c))





# [1.3.0](https://github.com/namics/webpack-config-plugins/compare/v1.2.1...v1.3.0) (2019-01-20)


### Bug Fixes

* **webpack-dev-server:** vulnerability CVE-2018-14732 ([ff5863f](https://github.com/namics/webpack-config-plugins/commit/ff5863f))


### Features

* **js-config-webpack-plugin:** Update thread-loader ([35af119](https://github.com/namics/webpack-config-plugins/commit/35af119))
* **ts-config-webpack-plugin:** Allow to use .tsx files without creating a custom tsconfig ([e680c20](https://github.com/namics/webpack-config-plugins/commit/e680c20))
* **ts-config-webpack-plugin:** Update thread-loader ([fca6d8f](https://github.com/namics/webpack-config-plugins/commit/fca6d8f))





## [1.2.1](https://github.com/namics/webpack-config-plugins/compare/v1.2.0...v1.2.1) (2019-01-02)


### Bug Fixes

* **ts-config-webpack-plugin:** Add missing module-resolution property ([3dc7b60](https://github.com/namics/webpack-config-plugins/commit/3dc7b60))





# [1.2.0](https://github.com/namics/webpack-config-plugins/compare/v1.1.0...v1.2.0) (2018-12-21)


### Bug Fixes

* **js-config-webpack-plugin:** Upgrade thread-loader to improve incremental build speed ([1af6614](https://github.com/namics/webpack-config-plugins/commit/1af6614))
* **ts-config-webpack-plugin:** Upgrade thread-loader to improve incremental build speed ([f211143](https://github.com/namics/webpack-config-plugins/commit/f211143))


### Features

* **ts-config-webpack-plugin:** Add a warning if no moduleResultion is set ([f3a4946](https://github.com/namics/webpack-config-plugins/commit/f3a4946))


### Performance Improvements

* Add performance measurements ([ec6baf4](https://github.com/namics/webpack-config-plugins/commit/ec6baf4))





# [1.1.0](https://github.com/namics/webpack-config-plugins/compare/v1.0.0...v1.1.0) (2018-12-11)


### Bug Fixes

* **cli:** Add node hashbang ([0586787](https://github.com/namics/webpack-config-plugins/commit/0586787))


### Features

* **ts-config-webpack-plugin:** Warn if skipLibCheck wasn't configured ([935b91a](https://github.com/namics/webpack-config-plugins/commit/935b91a))





# [1.0.0](https://github.com/namics/webpack-config-plugins/compare/v0.4.4...v1.0.0) (2018-11-29)


### Features

* **scss-config-webpack-plugin:** Use webpack output configuration for css files ([#17](https://github.com/namics/webpack-config-plugins/issues/17)) ([2a29524](https://github.com/namics/webpack-config-plugins/commit/2a29524)), closes [#15](https://github.com/namics/webpack-config-plugins/issues/15)
* **ts-config-webpack-plugin:** improve performance by adding more cpu cores for the type-checker ([49ef8c6](https://github.com/namics/webpack-config-plugins/commit/49ef8c6))


### BREAKING CHANGES

* **scss-config-webpack-plugin:** The generated css files will have the same basenames like the js files.





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
