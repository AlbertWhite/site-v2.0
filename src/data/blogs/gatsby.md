---
title: "Gatsby (Work in progress)"
date: "2019-11-20"
category: "blog"
star: 3
---

### Good thing with GatsbyJS

#### Good development practices

With GatsbyJS, there are many good practices about web development in the modern world.

For example:

1. Use general css stylesheet (in browser-config) and css module or styled-component together.
2. Use shared Layout component, page component for each route, and shared component.

#### Notion of data

Make use of GraphQL to query data. Please note its definition for "data": **everything that lives outside a React component**. Data can come from API, database, CMS, local files...

- only pages can make page queries
- Non-page components, such as Layout, can use StaticQuery.

#### Plugins(https://www.gatsbyjs.org/plugins/)

Its ecosystem of plugins. React-helmet for SEO, sharp for image quality, google manifest...

SEO: this is important not just for site viewers, but also for SEO — title and description metadata stored in the document head is a key component used by Google in determining placement in search results.

- different meta informations for different pages. [source](https://stackoverflow.com/questions/52690820/what-is-the-purpose-of-react-helmet)

#### NodeJS

We can write NodeJS function with Gatsby API.
Ex: onCreateNode, createPages

- [With node createPage API instead of graphQL query](https://www.gatsbyjs.org/docs/using-gatsby-without-graphql/)

### Bad things

1. Route already configured. User can focus on the content instead of configuration.

Lots of things are hidden. Web development is not that easy in real case without Gastby.

### Dark Mode
