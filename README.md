# Pluggable webpack configurations

[![NPM version](https://badge.fury.io/js/common-config-webpack-plugin.svg)](https://www.npmjs.com/package/common-config-webpack-plugin) 
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack *loader* configurations can be quite time consuming.  
This project tries to provide best practices for the most common **loader** requirements: `ts`, `js`, `css`, `fonts` and `images`.

Instead of copying loader configs from github and stackoverflow you could just add one of the following plugins.

## Zero Config example

Webpack itself provides many defaults so you are able to run the `common-config-webpack-plugin` without a webpack.config file:

```bash
npm i --save-dev webpack-cli webpack typescript common-config-webpack-plugin

npx webpack --plugin common-config-webpack-plugin
```

## Webpack Config

Many projects will need some project specific options.  
The `common-config-webpack-plugin` suite is designed to be plugable so you will be 
able to pick only what you need and combine it with your configuration.  
By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

```
common-config-webpack-plugin
  ├── js-config-webpack-plugin
  ├── ts-config-webpack-plugin
  ├── scss-config-webpack-plugin
  └── asset-config-webpack-plugin
      ├── font-config-webpack-plugin
      └── image-config-webpack-plugin
```

### Use them all

To get started you can just add all `common-config-webpack-plugin` parts at once.

```js
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');

module.exports = {
    plugins: [
        new CommonConfigWebpackPlugin()
    ]
}
```

Which would be exactly the same as 

```js
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');

module.exports = {
    plugins: [
        new JsConfigWebpackPlugin(),
        new TsConfigWebpackPlugin(),
        new ScssConfigWebpackPlugin(),
        new FontConfigWebpackPlugin(),
        new ImageConfigWebpackPlugin(),
    ]
}
```


### Use only typescript (.ts & .tsx)

The `ts-config-webpack-plugin` is a modified version of the [ts-loader best practices](https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js).  
By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

```js
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
module.exports = {
    plugins: [
        new TsConfigWebpackPlugin()
    ]
}
```


### Use only styles (.css & .scss)

The `scss-config-webpack-plugin` is a modified version of the [create-react-app best practices](https://github.com/facebook/create-react-app/tree/52449c34eedc53e50a2a159d38604ea7df5bd997/packages/react-scripts/config).  
By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

```js
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
module.exports = {
    plugins: [
        new ScssConfigWebpackPlugin()
    ]
}
```


### Use only assets (Font & Images)

The `asset-config-webpack-plugin` is just a wrapper around the `font-config-webpack-plugin` and the `image-config-webpack-plugin`.

```js
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
module.exports = {
    plugins: [
        new AssetConfigWebpackPlugin()
    ]
}
```


### Use only fonts (.woff & .woff2)

The `font-config-webpack-plugin` will allow you to use [woff-fonts](https://caniuse.com/#feat=woff).

```js
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
module.exports = {
    plugins: [
        new FontConfigWebpackPlugin()
    ]
}
```


### Use only images (.gif & .jpg & .jpeg &. png &. svg)

The `font-config-webpack-plugin` will allow you to use [woff-fonts](https://caniuse.com/#feat=woff).

```js
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
module.exports = {
    plugins: [
        new FontConfigWebpackPlugin()
    ]
}
```

## Quality checks

The `common-config-webpack-plugin` suite provides typechecks and integration tests for the loader configurations.   
