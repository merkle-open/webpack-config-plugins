[![NPM version](https://badge.fury.io/js/ts-config-webpack-plugin.svg)](https://www.npmjs.com/package/ts-config-webpack-plugin) 
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

# ts-config-webpack-plugin

Creating a webpack *loader* configurations can be quite time consuming.  
The `ts-config-webpack-plugin` is part of the `common-config-webpack-plugin` suite which tries to provide best practices for the most common **loader** requirements.  

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
