[![NPM version](https://badge.fury.io/js/asset-config-webpack-plugin.svg)](https://www.npmjs.com/package/asset-config-webpack-plugin) 
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

# asset-config-webpack-plugin

Creating a webpack *loader* configurations can be quite time consuming.  
The `asset-config-webpack-plugin` is part of the `common-config-webpack-plugin` suite which tries to provide best practices for the most common **loader** requirements.  

## Installation

```bash
npm i --save-dev asset-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
module.exports = {
    plugins: [
        new AssetConfigWebpackPlugin()
    ]
}
```

## Fine tune asset configuration

The `asset-config-webpack-plugin` is just a small convince wrapper arround the `image-config-plugin` and the `font-config-plugin` npm packages.  
For more control please use the `image-config-plugin` and/or the `font-config-plugin` instead of the `asset-config-webpack-plugin`.
