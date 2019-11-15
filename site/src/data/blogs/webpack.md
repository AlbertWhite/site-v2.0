---
title: "Webpack configuration for react"
date: "2019-03-14"
---

In order to work with react, we need an environment for compiling es6 and jsx, besides that, we need to support import css and files into javascript files. Webpack is a good choice for working with react, but we should notice that **webpack is not only for react**, and react can work with other compile tools, like [React scripts](https://www.npmjs.com/package/react-scripts) used by [Create react app](https://github.com/facebook/create-react-app). If it is only for react, what is the most suitable scenario for using webpack?

### What is webpack used for?

To me, **the basic idea is importing modules (js, css, imgs...)**.

Remember the old time when we include all the libraries at one time in the end of the body tag? At that time, we prefer to put all the css file into a folder like dist/css, all the images into a folder like dist/images. At that time, with gulp/grunt+jquery+jquery plugins, we have created wonders. However, the way like that causes two problems:

1. **Window scope pollution**. When we import all the libraries at one time, all the js can use all the libraries, but in fact it is not in need.
2. **Mess for managing the path of css and other assets**. Yes it is painful to find the right assets with a complicated path.

Now, webpack comes. The basic idea is that we can put css, img, js in one folder, and we can import css and img into the js file. If you have experience with React, I believe you are familiar with the idea.

Besides importing modules, webpack takes the ideas of task runners like gulp and grunt. With the modules and plugins, webpack can be used to:
Create a dev server and watch for changes
Build mifinied and uglified bundle for distribution version
Parse scss, jsx, typescripts...

In general, webpack can replace gulp and grunt as a task runner, but more imporantly, if we decide to use webpack, we need to use the methodology of importing modules instead of including libraries in the end.

### Let's do the configuration for react step by step

Find the old tutorial of webpack long and hard to grasp the idea? Yes I have the same idea too. But luckily, the guys from webpack have reorganized the [tutorial](https://webpack.js.org/concepts/), it is more clear and easier to grasp the idea. Well, the following content is about configuring the working environment step by step. I recommend to read the tutorial from webpack directly but if you want to save some time to have a general idea, please continue reading.

In order to understand the configuration for working with react step by step, I create several [demos](https://github.com/AlbertWhite/webpack-demos):

- [demo01](https://github.com/AlbertWhite/webpack-demos/tree/master/demo01-create%20bundle-import%20module) - create bundle and import module. In this demo, we can the webpack command to compile bundles.
- [demo02](https://github.com/AlbertWhite/webpack-demos/tree/master/demo02-add%20npm%20scripts%20and%20webpack%20configuration%20file) - add npm scripts and webpack configuration file. Insead of using webpack command everytime, we add a configuration file and npm scripts for building bundles.
- [demo03](https://github.com/AlbertWhite/webpack-demos/tree/master/demo03-assets%20management) - assets management. In this demo, we use different modules to parse different kinds of files, including **style-loader, css-loader, file-loader**.
- [demo04](https://github.com/AlbertWhite/webpack-demos/tree/master/demo04-output%20management) - output management. In this demo, we have to compile to multiple bundles, and we use **HtmlWebpackPlugin** for creating the html dynamicly.
- [demo05](https://github.com/AlbertWhite/webpack-demos/tree/master/demo05-development) - development mode. Introducing devtool (source-map) and devServer.
- [demo06](https://github.com/AlbertWhite/webpack-demos/tree/master/demo06-production) - production mode. Introducing **uglifyjs-webpack-plugin** to clean js.

Now let's look at the configuration for the react, here is the [link](https://github.com/AlbertWhite/webpack-demos/tree/master/demo07-react-example) :

```js
// webpack.common.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") //for creating html dynamicly
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

Hope this article helps you. Don't hesitate to look for the documentation of webpack for the best tutorials. Thanks for reading!
