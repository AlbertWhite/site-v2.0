---
title: "How to better construct and ship your web application"
date: "2019-02-18"
category: "blog"
star: 5
keyword: "other"
---

Working in a development team is quite different from working alone or working with only one person. Without shared configurations, rules and reasonable workflow, the more people working on the projet, the more likely the project becomes a mass. In contrast, building shared configurations, creating reasonable workflow, and sharing good working practices are like making good investment: **the team will earn benefits everyday with the productivity**. They also help with guaranteeing the quality of the deliverable and shipping the application more efficiently.

In this article, I will talk about how to better construct and ship web application within a development team:

### 1. Code style and format

To begin with, we need to ensure that everyone has the same formatting of the code and the same eslint config if they are working for the same code base. It is painful to try to find the real difference in a pull request if 80% of the difference comes from formatting.

In case of this, there are two places where we can look at:

##### Eslint

First of all, we need to integrate linter to the IDE for detecting the problemes automatically. Here is the guide for [how to integrate eslint to different kinds of IDE](https://eslint.org/docs/user-guide/integrations).

If your team have multiple projects to work on and you want to share the same eslint config, it is recommended to build shared configuration in eslint. Here is the famous example from [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). We can create and share the configuration as a node module with the name of 'eslint-config-your-linter", then add to your project by **'extends'** it in your eslint config.

Little notice: When we extend your customized eslint config, we can write "your-linter" instead of "eslint-config-your-linter" because eslint will remove 'eslint-config' automatically.

##### Configuration in IDE

IDE has a configuration file for the rules of formatting, and here is an example of the [configuration file of vscode](https://code.visualstudio.com/docs/getstarted/settings). In addition, there are plugins for IDE for formatting the code and we have also the configurations for the plugins. Here is an example from [prettier](https://github.com/prettier/prettier-vscode), an extension for formatting the code in vscode. It is recommended to share the [config for prettier](https://prettier.io/docs/en/configuration.html) like the config of eslint and babel.

### 2. Share components and configuration

If we work for multiple projects, it is good practice to create a node module for sharing the configuration for eslint, stylelint, jest config, babel config and webpack file. We can also share images, fonts, css, helper functions and even React components. The node module can be hosted on npm, github, or any cdn. If it is hosted on github private repo, we need to provide ssh key or https token for installing it.

In order to import something from a shared node module, there are different ways to make in different kinds of files.

```js
import x from "my_module/x" // ES6 (React...)
const x = require(my_module / x) //ES5 (node script, webpack, jest config ...)
./node_modules/my_module/x // in package.json
import "~my_module/x" // in scss
```

### 3. Write test

Maybe it is quite strange to talk with writing tests here, but it is indeed important and always been ignored while development.

There are two advantages for writing tests:

- While coding, tests can help us ensure our development (TDD).
- After coding, tests (especially E2E test) can simulate the actions from a real user and go through the entire process.

### 4. Make good use of Webpack

Webpack makes front-end development workflow more fluid and professional.

In detail, as I mentioned in [another article about webpack](https://www.yuebaixu.com/webpack/). There are three main purposes of webpack:

- Create a dev server and watch for changes
- Parse files (js, jsx, scss, images, json...)
- Build minified and uglified bundle for production

There are lots of good tutorials, but we can always learn from the best. For example, the webpack config for the famous create-react-app coule be found [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js).

Here are some special techniques:

1. Use [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) in resolve to prevent from writing complicated relative path while import. In sass we also have the similar [technique](https://github.com/webpack-contrib/sass-loader#imports) .
2. Use [Define plugin](https://webpack.js.org/plugins/define-plugin) for injecting global variables to the javascript.
3. As for optimization, there are [Split chunk plugin](https://webpack.js.org/plugins/split-chunks-plugin/), [Tenser plugin](https://github.com/webpack-contrib/terser-webpack-plugin). [Take a look](<(https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js)>) at how create-react-app team optimize it.

### 5. Continuous integration and continuous deployment

We have done a great job locally! How can we ship it better ?

The answer is continuous integration and continuous development, it means that **the project will be built, tested, and even deployed after every commit**.

During continuous integration, the changes within a commit will be passed to server, built and tested automatically. If there is a problem with the test or with the build, an error will be thrown immediately and stop the process. Here is the workflow of continuous integration:

![](/images/workflow/workflow1.png)

Continuous delivery goes one step further than continuous integration. After the build and automatic test, the code will be deployed to cdn so that the product owners can make manually tests on the recette environments. Here is the workflow of continuous delivery:
![](/images/workflow/workflow2.png)

In case of tools, nowadays gitlab and github have native CI/CD tool. There are also plenty of third-party services like [Codeship](https://codeship.com/). Docker is always preferred for preparing for linux environment.

It may take time and energy to make right tools and create reasonable process for your development, but it will worth in the end!
