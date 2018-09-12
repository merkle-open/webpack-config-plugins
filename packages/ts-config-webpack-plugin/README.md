# ts-config-webpack-plugin

[![NPM version](https://badge.fury.io/js/ts-config-webpack-plugin.svg)](https://www.npmjs.com/package/ts-config-webpack-plugin) 
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![Appveyor](https://ci.appveyor.com/api/projects/status/9aes52639g1uwk89/branch/master?svg=true)](https://ci.appveyor.com/project/namics/webpack-config-plugins/branch/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack *loader* configurations can be quite time consuming.  
The `ts-config-webpack-plugin` is part of the [`common-config-webpack-plugin` suite](https://github.com/namics/webpack-config-plugins) which tries to provide best practices for the most common **loader** requirements.  

If no mode is explicitly set for the plugin the configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.
The injected configurations are based on [ts-loader thread-loader example](https://github.com/TypeStrong/ts-loader/tree/master/examples/thread-loader).  
⚙️[development mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/ts-config-webpack-plugin/config/development.config.js)
⚙️[production mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/ts-config-webpack-plugin/config/production.config.js)


## Installation

```bash
npm i --save-dev ts-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
module.exports = {
    plugins: [
        new TsConfigWebpackPlugin()
    ]
}
```

### tsconfig.json

By default the `ts-config-webpack-plugin` uses the [tsconfig](https://www.npmjs.com/package/tsconfig) plugin to locate the tsconfig file.  
To change the default location an option called `configFile` can be passed to the `ts-config-webpack-plugin`.  
If no configuration can be determined the src/config/tsconfig.base.json file will be used as fallback.

```js
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
module.exports = {
    plugins: [
        new TsConfigWebpackPlugin({ configFile: '/foo/bar/tsconfig.json' })
    ]
}
```
