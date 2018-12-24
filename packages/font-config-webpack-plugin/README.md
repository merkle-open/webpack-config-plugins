[![NPM version](https://badge.fury.io/js/font-config-webpack-plugin.svg)](https://www.npmjs.com/package/font-config-webpack-plugin) 
[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)
[![Appveyor](https://ci.appveyor.com/api/projects/status/9aes52639g1uwk89/branch/master?svg=true)](https://ci.appveyor.com/project/namics/webpack-config-plugins/branch/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

# font-config-webpack-plugin

Creating a webpack *loader* configurations can be quite time consuming.  
The `font-config-webpack-plugin` is part of the [`common-config-webpack-plugin` suite](https://github.com/namics/webpack-config-plugins) which tries to provide best practices for the most common **loader** requirements.  

If no mode is explicitly set for the plugin the configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.  
⚙️[development mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/font-config-webpack-plugin/config/development.config.js)
⚙️[production mode `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/font-config-webpack-plugin/config/production.config.js)

## Installation

```bash
npm i --save-dev font-config-webpack-plugin
```

## Webpack Config

In most projects you will need to set up project specific options but you can still use all or
some common-config-webpack-plugin parts.

```js
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
module.exports = {
    plugins: [
        new FontConfigWebpackPlugin()
    ]
}
```

### Changing the fonts file name

By default the `font-config-webpack-plugin` adds a md5 hash of the font files content to the file name
to allow [long-term-caching](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching).

For example: `static/media/OpenSans-Regular-webfont.c8ffdeb3.woff` 

To change the file name path an option called `name` can be passed to the `font-config-webpack-plugin`.  
The `name` option supports different [placeholders](https://github.com/webpack-contrib/file-loader#placeholders).

```js
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
module.exports = {
    plugins: [
        new FontConfigWebpackPlugin({ name: 'fonts/[name].[ext]' })
    ]
}
```
