[![NPM version](https://badge.fury.io/js/common-config-webpack-plugin.svg)](https://www.npmjs.com/package/common-config-webpack-plugin) 
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

# Pluggable webpack configurations

Creating a webpack *loader* configurations can be quite time consuming.  
This project tries to provide best practices for the most common **loader** requirements: `ts`, `js`, `css`, `fonts` and `images`.

Instead of copying loader configs from github and stackoverflow you could just add one of the following plugins.

## Zero Config example

Webpack provides many defaults so you are able to run it without any configuration:

```bash
npm i --save-dev webpack-cli webpack common-config-webpack-plugin

npx webpack --plugin common-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

### Use them all

```js
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
module.exports = {
    plugins: [
        new CommonConfigWebpackPlugin()
    ]
}
```

### Use only typescript (.ts & .tsx)

```js
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
module.exports = {
    plugins: [
        new TsConfigWebpackPlugin()
    ]
}
```


### Use only styles (.css & .scss)

```js
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
module.exports = {
    plugins: [
        new ScssConfigWebpackPlugin()
    ]
}
```
