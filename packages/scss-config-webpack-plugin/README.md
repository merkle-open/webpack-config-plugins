# scss-config-webpack-plugin

[![NPM version](https://badge.fury.io/js/scss-config-webpack-plugin.svg)](https://www.npmjs.com/package/scss-config-webpack-plugin) 
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack *loader* configurations can be quite time consuming.  
The `scss-config-webpack-plugin` is part of the `common-config-webpack-plugin` suite which tries to provide best practices for the most common **loader** requirements.  

If no mode is explicitly set for the plugin the configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.
The injected configurations are based on [create-react-app css part](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts/config)

## Installation

```bash
npm i --save-dev scss-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
module.exports = {
    plugins: [
        new ScssConfigWebpackPlugin()
    ]
}
```

### css modules

 Just as create-react-app the scss-config-webpack-plugin supports CSS Modules with the extension `.module.css` or `.module.scss`.
