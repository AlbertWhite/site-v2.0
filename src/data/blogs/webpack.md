---
title: "Webpack configuration for react development"
date: "2019-03-14"
category: "blog"
star: 3
keyword: "react"
---

In order to work with react, we need an environment for compiling es6 and jsx, besides that, we need to support import css and images into javascript. Webpack is a good choice for working with that, but we should notice that **webpack is not only for react**, and react can work with other compile tools, like [browserify](http://browserify.org/).

In this article, we will talk with webpack for react.

### What is webpack used for?

The basic idea is importing modules (js, css, imgs...).

Remember the old time when we need to include all the libraries in the end of the body tag? At that time, we prefer to put all the css file into a folder like dist/css, all the images into a folder like dist/images in order to import by hand. At that time, we created wonders with gulp/grunt and jquery plugins. It indeed works at that time, but there are two possible problems:

1. **Window scope pollution**. When we import all the libraries at one time, all the libraries are accessible in the global scope.

2. **Mess with managing the path of css and other assets**. It is painful to find the right assets with a complicated path.

Now, webpack comes to solve this problem. With webpack, we can organise the assets by functionalities but not by file types: js file, css file, and even images can be put in the same folder. If you have experience with React, I believe you are familiar with the idea.

Besides importing modules, webpack takes the ideas of task runners like gulp and grunt. With the modules and plugins, webpack can be used to:

- Create a dev server and watch for changes
- Build minified and uglified bundle for distribution version
- Parse scss, jsx, typescripts...

In general, webpack can replace gulp and grunt as a task runner, and more importantly, with webpack, we can and should use the methodology of importing modules.

### Webpack configuration for react step by step

Webpack is not only for react, so its [tutorial](https://webpack.js.org/concepts/) is not react oriented. It is good to understand the basic idea from its tutorial, but if you want to have several demos for react from 0 to 100, I create several [demos](https://github.com/AlbertWhite/webpack-demos):

- [demo01](https://github.com/AlbertWhite/webpack-demos/tree/master/demo01-create%20bundle-import%20module) - create bundle and import module. In this demo, we use the webpack command to compile bundles.
- [demo02](https://github.com/AlbertWhite/webpack-demos/tree/master/demo02-add%20npm%20scripts%20and%20webpack%20configuration%20file) - add npm scripts and webpack configuration file. Instead of using webpack command every time, we add a configuration file and npm scripts for building bundles.
- [demo03](https://github.com/AlbertWhite/webpack-demos/tree/master/demo03-assets%20management) - assets management. In this demo, we use different modules to parse different kinds of files, including **style-loader, css-loader, file-loader**.
- [demo04](https://github.com/AlbertWhite/webpack-demos/tree/master/demo04-output%20management) - output management. In this demo, we have to compile into multiple bundles, and we use **HtmlWebpackPlugin** for creating the html dynamically.
- [demo05](https://github.com/AlbertWhite/webpack-demos/tree/master/demo05-development) - development mode. Introducing devtool (source-map) and devServer.
- [demo06](https://github.com/AlbertWhite/webpack-demos/tree/master/demo06-production) - production mode. Introducing **uglifyjs-webpack-plugin** to uglify js.

Now let's look at the configuration for the react, here is the [link](https://github.com/AlbertWhite/webpack-demos/tree/master/demo07-react-example) :

```js
// webpack.common.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") //for creating html dynamically
const CleanWebpackPlugin = require("clean-webpack-plugin") //clean dist every time before build

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "react",
      template: "./src/index.html", //use this file as template
    }),
  ],
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader", //in order to use babel-loader, need to add .babelrc file for the configuration.
        },
      },
      {
        test: /.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /.(woff|woff2|eot|)$/,
        use: ["file-loader"],
      },
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
}
```

```js
// webpack.dev.js
const merge = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  devtool: "inline-source-map", //allow source map
  devServer: {
    contentBase: "./dist",
  },
})
```

```js
// webpack.prod.js
const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
})
```

```js
      //scripts in package.json
      "scripts": {
        "build": "webpack --config webpack.prod.js",
        "watch": "webpack --watch --config webpack.dev.js",
        "start": "webpack-dev-server --open --config webpack.dev.js"
      }
```

Here is the configuration ! We should also note that it is just the basic configuration and it is just one type of implementaion. The potential is huge with the ecosystem of ecosystem webpack.

Hope this article helps. Thanks for reading!
