---
title: "React design system with typescript and storybook"
date: "2020-04-08"
category: "blog"
star: 5
---

A design system serves for two things: export shared components, and show what shared components we have.

I have made a [demo of design system](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook) and a [sample project](https://github.com/AlbertWhite/react-demos/blob/master/demo44-use-exterior-lib/src/App.js) to use it.

In this article, I will cover some technical remarks on the implementation.

#### 1. Special webpack configuration for javascript library

As for shared component, there are two choices: the first choice is to export jsx files directly, without compiling. The second choice is to compile the components into es5 and export. The second choice is always better, because if the component uses typescript, but the project who imports the design system doesn't use typescript, it will create a problem to use it directly.

In order to compile react components in design system, we need webpack and babel. We should notice that **webpack needs special configurations if it is used for bundle javascript libraries.** Design system is not a single root project, but a javascript library with lots of exports.

Here is the [official doc for webpack](https://webpack.js.org/guides/author-libraries/) about how to authoring libraries. It's long but worth to read, but if you want to know the key differences, here it is, in the config of webpack:

```js
output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'exterior-ui-lib', // used for creating a lib
    libraryTarget: 'umd', // used for creating a lib
    umdNamedDefine: true, // used for creating a lib
  },
```

Here is the [webpack configuration in the demo](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook/blob/master/webpack.js). There is no dev mode for design system. Development can be done with storybook.

#### 2. Component structure: Atomic design

The idea of Atomic design is pioneered by [Brad Frost](https://bradfrost.com/) in 2013. This design concept is also very useful for organizing the components in design system. The five core concepts are:

1. Atoms: Basic HTML controls
2. Molecules: Combined HTML controls, group inputs etc
3. Organisms: Footer, Header, ...
4. Templates: Layout
5. Pages

#### 3. Special export format

Design system is a javascript library, and it should be easy to use, easy to search for what we need.

In the [index.js](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook/blob/master/src/index.tsx), if we export components in this way:

```js
export { default as Link } from "./components/atoms/Link"
export { default as Text } from "./components/atoms/Text"
export { default as Box } from "./components/atoms/Box"
```

then in the project which imports the design system, we can easily import the components by

```js
import { Text, Link, Box } from "exterior-ui-lib"
```

#### 4. Dependencies and files setting in package.json

If the components in design system are already compiled in design system,we don't need to add any dependency in package.json because dependencies like react, react-dom should be in peerDependencies, and other dependencies can be in devDependencies.

Then, in the files configuration, we can export only the bundle.js, like

```js
 "files": [
    "./dist/index.bundle.js"
  ],
  "dependencies": {},
  "peerDependencies": {
    "react-dom": "^16.13.0",
    "react": "^16.13.0"
  },
  "devDependencies": {
    //... the rest dependencies
  }
```

Here is the [full example](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook/blob/master/package.json) for package.json.

In this way, after we make the npm install, the design system library will be very light:

![](images/designsystem/1.png)

#### 5. Version management

An update of library needs to be accompanied with a new version in package.json. If the project is hosted on git, there should be a new tag pushed.

Terminal commands:

```js
npm version //update package.json and create a new tag
git push --follow-tags // push tags
```

And then we can update the version for this dependency in package.json of client project.

`"exterior-ui-lib": "git+https://github.com/AlbertWhite/Styled-system-and-storybook.git#v1.0.11"`

#### 6. Storybook

It's a must to have storybook in react design system to be able to see and debug our design system.

The official tutorial of storybook is very clear, here is my version of [storybook config with typescript](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook/blob/master/.storybook/main.js).

#### 7. Optional: Typescript

We can also integrate typescript in design system just by adding some extra config for webpack and create tsconfig.js for typescript configuration. The official documentation is well written, or you can check how it is done in the [demo](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook)

#### 8. Optional: Styled System

[Styled System](https://styled-system.com/) lets you quickly build custom UI components with constraint-based style props, which means, you can add js like props to control css. It's built upon styled components.

Styled system is really useful to create container component, for example `<Box>`, `<Flex>`.

Here is a simple example:

The definition of [a component](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook/blob/master/src/components/atoms/Box/index.tsx) with styled-system:

```js
import styled from "styled-components"
import { color, ColorProps, space, SpaceProps } from "styled-system"

type BoxProps = ColorProps & SpaceProps

const Box =
  styled.div <
  BoxProps >
  `
  ${color}
  ${space},
`

export default Box
```

The use of it in [another](https://github.com/AlbertWhite/react-demos/blob/master/demo44-use-exterior-lib/src/App.js)

```js
<Box marginTop={"180px"}>
  <Text>Hello world</Text>
  <Link href="https://www.google.com">Hello world</Link>
</Box>
```

Here is the full demo for the [design system](https://github.com/AlbertWhite/react-design-system-with-typescript-storybook) and a [sample project](https://github.com/AlbertWhite/react-demos/blob/master/demo44-use-exterior-lib/src/App.js) to use it. Hope this article helps you!
