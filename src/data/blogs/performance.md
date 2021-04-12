---
title: "Improve site performance with real world examples"
date: "2021-04-11"
category: "blog"
star: 5
---

Several pratical ways to improve site performance with React.

During months, we have worked on web performance for our site. It is a tough journey. Even if when you know all the good principles (less bundle size, less useless import, lazyload whenever you can), it could be quite difficult to find really good solutions and make a try. In this article, I am going to share what I have learnt during these months.

### Why site performance is even more important today

As users, we don't like slow website, and [so does Google]https://developers.google.com/search/blog/2020/11/timing-for-page-experience): from May 2021, Google Search take page experience into account, in another words, site performance is linked to SEO directly now.

### How to measure performance

How to improve web performance for Google (and also for our users) ? Like making improvement for SEO, first of all, we need to speak the language of Google. It has its own metrics to evalute our site performance. You can make a test with its online tool [here](https://web.dev/measure/).
Google's performance metrics are human centralized. The metrics simulate **human percived** time, for example: [LCP(Largest Contentful Paint)](https://web.dev/lcp/), [FCP(First Contentful Paint)](https://web.dev/fcp/) are human percived time about **when content is rendered**, and [FIP(First Input Delay)](https://web.dev/fid/), [TTI(Time To Interactive)](https://web.dev/tti/) are human percived time about **when interaction is possible**.

### Principles and Technical preparations

The principle is easy to understand: less bundle size (thus less time to charge, less time for compiling js), lazyload if possible.

Lazyload could be done with [React Lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) with the [Import on Interaction Pattern](https://addyosmani.com/blog/import-on-interaction/); it could be also done with [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), not only for images, but could also be used for React components.

If your website has SSR, then maybe there will be chances for disabling client side libs on server side.

Lazyload shouldn't impact SEO components (internal links, JSONLD...).

And so on...

Last but not least: even if we know all the principles and good practices, it may be still very difficult to find out real good solutions to improve web performance. You need ideas, plenty of ideas, sometimes even out of the box to improve your metrics.

### Real World Examples

I can't mention details on our work, but you will see technical ideas with the following exmaples:

1. Import components on interaction

Modals are not necessary to be rendered at the first time. If your site has heavy modals, then it is your chance to lazyload.

```js
shouldShowModal && (
  <Suspense>
    <App/>
  <Suspense/>
)
```

2. Load script on interaction

```js
onClick={() => {
  const loader = new scriptLoader();
  loader.load();
}}
```

3. Lazyload images in Carousel

4. Lazyload with intersectionObserver

5. Use absolute import instead of relative import

6. Hide bot
