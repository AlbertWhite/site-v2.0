---
title: "Difference between server side performance and web performance"
date: "2023-02-28"
category: "blog"
star: 3
---

Recently I am working on a refactor of api. Doing the API in the right way might slightly bring performance issues, so I have worked on the measurement of performance in the development and in the production. Here is my learning:

### Difference between server side performance and web performance

In my humbor opinion, first of all, when the performance regression is tiny bit, it's much more critical in the front-end than in the back-end, because:

- On clinet side, web page could be launched in tons of different devices in different environment; where server is always run on the (best) machines, so the impact of performance regression on the front-side is much bigger than the regression on the back-end side.
- The CVR, transaction rate etc is measured in the front-end. We always want to relate the CVR with [core web vitals](https://web.dev/vitals/?gclid=Cj0KCQiA6fafBhC1ARIsAIJjL8ncg7n9F1GeMufGIlkHpwVsR2cFyYHys6o7ONom1NwmkfkXeEOBJfcaArDjEALw_wcB), but we rarely related the CVR api reponse time. 

Then, we seems to have more performance metrics in the front-end than in the backend. In the front-end, we have invented many metrics, while in the backend side, API response time is always the key metrics.

### How did I measure the server side performance between solution A and solution B before release

By simply setting the timestamps with Date.now() and calculating the time difference. [artillery](https://www.artillery.io/) seems like a good solution but I didn't try it.

It's interesting to see that when the cache system exists, the time duration for the multiple runs of the same API call could vary: the first call is longer because it needs to construct the cache.

### How did I measure the server side performance in production

With the monitor tool, for example, NewRelic, we can check the response time for a certain API during time. 

As the before-release test shows, the response time has a peak once after the release because of the cache generation. 

### Conclusion

It's just a naive article about server side performance. I will have deeper understanding once I worked more on it. 
