[![NPM version](https://badge.fury.io/js/image-config-webpack-plugin.svg)](https://www.npmjs.com/package/image-config-webpack-plugin) 
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

# image-config-webpack-plugin

Creating a webpack *loader* configurations can be quite time consuming.  
The `image-config-webpack-plugin` is part of the `common-config-webpack-plugin` suite which tries to provide best practices for the most common **loader** requirements.  

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
    plugins: [
        new ImageConfigWebpackPlugin()
    ]
}
```

### Changing the fonts file name

By default the `image-config-webpack-plugin` adds a md5 hash of the font files content to the file name
to allow [long-term-caching](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching).

For example: `static/media/burger.c8ffdeb3.png` 

To change the file name path an option called `name` can be passed to the `image-config-webpack-plugin`.  
The `name` option supports different [placeholders](https://github.com/webpack-contrib/file-loader#placeholders).

```js
const ImageConfigWebpackPlugin = require('image-config-webpack-plugin');
module.exports = {
    plugins: [
        new ImageConfigWebpackPlugin({ name: 'fonts/[name].[ext]' })
    ]
}
```
