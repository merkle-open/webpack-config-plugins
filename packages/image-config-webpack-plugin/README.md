# image-config-webpack-plugin

[![NPM version](https://badge.fury.io/js/image-config-webpack-plugin.svg)](https://www.npmjs.com/package/image-config-webpack-plugin)
[![Build Status](https://github.com/merkle-open/webpack-config-plugins/workflows/ci/badge.svg?branch=master)](https://github.com/merkle-open/webpack-config-plugins/actions)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack _loader_ configurations can be quite time consuming.  
The `image-config-webpack-plugin` is part of the [`common-config-webpack-plugin` suite](https://github.com/merkle-open/webpack-config-plugins) which tries to provide best practices for the most common **loader** requirements.

If no mode is explicitly set for the plugin the configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.  
⚙️[development mode `webpack.config.js`](https://github.com/merkle-open/webpack-config-plugins/raw/master/packages/image-config-webpack-plugin/config/development.config.js)
⚙️[production mode `webpack.config.js`](https://github.com/merkle-open/webpack-config-plugins/raw/master/packages/image-config-webpack-plugin/config/production.config.js)

## Installation

```bash
npm i --save-dev image-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');
module.exports = {
  plugins: [new ImageConfigWebpackPlugin()],
};
```

### Changing the image file name

By default the `image-config-webpack-plugin` adds a md5 hash of the image files content to the file name
to allow [long-term-caching](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching).

For example: `static/media/burger.c8ffdeb3.png`

To change the file name path an option called `name` can be passed to the `image-config-webpack-plugin`.  
The `name` option supports different [placeholders](https://github.com/webpack-contrib/file-loader#placeholders).

```js
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');
module.exports = {
  plugins: [
    new ImageConfigWebpackPlugin({
      name: 'media/[ext]/[name].[hash:7].[ext]',
    }),
  ],
};
```
