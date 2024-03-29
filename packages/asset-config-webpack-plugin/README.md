# asset-config-webpack-plugin

[![NPM version](https://badge.fury.io/js/asset-config-webpack-plugin.svg)](https://www.npmjs.com/package/asset-config-webpack-plugin)
[![Build Status](https://github.com/merkle-open/webpack-config-plugins/workflows/ci/badge.svg?branch=master)](https://github.com/merkle-open/webpack-config-plugins/actions)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack _loader_ configurations can be quite time consuming.  
The `asset-config-webpack-plugin` is part of the [`common-config-webpack-plugin` suite](https://github.com/merkle-open/webpack-config-plugins) which tries to provide best practices for the most common **loader** requirements.

## Installation

```bash
npm i --save-dev asset-config-webpack-plugin
```

## Webpack Config

The `asset-config-webpack-plugin` is just a small convince wrapper around the `image-config-plugin` and the `font-config-plugin` npm packages.

```js
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
module.exports = {
  plugins: [new AssetConfigWebpackPlugin()],
};
```

For more control please use the `image-config-plugin` and/or the `font-config-plugin` instead of the `asset-config-webpack-plugin`.

```js
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');

module.exports = {
  plugins: [
    new FontConfigWebpackPlugin(),
    new ImageConfigWebpackPlugin(),
  ],
};
```
