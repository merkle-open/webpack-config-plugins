# common-config-webpack-plugin

<div align="center">
    <br>
    <br>
    <img width="200" height="200" src="https://github.com/namics/webpack-config-plugins/raw/master/logo.png" />
    <img width="200" height="200" src="https://github.com/namics/webpack-config-plugins/raw/master/plug.png" />
    <br>
    <br>

[![NPM version](https://badge.fury.io/js/common-config-webpack-plugin.svg)](https://www.npmjs.com/package/common-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![Appveyor](https://ci.appveyor.com/api/projects/status/9aes52639g1uwk89/branch/master?svg=true)](https://ci.appveyor.com/project/namics/webpack-config-plugins/branch/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
<br>
<br>

# Pluggable webpack configurations

Creating webpack _loader_ configurations can be quite time consuming.  
This project tries to provide best practices for the most common **loader** requirements: `ts`, `js`, `css`, `fonts` and `images`.

Instead of copying loader configs from github and stackoverflow you could just add one of the following plugins.

<br>
<br>
</div>

## Zero Config example

Webpack itself provides many defaults so you are able to run the `common-config-webpack-plugin` without a webpack.config file:

```bash
npm i --save-dev webpack webpack-cli common-config-webpack-plugin

npx webpack --plugin common-config-webpack-plugin
```

<div align="center">

![Demo](https://github.com/namics/webpack-config-plugins/raw/master/preview.gif)

</div>


## Zero Config [webpack-dev-server](https://github.com/webpack/webpack-dev-server) example

You can even setup an entire development server without configuration:

```bash
npm i --save-dev webpack common-config-webpack-plugin html-webpack-plugin

webpack-dev-server --plugin common-config-webpack-plugin --plugin html-webpack-plugin
```

<div align="center">

![Demo](https://github.com/namics/webpack-config-plugins/raw/master/preview-dev-server.gif)

</div>



## Webpack Config

Many projects will need some project specific options.  The `common-config-webpack-plugin` suite is designed to be plugable so you will be able to pick only what you need and combine it with your configuration. By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

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
    plugins: [new CommonConfigWebpackPlugin()],
};
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
    ],
};
```

### Use only javascript (.js & .jsx & .mjs)

[![NPM version](https://badge.fury.io/js/js-config-webpack-plugin.svg)](https://www.npmjs.com/package/js-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)

🗒️[`js-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin)  
⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/development.config.js)  
⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/production.config.js)

The `js-config-webpack-plugin` is a modified version of the [create-react-app best practices](https://github.com/facebook/create-react-app/tree/52449c34eedc53e50a2a159d38604ea7df5bd997/packages/react-scripts/config).  
By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

```js
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
module.exports = {
    plugins: [new JsConfigWebpackPlugin()],
};
```

### Use only typescript (.ts & .tsx)

[![NPM version](https://badge.fury.io/js/ts-config-webpack-plugin.svg)](https://www.npmjs.com/package/ts-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)

🗒️[`ts-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin)  
⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/ts-config-webpack-plugin/config/development.config.js)  
⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/ts-config-webpack-plugin/config/production.config.js)

The `ts-config-webpack-plugin` is a modified version of the [ts-loader best practices](https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js).  
By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

```js
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
module.exports = {
    plugins: [new TsConfigWebpackPlugin()],
};
```

### Use only styles (.css & .scss)

[![NPM version](https://badge.fury.io/js/scss-config-webpack-plugin.svg)](https://www.npmjs.com/package/scss-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)

🗒️[`scss-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin)  
⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/scss-config-webpack-plugin/config/development.config.js)  
⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/scss-config-webpack-plugin/config/production.config.js)

The `scss-config-webpack-plugin` is a modified version of the [create-react-app best practices](https://github.com/facebook/create-react-app/tree/52449c34eedc53e50a2a159d38604ea7df5bd997/packages/react-scripts/config).  
By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.

```js
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
module.exports = {
    plugins: [new ScssConfigWebpackPlugin()],
};
```

### Use only assets (Font & Images)

[![NPM version](https://badge.fury.io/js/asset-config-webpack-plugin.svg)](https://www.npmjs.com/package/asset-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)

🗒️[`asset-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin)

The `asset-config-webpack-plugin` is just a wrapper around the `font-config-webpack-plugin` and the `image-config-webpack-plugin`.

```js
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
module.exports = {
    plugins: [new AssetConfigWebpackPlugin()],
};
```

### Use only fonts (.woff & .woff2)

[![NPM version](https://badge.fury.io/js/font-config-webpack-plugin.svg)](https://www.npmjs.com/package/font-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)

🗒️[`font-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/font-config-webpack-plugin)  
⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/font-config-webpack-plugin/config/development.config.js)  
⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/font-config-webpack-plugin/config/production.config.js)

The `font-config-webpack-plugin` will allow you to use [woff-fonts](https://caniuse.com/#feat=woff).

```js
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
module.exports = {
    plugins: [new FontConfigWebpackPlugin()],
};
```

### Use only images (.gif & .jpg & .jpeg & .png & .svg)

[![NPM version](https://badge.fury.io/js/image-config-webpack-plugin.svg)](https://www.npmjs.com/package/image-config-webpack-plugin)
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)

🗒️[`image-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin)  
⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/image-config-webpack-plugin/config/development.config.js)  
⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/image-config-webpack-plugin/config/production.config.js)

The `image-config-webpack-plugin` will allow you to use images from within js and css files.

```js
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');
module.exports = {
    plugins: [new ImageConfigWebpackPlugin()],
};
```

## Quality checks

The `common-config-webpack-plugin` suite provides typechecks and integration tests for the loader configurations for Windows and Unix.

## Peer dependencies

The `common-config-webpack-plugin` has a direct dependencies to babel and ts.  
However if you need to pick a specific version you can use the `js-config-webpack-plugin` or `ts-config-webpack-plugin` which use peer-dependencies instead.

## License

The `common-config-webpack-plugin` is [MIT licensed](./LICENSE).
