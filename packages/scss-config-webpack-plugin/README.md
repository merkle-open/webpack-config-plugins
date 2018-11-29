# scss-config-webpack-plugin

[![NPM version](https://badge.fury.io/js/scss-config-webpack-plugin.svg)](https://www.npmjs.com/package/scss-config-webpack-plugin) 
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![Appveyor](https://ci.appveyor.com/api/projects/status/9aes52639g1uwk89/branch/master?svg=true)](https://ci.appveyor.com/project/namics/webpack-config-plugins/branch/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

Creating a webpack *loader* configurations can be quite time consuming.  
The `scss-config-webpack-plugin` is part of the [`common-config-webpack-plugin` suite](https://github.com/namics/webpack-config-plugins) which tries to provide best practices for the most common **loader** requirements.  

If no mode is explicitly set for the plugin the configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.
The injected configurations are based on [create-react-app css part](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts/config)  
⚙️[development mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/scss-config-webpack-plugin/config/development.config.js)
⚙️[production mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/scss-config-webpack-plugin/config/production.config.js)


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

## Output filename

Webpack allows to configure the ouput file name for `javascript` files with `output.filename`.
By default the ScssConfigWebpackPlugin will reuse this option but will replace .js to .css and /js/ to /css/.

```js
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
module.exports = {
    output: {
        filename: 'js/app.js' 
    },
    plugins: [
        new ScssConfigWebpackPlugin() // Generates a new file called css/app.css
    ]
}
```

If this behaviour doesn't fit your needs you can set a different name using the `filename` option:

```js
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
module.exports = {
    plugins: [
        new ScssConfigWebpackPlugin({ filename: 'css/main.min.css' })
    ]
}
```


### css modules

 Just as create-react-app the scss-config-webpack-plugin supports CSS Modules with the extension `.module.css` or `.module.scss`.
