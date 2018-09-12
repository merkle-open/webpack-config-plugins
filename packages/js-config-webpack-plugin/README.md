# js-config-webpack-plugin

[![NPM version](https://badge.fury.io/js/js-config-webpack-plugin.svg)](https://www.npmjs.com/package/js-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![Appveyor](https://ci.appveyor.com/api/projects/status/9aes52639g1uwk89/branch/master?svg=true)](https://ci.appveyor.com/project/namics/webpack-config-plugins/branch/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack _loader_ configurations can be quite time consuming.  
The `js-config-webpack-plugin` is part of the [`common-config-webpack-plugin` suite](https://github.com/namics/webpack-config-plugins) which tries to provide best practices for the most common **loader** requirements.

If no mode is explicitly set for the plugin the configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

⚙️[development mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/development.config.js)
⚙️[production mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/production.config.js)

## Installation

```bash
npm i --save-dev js-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
module.exports = {
    plugins: [new JsConfigWebpackPlugin()],
};
```

### .babelrc

By default the `js-config-webpack-plugin` has defined a base .babelrc file which contains options for the babel compiler. If babel should use a specific .babelrc file, it's possible to pass the option `babelConfigFile` with the filepath to the correct .babelrc file.

-   `babelConfigFile`: Default `undefined`, a .babelrc file relative to the context is searched. If no option file is found the base file [`.babelrc.base.json`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/.babelrc.base.json) will be taken. When option contains a filepath, the configurations from the specified file will be used.

```js
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
module.exports = {
    plugins: [new JsConfigWebpackPlugin({ babelConfigFile: '/foo/bar/.babelrc' })],
};
```
