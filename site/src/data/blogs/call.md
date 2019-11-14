---
title: "Three ways for creating the callApi method"
date: "2019-04-02"
---

It is quite useful to create our own callApi method. It is also interesting but can be confusing to play with promise, async/await. I will list three ways for making callApi method with fetch (axio is the similar thing).

First of all, there are some things to be clarified about async/await and promise:
Async doesn't not need to be used with await, but await must be written in a async function.
In order to use async, we need to use .then or await. Async will return a promise.
A promise must be resolved/rejected, but why there is no resolve or reject in 'fetch' function? Because fetch api will return a promise but it will resolve/reject itself by then/catch.

##### Method 1

```js
const callApi = (url, params) => {
  return fetch(url, params).then(res => {
    // response instances are returned when fetch() promises are resolved.
    return res.json() // the value returned is resolved
  })
}
// to use
callApi(url, params).then(res => {
  console.log(res)
})
```

##### Method 2

```js
const callApi = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch(url, params)
      .then(res => {
        return res.json()
      })
      .then(res => {
        resolve(res) // the value resolved will be returned by the promise
      })
  })
}

// to use
callApi(url, params).then(res => {
  console.log(res)
})
```

##### Method 3

```js
async function callApi(url, params) {
  const res = await fetch(url, params)
  return res.json() // async function returns a promise which will be resolved with the returned value
}

// to use:
;(async () => {
  const res = await callApi2(url, params)
  console.log("res", res)
})()
```
