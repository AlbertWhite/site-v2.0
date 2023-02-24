---
title: "How to find ideas for web performance improvement"
date: "2023-02-25"
category: "blog"
star: 5
---

Improving web performance sounds easy, but it's a difficult subject because it's not easy to find ideas for the improvement. In this article, I would like to share some ways which I found useful to find these ideas.

### DOM size

If we run a lighthouse test in the browser or a [pagespeed insight test](https://pagespeed.web.dev/), the ranked 1 or 2 causes for performance issues are either js bundle size, or DOM size if your website is using SSR.

As for DOM size, I recommend that we could copy and paste the DOM (either from network pannel and choose "Doc" or "view page source") into a code editor, and analyze block by block.

For example, NextJS will inject a script called [__NEXT_DATA__](https://github.com/vercel/next.js/discussions/15117) with all the necessary data for SSR. It might not be direct if you check it in the Elements or Network panel, but if you copy all the DOM into the editor, you could find **it really takes much space**. That's why I recommend that it's better to copy and paste the DOM into the editor. In this way, it's easier to see the real impact of each script, and easier to find patterns in the data. The conclusion is always that maybe **you don't need that much data for SSR**.

Another example, a library for translations like react-intl could inject translations into the DOM. The problem is always that it injects **all** the translations, no matter whether it is still used or not, no matter whether it is used in this page. It is no more a small problem if you start to look at the size it takes in your code editor. 

### JS size

Concerning JS size, it's less recommended to copy and paste the uglified and minified js file into editor not only because they are uglified or minified, but also if the JS are well splitted, it's not easy to collect them all to have a big map.

That's why we should use the [bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer). It provides the entire view.

For example, in my [last article](https://www.yuebaixu.com/perf1/), I explained how I used bundle analyzer and found that lodash is loaded entirely into the bundle.

If your website uses SSR, then bundle analyzer will generate two treemaps, one for server, and another for client. In the server.html, you could observe whether there are some components which shouldn't be there, for example, the [lazyloaded](https://reactjs.org/docs/code-splitting.html#reactlazy) components. 

It's worth mentioning that the built js files shown in the treemap doesn't reflect the final loaded js per page. For example NextJS will choose and group necessary bundles per page. 

### Lighthouse

[Lighthouse test](https://developer.chrome.com/docs/lighthouse/overview/) is also a valuable tool for finding some "quick wins". It will give many ideas after each test session, although many ideas seem vague and large (too large js size for example), there remains many ideas which are doable right away. 
