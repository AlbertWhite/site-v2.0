---
title: "Debug apollo cache in the web"
date: "2022-09-22"
category: "blog"
star: 3
keyword: "backend"
---

Recently we met a problem of a disappearing element on the web. Finally we found that it is because of a lack of data from graphql query.

### Why it happens

However, the reason why the data is lacking is because the queried object doesn't have an id. We have queried the same object twice, and the second time the object contains less field, thus in ApolloCache the query with less field overwrites the one with more field, and data is missing.

### How did we find it

With the apollo chrome extension, we can debug apollo cache and check the list of cache IDs.
It's also possible to console.log the cache with `apolloClient.cache` on the server side (we have used nextjs). 

### What would be the possible solutions

- Add id to the object, so Apollo could create the cache for this object properly to prevent from totally overwrittening the object.

- In typepolicy, [merge](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays) the fields, so it will merge instead of overwriting.

Thanks for reading !
