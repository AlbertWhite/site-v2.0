### Plugins

- gatsby-plugin-typography: css
- gatsby-plugin-typescript
- gatsby-plugin-tslint ([Tuto: Gatsby+Typescipt+Prettier](https://medium.com/maxime-heckel/getting-started-with-typescript-on-gatsby-8544b47c1d27))
- gatsby-plugin-sharp: optimizing images
- gatsby-source-filesystem: load local resource
- gatsby-transformer-sharp
- gatsby-image [Tuto](https://www.gatsbyjs.org/tutorial/gatsby-image-tutorial/)
- gatsby-source-filesystem
- gatsby-transformer-remark : parse markdown files
- gatsby-remark-prismjs: highlight file
- gatsby-remark-images: markdown inline images
- gatsby-remark-copy-linked-files: markdown inline images

### Development environement

Typescript, Prettier, Styled Component

### New website

Gatsby, SSR, TypeScript, Netfliy

### Test with gatsby

#### Good thing

There are many good practices about modern web development.

1. Route already configured. User can focus on the content instead of configuration.
2. The idea of using general stylesheet (browser-config) and css module, css in JS.
3. The idea of layout component in pages folder, page component and shared component.
4. Plugins. [Plugin library](https://www.gatsbyjs.org/plugins/)
5. Data: “everything that lives outside a React component”. Data can come from API, database, CMS, local files...
6. Query

- only pages can make page queries
- Non-page components, such as Layout, can use StaticQuery.
- [With node createPage API instead of graphQL query](https://www.gatsbyjs.org/docs/using-gatsby-without-graphql/)
- **source plugin**: gatsby-source-filesystem: source plugin can bring data into gatsby's data system.
- **transformer plugin**: takes raw content from local file to be used inside app. For markdown: gatsby-transformer-remark.

7. NodeJS
   We can write NodeJS function with Gatsby API.
   Ex: onCreateNode, createPages

Schema connections (edges) is the ability to query over collections of nodes of a type.

But this is easy to fix. When querying a connection of some type, you can pass a variety of arguments to the GraphQL query. You can sort and filter nodes, set how many nodes to skip, and choose the limit of how many nodes to retrieve. With this powerful set of operators, you can select any data you want—in the format you need.

Gatsby is not limited to making pages from files like many static site generators. Gatsby lets you use GraphQL to query your data and map the query results to pages.

#### Bad thing

Lots of things are hidden. Web development is not that easy in real case without Gastby.

#### Todo

##### Content

- review all the text

##### Tech

- Deploy with netfliy and managing the redirection from yuebaixu.com
- Add SSR
- Add SEO with [react helmet](https://www.gatsbyjs.org/tutorial/part-eight/#-using-react-helmet-and-gatsby-plugin-react-helmet)
- [pwa, service worker](https://www.gatsbyjs.org/tutorial/part-eight/#-using-react-helmet-and-gatsby-plugin-react-helmet)
- More plugins
- add google analytics

##### example

- A good md: https://dimitrioslytras.com/blog/avoiding-props-drilling/#Fin
- https://markoskon.com/gatsby-plugins-markdown/

```
---
title: "Using a Framework to Simplify Email Design"
date: "2017-08-10"
section: blog
cover_image: "./foundation-emails-guide@1x.jpg"
tags: design, development
---
```
