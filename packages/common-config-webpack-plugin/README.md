[![NPM version](https://badge.fury.io/js/common-config-webpack-plugin.svg)](https://www.npmjs.com/package/common-config-webpack-plugin) 
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

# common-config-webpack-plugin

Creating a webpack *loader* configurations can be quite time consuming.  
The `common-config-webpack-plugin` is a suite which tries to provide best practices for the most common **loader** requirements.  

By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

## Installation

```bash
npm i --save-dev common-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
module.exports = {
    plugins: [
        new CommonConfigWebpackPlugin()
    ]
}
```

## Fine tune configuration

The `common-config-webpack-plugin` is just a small convince wrapper arround different config plugins which can all used independently:

```
common-config-webpack-plugin
  ├── js-config-webpack-plugin
  ├── ts-config-webpack-plugin
  ├── scss-config-webpack-plugin
  └── asset-config-webpack-plugin
      ├── font-config-webpack-plugin
      └── image-config-webpack-plugin
```
