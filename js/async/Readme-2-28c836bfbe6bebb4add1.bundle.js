(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{335:function(n,e){n.exports="<div align=\"center\">\n    <br>\n    <br>\n    <img width=\"200\" height=\"200\" src=\"https://github.com/namics/webpack-config-plugins/raw/master/logo.png\" />\n    <img width=\"200\" height=\"200\" src=\"https://github.com/namics/webpack-config-plugins/raw/master/plug.png\" />\n    <br>\n    <br>\n\n[![NPM version](https://badge.fury.io/js/common-config-webpack-plugin.svg)](https://www.npmjs.com/package/common-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n[![Appveyor](https://ci.appveyor.com/api/projects/status/9aes52639g1uwk89/branch/master?svg=true)](https://ci.appveyor.com/project/namics/webpack-config-plugins/branch/master)\n[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)\n\n[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)\n[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)\n[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)\n<br>\n<br>\n\n# Pluggable webpack configurations\n\nCreating webpack _loader_ configurations can be quite time consuming.  \nThis project tries to provide best practices for the most common **loader** requirements: `ts`, `js`, `css`, `fonts` and `images`.\n\nInstead of copying loader configs from github and stackoverflow you could just add one of the following plugins.\n\n<br>\n<br>\n</div>\n\n## Zero Config example\n\nWebpack itself provides many defaults so you are able to run the `common-config-webpack-plugin` without a webpack.config file:\n\n```bash\nnpm i --save-dev webpack webpack-cli common-config-webpack-plugin\n\nnpx webpack --plugin common-config-webpack-plugin\n```\n\n<div align=\"center\">\n\n![Demo](https://github.com/namics/webpack-config-plugins/raw/master/preview.gif)\n\n</div>\n\n\n## Zero Config [webpack-dev-server](https://github.com/webpack/webpack-dev-server) example\n\nYou can even setup an entire development server without configuration:\n\n```bash\nnpm i --save-dev webpack common-config-webpack-plugin html-webpack-plugin\n\nwebpack-dev-server --plugin common-config-webpack-plugin --plugin html-webpack-plugin\n```\n\n<div align=\"center\">\n\n![Demo](https://github.com/namics/webpack-config-plugins/raw/master/preview-dev-server.gif)\n\n</div>\n\n\n\n## Webpack Config\n\nMany projects will need some project specific options.  The `common-config-webpack-plugin` suite is designed to be plugable so you will be able to pick only what you need and combine it with your configuration. By default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.\n\n```\ncommon-config-webpack-plugin\n  ├── js-config-webpack-plugin\n  ├── ts-config-webpack-plugin\n  ├── scss-config-webpack-plugin\n  └── asset-config-webpack-plugin\n      ├── font-config-webpack-plugin\n      └── image-config-webpack-plugin\n```\n\n### Use them all\n\nTo get started you can just add all `common-config-webpack-plugin` parts at once.\n\n```js\nconst CommonConfigWebpackPlugin = require('common-config-webpack-plugin');\n\nmodule.exports = {\n    plugins: [new CommonConfigWebpackPlugin()],\n};\n```\n\nWhich would be exactly the same as\n\n```js\nconst JsConfigWebpackPlugin = require('js-config-webpack-plugin');\nconst TsConfigWebpackPlugin = require('ts-config-webpack-plugin');\nconst ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');\nconst FontConfigWebpackPlugin = require('font-config-webpack-plugin');\nconst ImageConfigWebpackPlugin = require('image-config-webpack-plugin');\n\nmodule.exports = {\n    plugins: [\n        new JsConfigWebpackPlugin(),\n        new TsConfigWebpackPlugin(),\n        new ScssConfigWebpackPlugin(),\n        new FontConfigWebpackPlugin(),\n        new ImageConfigWebpackPlugin(),\n    ],\n};\n```\n\n### Use only javascript (.js & .jsx & .mjs)\n\n[![NPM version](https://badge.fury.io/js/js-config-webpack-plugin.svg)](https://www.npmjs.com/package/js-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n\n🗒️[`js-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin)  \n⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/development.config.js)  \n⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/js-config-webpack-plugin/config/production.config.js)\n\nThe `js-config-webpack-plugin` is a modified version of the [create-react-app best practices](https://github.com/facebook/create-react-app/tree/52449c34eedc53e50a2a159d38604ea7df5bd997/packages/react-scripts/config).  \nBy default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.\n\n```js\nconst JsConfigWebpackPlugin = require('js-config-webpack-plugin');\nmodule.exports = {\n    plugins: [new JsConfigWebpackPlugin()],\n};\n```\n\n### Use only typescript (.ts & .tsx)\n\n[![NPM version](https://badge.fury.io/js/ts-config-webpack-plugin.svg)](https://www.npmjs.com/package/ts-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n\n🗒️[`ts-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin)  \n⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/ts-config-webpack-plugin/config/development.config.js)  \n⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/ts-config-webpack-plugin/config/production.config.js)\n\nThe `ts-config-webpack-plugin` is a modified version of the [ts-loader best practices](https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js).  \nBy default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.\n\n```js\nconst TsConfigWebpackPlugin = require('ts-config-webpack-plugin');\nmodule.exports = {\n    plugins: [new TsConfigWebpackPlugin()],\n};\n```\n\n### Use only styles (.css & .scss)\n\n[![NPM version](https://badge.fury.io/js/scss-config-webpack-plugin.svg)](https://www.npmjs.com/package/scss-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n\n🗒️[`scss-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin)  \n⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/scss-config-webpack-plugin/config/development.config.js)  \n⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/scss-config-webpack-plugin/config/production.config.js)\n\nThe `scss-config-webpack-plugin` is a modified version of the [create-react-app best practices](https://github.com/facebook/create-react-app/tree/52449c34eedc53e50a2a159d38604ea7df5bd997/packages/react-scripts/config).  \nBy default the plugin configuration will adjust depending on your [webpack mode](https://webpack.js.org/concepts/mode/) setting.\n\n```js\nconst ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');\nmodule.exports = {\n    plugins: [new ScssConfigWebpackPlugin()],\n};\n```\n\n### Use only assets (Font & Images)\n\n[![NPM version](https://badge.fury.io/js/asset-config-webpack-plugin.svg)](https://www.npmjs.com/package/asset-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n\n🗒️[`asset-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin)\n\nThe `asset-config-webpack-plugin` is just a wrapper around the `font-config-webpack-plugin` and the `image-config-webpack-plugin`.\n\n```js\nconst AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');\nmodule.exports = {\n    plugins: [new AssetConfigWebpackPlugin()],\n};\n```\n\n### Use only fonts (.woff & .woff2)\n\n[![NPM version](https://badge.fury.io/js/font-config-webpack-plugin.svg)](https://www.npmjs.com/package/font-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n\n🗒️[`font-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/font-config-webpack-plugin)  \n⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/font-config-webpack-plugin/config/development.config.js)  \n⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/font-config-webpack-plugin/config/production.config.js)\n\nThe `font-config-webpack-plugin` will allow you to use [woff-fonts](https://caniuse.com/#feat=woff).\n\n```js\nconst FontConfigWebpackPlugin = require('font-config-webpack-plugin');\nmodule.exports = {\n    plugins: [new FontConfigWebpackPlugin()],\n};\n```\n\n### Use only images (.gif & .jpg & .jpeg & .png & .svg)\n\n[![NPM version](https://badge.fury.io/js/image-config-webpack-plugin.svg)](https://www.npmjs.com/package/image-config-webpack-plugin)\n[![Travis](https://img.shields.io/travis/namics/webpack-config-plugins/master.svg)](https://travis-ci.org/namics/webpack-config-plugins)\n\n🗒️[`image-config-webpack-plugin` Readme](https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin)  \n⚙️[development `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/image-config-webpack-plugin/config/development.config.js)  \n⚙️[production `webpack.config.js`](https://github.com/namics/webpack-config-plugins/raw/master/packages/image-config-webpack-plugin/config/production.config.js)\n\nThe `image-config-webpack-plugin` will allow you to use images from within js and css files.\n\n```js\nconst ImageConfigWebpackPlugin = require('image-config-webpack-plugin');\nmodule.exports = {\n    plugins: [new ImageConfigWebpackPlugin()],\n};\n```\n\n## Quality checks\n\nThe `common-config-webpack-plugin` suite provides typechecks and integration tests for the loader configurations for Windows and Unix.\n\n## Peer dependencies\n\nThe `common-config-webpack-plugin` has a direct dependencies to babel and ts.  \nHowever if you need to pick a specific version you can use the `js-config-webpack-plugin` or `ts-config-webpack-plugin` which use peer-dependencies instead.\n\n## License\n\nThe `common-config-webpack-plugin` is [MIT licensed](./LICENSE).\n"},356:function(n,e,i){"use strict";i.r(e),i.d(e,"Readme",function(){return t});var c=i(0),s=i.n(c),o=i(282),a=i.n(o),p=i(17),g=i(335),t=Object(p.withStyles)(function(n){return{root:{"& img":{maxWidth:"100%"},"& a":{color:n.palette.primary.main}}}})(function(n){return s.a.createElement("div",{className:n.classes.root},s.a.createElement(a.a,{markdown:g,options:{html:!0}}))})}}]);
//# sourceMappingURL=Readme-2-28c836bfbe6bebb4add1.bundle.js.map