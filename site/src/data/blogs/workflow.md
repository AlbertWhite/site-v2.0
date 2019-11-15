---
title: "How to better construct and ship your web application"
date: "2019-02-18"
---

Working in a development team is quite different from working alone or working with one person. Without shared configurations, rules and a good workflow, the more people working on the projet, the more likely the project becomes a mass. In contrast, building shared configurations, reasonable rules, and good workflow are like making good investement: **the team will earn benefits everyday with the productivity**. They also help with garanting the quality of the deliverable and shipping the application more efficiently.

In this article, I will talk about how to better construct and ship web application for a team with the following five subjects :

### 1. Code style and format

To begin with, we need to ensure that everyone has the same formatting of the code and the same eslint config if they are working for the same code base. It is painfully to try to find the real difference in a pull request if 80% of the difference comes from formatting.

In case of this, there are two places where we can look at:
Eslint
First of all, we need to integrate linter to the IDE for detecting the problemes automatiquely. Here is the guide for [how to integrate eslint to different kinds of IDE](https://eslint.org/docs/user-guide/integrations).
If your team have multiple projects to work on and you want to share the same eslint file, it is recommended to build shared configuration in eslint. Here is the famous example from [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). We can create the share the configuration as a node module with the name of 'eslint-config-your-linter", add to your project and **extends** it in your eslint config. When we extend it, we can write "your-linter" instead of "eslint-config-your-linter" because eslint will remove 'eslint-config' automatically.
Configuration in IDE
IDE has a configuration file for the rules of formatting, and here is an example of the [configuration file of vscode](https://code.visualstudio.com/docs/getstarted/settings). In addition, there are plugins for IDE for formatting the code and we have also the configurations for the plugins. Here is an example from [prettier](https://github.com/prettier/prettier-vscode), an extension for formatting the code in vscode.

### 2. Write test

There are two advantages for writing tests:
While coding, tests can help us ensure our development (TDD).
After coding, tests (especially E2E test) can simulate the actions from a real user and go through the entire process.

Here are some small techniques for testing with jest and cypress:

1.  In cypress, the actions repeat themseleves times and times again. For example, 'add a product to basket', for these kinds of actions, we can create custom commands for it.
2.  In cypress, we test from the beginning to the end. The whole test can contain several steps. It is good practice to make the test of each step shareable. Besides, here is a list of [best practices](https://docs.cypress.io/guides/references/best-practices.html#Having-tests-rely-on-the-state-of-previous-tests) for cypress from its team.
3.  When we make tests with jest for React, it is important to mock the irrelevant functions, assets files to avoid unnecessary dependencies. Use [moduleNameMapper](https://jestjs.io/docs/en/webpack#handling-static-assets) to prevent from the problems of images and assets.
4.  If making test for a connected component, it is a lot more easier to test the non connected component by exporting it as non connected.
5.  Use [setupFilesAfterEnv](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array) for setting up all your tests.

### 3. Share code and configuration

If we work for multiple projects with the same base of technology, it is good practice to create a node module for sharing the configuration for eslint, stylelint, jest config, babel config and webpack file. We can also share images, fonts, css, helper functions and even React components! For installing a private node module, we need to provide token either by ssh or by https. Here is a [good tutorial](https://github.com/prettier/prettier-vscode) for it.

In order to import things from a shared module, we must do it in different ways in different type of files:

```js
node_modules / my_module / x // in scripts of package.json
import "~my_module/x" // in scss
import x from "my_module/x" // ES6 (React...)
const x = require(my_module / x) //ES5 (node script, webpack, jest config ...)
```

### 4. Webpack

As I mentioned in another article about webpack. There are three main purposes of webpack:
Create a dev server and watch for changes
Parse files (js, jsx, scss, images, json...)
Build mifinied and uglified bundle for production

We know that webpack is important, but what is the best practice for that?

Let's get some good ideas from the [create react app](https://github.com/facebook/create-react-app) .The webpack script is quite hidden, but we can find it [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js).

Here are some special techniques:

1. Use [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) in resolve to prevent from writing complicated relative path while import. In sass we also have the similar [technique](https://github.com/webpack-contrib/sass-loader#imports) .
2. Use [Define plugin](https://webpack.js.org/plugins/define-plugin) for injecting global variables to the javascript.
3. As for optimization, we have [Split chunk plugin](https://webpack.js.org/plugins/split-chunks-plugin/), [Tenser plugin](https://github.com/webpack-contrib/terser-webpack-plugin). Take a look how create-react-app team [optimize it](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js).

### 5. Continous integration and continous deployment

This is the most interesting part. As a develop team equipped with project owner, testers and programmers, how can we ship our code more efficiently and really integrate everyone together?

The answer is continous integration and continous development, it means that **the code will be intergrated, built, tested immediately after we make the commit**.

During continous integration, the changes within a commit will be passed to server, built and tested automatically. An error will be thrown immediately if there is a problem with the test or with the build. Please take a look at the workflow of continous integration:

![](/images/workflow/workflow1.png)
Continous delivery goes one step further than continous integration. After the build and automatical test, the code will be deployed to cdn and product owners can make the test manually with the bundle of a specifique version on the production environment. Please take a look at the workflow of continous delivery:

![](/images/workflow/workflow2.png)
In case of tools, there are lots of services like [Codeship](https://codeship.com/) who can help with continous integration. Codeship pro is compatible with [Docker](https://www.docker.com/) for configuring the linux server for hosting the code.

After uploading the bundles to a cdn (github, surge...), we can use the bundles in the product enviroment for making real world test manually.

### In the end

Keeping the same linter of the code in the team, sharing the same configuration for different project, always adding the necessary tests, building the system of continous integration will help us with construct the ship the web application more efficiently. Although it takes time to build, it will worth in the end.
