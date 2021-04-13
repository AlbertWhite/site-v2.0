---
title: "Improve site performance with examples"
date: "2021-04-11"
category: "blog"
star: 5
---

Several practical ways to improve site performance with React.

For months, we have worked on web performance for our site. It is a tough journey, because even if you know all the good principles (less bundle size, less useless import, lazyload whenever you can), it could be still quite difficult to find good solutions. In this article, I am going to share what I have learnt during these months with some examples.

### Why site performance is even more important today

As users, we don't like slow website, and [so does Google](https://developers.google.com/search/blog/2020/11/timing-for-page-experience): from May 2021, Google Search take page experience into account, in another words, site performance is linked to SEO directly.

### How to measure performance

How to improve web performance for Google (and also for our users) ? Like making improvement for SEO, first of all, we need to speak the language of Google. It has its own metrics to evaluate our site performance.

Google also provides online tool and lighthouse tool in chrome. You can make a test with its online tool [here](https://web.dev/measure/).

Google's performance metrics are human centralized. The metrics simulate **human perceived** time, for example: [LCP (Largest Contentful Paint)](https://web.dev/lcp/), [FCP (First Contentful Paint)](https://web.dev/fcp/) are human perceived time about **when content is rendered**, and [FIP (First Input Delay)](https://web.dev/fid/), [TTI (Time To Interactive)](https://web.dev/tti/) are human perceived time about **when interaction is possible**.

### Principles and Technical preparations

The principle is easy to understand: less bundle size (thus less time to charge, less time for compiling js), and lazyload (split js chunk, or lazyload for delaying js execution).

Lazyload could be done with [React Lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) with the [Import on Interaction Pattern](https://addyosmani.com/blog/import-on-interaction/); it could be also done with [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), not only for images, but could also be used for React components.

There are other tricks:

If your website has SSR, then maybe there will be chances for disabling client side libs on server side.

Lazyload shouldn't impact SEO components (internal links, JSONLD...).

Even if we know all the principles and good practices, it may be still very difficult to find out real good solutions to improve web performance.

Solutions should come from problems. If your main goal for this page is improving the LCP, maybe you should change the LCP object; if your main goal is to improving FIP and TTI, maybe you could delay some js execution. Generally, less bundle size and lazyload could improve nearly all the metrics.

You need ideas, plenty of ideas, sometimes even out of the box to improve the metrics of your website.

### Real World Examples

Without too many details, you will see the ideas with the following examples:

#### 1. Import components on interaction

As it is mentioned before, this is a really useful pattern with splitting bundle. It is useful for modals, because
modals are not necessary to be rendered at the first time. If your site has heavy modals, then it is your chance to lazyload.

```js
shouldShowModal && (
  <Suspense>
    <App/>
  <Suspense/>
)
```

#### 2. Load script on interaction

Some third party scripts are only required to be loaded onClick, instead of in componentDidMount phase.

```js
onClick={() => {
  const loader = new scriptLoader();
  loader.load();
}}
```

#### 3. Lazyload components or images with intersectionObserver

It could be tricky, but the main point is to change something while observing the object: if the observed object is an image, it could be set the url; if the observed object is a react component, it could be change the boolean for displaying the component.

[Here](https://web.dev/lazy-loading-images/) is a good tutorial.

```js
const io = new IntersectionObserver(([entry]) => {
  const { isIntersecting } = entry
  if (isIntersecting) {
    // do something, like set img src, like set a variable to show a component
    io.disconnect()
  }
})
io.observe()
```

Here are some ideas, but there are also many other ways to improve the metrics, and sometimes they only work with your website because the solution is really customized.

Thanks for reading ! Hope it could be helpful with improving your site performance.
