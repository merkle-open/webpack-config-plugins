# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/merkle-open/webpack-config-plugins/compare/v2.0.2...v2.0.3) (2021-05-20)

**Note:** Version bump only for package scss-config-webpack-plugin

## [2.0.2](https://github.com/merkle-open/webpack-config-plugins/compare/v2.0.1...v2.0.2) (2021-04-21)

### Bug Fixes

- **scss-config-webpack-plugin:** update dependencies ([5ef2bb5](https://github.com/merkle-open/webpack-config-plugins/commit/5ef2bb57ce42a3a335d63e125ac17b52cacc4f4d))
- **scss-config-webpack-plugin:** update dependencies ([22ee31a](https://github.com/merkle-open/webpack-config-plugins/commit/22ee31a88669cf4d6eec0368a84651895dd2e29c))
- **scss-config-webpack-plugin:** update postcss dependencies ([f4a4e11](https://github.com/merkle-open/webpack-config-plugins/commit/f4a4e1160eec9768be5fa27676e26a2715c6fd53))
- bump deps and cleanup package.json ([ed1f792](https://github.com/merkle-open/webpack-config-plugins/commit/ed1f7923a4b7258fa8d174c0a5fdef5ed2476aa0))
- update dependencies ([632a08d](https://github.com/merkle-open/webpack-config-plugins/commit/632a08d97e6e4db1a74483bab60534781415b0f9))

# [2.0.0](https://github.com/merkle-open/webpack-config-plugins/compare/v1.4.0...v2.0.0) (2020-03-18)

### Bug Fixes

- **scss-config-webpack-plugin:** Remove sourcemaps for production ([2f43c2e](https://github.com/merkle-open/webpack-config-plugins/commit/2f43c2ecd5b9ec30765ed8db309e0238abfdd183))

### Features

- Update dependencies ([19642f2](https://github.com/merkle-open/webpack-config-plugins/commit/19642f28ef1f400ca615467ad60117737349bb6a))
- **scss-config-webpack-plugin:** Upgrade mini-css-extract-plugin ([4f24b8d](https://github.com/merkle-open/webpack-config-plugins/commit/4f24b8d84751d4891d5f95658bc5a6c0b8b5974f))
- Upgrade webpack to 4.36 ([d61386f](https://github.com/merkle-open/webpack-config-plugins/commit/d61386f44026595efbbef8aa5b7ddd2463eaf4be))
- **scss-config-webpack-plugin:** Upgrade style-loader ([7599502](https://github.com/merkle-open/webpack-config-plugins/commit/75995027676d93d923e850295e216495c3524b02))
- **scss-config-webpack-plugin:** Upgrade style-loader ([4114dbd](https://github.com/merkle-open/webpack-config-plugins/commit/4114dbd607cce8da932a87b66d847bc9a4595226))
- **ts-config-webpack-plugin:** Upgrade ts-loader ([a632447](https://github.com/merkle-open/webpack-config-plugins/commit/a632447e6681ec7fdc9c702d754867b93f084b72))

### BREAKING CHANGES

- **scss-config-webpack-plugin:** CSS production sourcemaps have been removed for now
- **ts-config-webpack-plugin:** Drop support for node 6
- Requires webpack 4.36.0 or higher

# [1.4.0](https://github.com/merkle-open/webpack-config-plugins/compare/v1.3.4...v1.4.0) (2019-07-08)

### Features

- **scss-config-webpack-plugin:** Upgrade dependencies ([a099fe3](https://github.com/merkle-open/webpack-config-plugins/commit/a099fe3))

## [1.3.4](https://github.com/merkle-open/webpack-config-plugins/compare/v1.3.3...v1.3.4) (2019-06-09)

### Bug Fixes

- packages/scss-config-webpack-plugin/package.json to reduce vulnerabilities ([296c2b6](https://github.com/merkle-open/webpack-config-plugins/commit/296c2b6))

## [1.3.1](https://github.com/merkle-open/webpack-config-plugins/compare/v1.3.0...v1.3.1) (2019-01-20)

**Note:** Version bump only for package scss-config-webpack-plugin

# [1.3.0](https://github.com/merkle-open/webpack-config-plugins/compare/v1.2.1...v1.3.0) (2019-01-20)

**Note:** Version bump only for package scss-config-webpack-plugin

## [1.2.1](https://github.com/merkle-open/webpack-config-plugins/compare/v1.2.0...v1.2.1) (2019-01-02)

**Note:** Version bump only for package scss-config-webpack-plugin

# [1.0.0](https://github.com/merkle-open/webpack-config-plugins/compare/v0.4.4...v1.0.0) (2018-11-29)

### Features

- **scss-config-webpack-plugin:** Use webpack output configuration for css files ([#17](https://github.com/merkle-open/webpack-config-plugins/issues/17)) ([2a29524](https://github.com/merkle-open/webpack-config-plugins/commit/2a29524)), closes [#15](https://github.com/merkle-open/webpack-config-plugins/issues/15)

### BREAKING CHANGES

- **scss-config-webpack-plugin:** The generated css files will have the same basenames like the js files.

<a name="0.4.4"></a>

## [0.4.4](https://github.com/merkle-open/webpack-config-plugins/compare/v0.4.3...v0.4.4) (2018-10-22)

### Bug Fixes

- **scss-config-webpack-plugin:** Fix url paths of generated production css files ([fa48bdf](https://github.com/merkle-open/webpack-config-plugins/commit/fa48bdf))

<a name="0.4.2"></a>

## [0.4.2](https://github.com/merkle-open/webpack-config-plugins/compare/v0.4.1...v0.4.2) (2018-09-12)

**Note:** Version bump only for package scss-config-webpack-plugin

<a name="0.4.1"></a>

## [0.4.1](https://github.com/merkle-open/webpack-config-plugins/compare/v0.4.0...v0.4.1) (2018-09-12)

**Note:** Version bump only for package scss-config-webpack-plugin

<a name="0.4.0"></a>

# [0.4.0](https://github.com/merkle-open/webpack-config-plugins/compare/v0.3.0...v0.4.0) (2018-08-30)

### Bug Fixes

- **scss-config-webpack-plugin:** Prevent double scss loader execution ([ac58784](https://github.com/merkle-open/webpack-config-plugins/commit/ac58784))
- **ts-config-webpack-plugin:** Set the maximum memory during tests to 512mb ([be11937](https://github.com/merkle-open/webpack-config-plugins/commit/be11937))

### Features

- **common-config-webpack-plugin:** Set tyscript and babel as fixed dependency ([ee2308e](https://github.com/merkle-open/webpack-config-plugins/commit/ee2308e))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/merkle-open/webpack-config-plugins/compare/v0.2.0...v0.3.0) (2018-08-13)

**Note:** Version bump only for package scss-config-webpack-plugin

<a name="0.2.0"></a>

# [0.2.0](https://github.com/merkle-open/webpack-config-plugins/compare/v0.1.0...v0.2.0) (2018-08-10)

**Note:** Version bump only for package scss-config-webpack-plugin

<a name="0.1.0"></a>

# 0.1.0 (2018-08-07)

### Bug Fixes

- **scss-config-webpack-plugin:** change type of 'options' param ([2850877](https://github.com/merkle-open/webpack-config-plugins/commits/2850877))
- Adjust package.json main fields ([3e3d95b](https://github.com/merkle-open/webpack-config-plugins/commits/3e3d95b))

### Features

- Allow to set the mode to development or production ([aa1b23f](https://github.com/merkle-open/webpack-config-plugins/commits/aa1b23f))
- **scss-config-webpack-plugin:** Add flexbugs postcss plugin ([50b705a](https://github.com/merkle-open/webpack-config-plugins/commits/50b705a)), closes [#5](https://github.com/merkle-open/webpack-config-plugins/issues/5)
- **scss-config-webpack-plugin:** Add separate DEV and PROD configs, fix loader and plugin issues an ([59047d7](https://github.com/merkle-open/webpack-config-plugins/commits/59047d7))
- **scss-config-webpack-plugin:** Add tests for CSS modules ([e17ea02](https://github.com/merkle-open/webpack-config-plugins/commits/e17ea02)), closes [#3](https://github.com/merkle-open/webpack-config-plugins/issues/3)
- **scss-config-webpack-plugin:** Basic SCSS Config with Tests ([3b03fa1](https://github.com/merkle-open/webpack-config-plugins/commits/3b03fa1))
- **ScssConfigWebpackPlugin:** Add only safe css-nano transforms ([fd71656](https://github.com/merkle-open/webpack-config-plugins/commits/fd71656)), closes [#22](https://github.com/merkle-open/webpack-config-plugins/issues/22)
