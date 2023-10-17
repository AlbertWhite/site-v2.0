---
title: "Use Cucumber test for QA and SEO testing"
date: "2023-01-23"
category: "blog"
star: 5
keyword: "test"
---

Periodically QA testing is a very important way to monitor the website's healthiness. It's one of the most efficient and the most rapid ways to report website errors.

However, one pain point of periodically QA testing is that it only tests the a few user interations, for example, the booking flow. I would call this kind of QA testing as **"Vertical QA”**. It tests the website in depth within a few URLs, but it doesn't cover as many as urls possible, or what I would like to call, **"Horizontal QA”**. 

In this article, I would like to introduce a light-weighted, product manager-friendly solution which is implemented by nodejs + [cucumber](https://cucumber.io/).

Cucumber is a tool for writing automated tests. The advantage of cucumber is that **it could hide the complicated technical implementation and just expose the essential part: the test scenario**.

### Scenario: Check response status code

Imagine that your website has tons of domains and url patterns, the basic way to guarantee the healthiness of all of them is to check the response status code for the above urls.

As we can see with the example below, the test is is completely human readable for non developers too.

```gherkin
Feature: response status code

    Scenario Outline: response status code
        Given url is "<url>"
        When I try to access this url
        Then The status code is "<status-code>"

        Examples:
            | url                                            | status-code |
            | https://www.google.com/                        | 200         |
            | https://www.google.fr/                         | 200         |
            | https://www.google.it/                         | 200         |
```

In order to implement the above scenario, I use the native fetch API. Here is the implementation:

```js
// stepdefs.js
const fetch = require("isomorphic-fetch");
const assert = require("assert");
const jsdom = require("jsdom");
const { Given, When, Then } = require("@cucumber/cucumber");


Given("url is {string}", function (url) {
  this.url = url;
});

When("I try to access this url", async function () {
  const result = await fetch(this.url);
  const { status, redirected } = result;
  this.statusCode =  redirected && status == "200" ? "301" : status;
});

Then("The status code is {string}", function (expected) {
  assert.equal(this.statusCode, expected);
});

```

### Scenario: Check website redirection

When you decide to change your website's structure, or if your company purchased other websites, you might need to handle lots of redirections. Monitoring the redirections could be implemented with cucumber test as well.

```Gherkin
    Scenario Outline: redirection
        Given url is "<url>"
        When I try to access this url
        Then I will be redirected to "<redirection-url>"

        Examples:
            | url                   | redirection-url           |
            | https://google.co.uk/ | https:www.//google.co.uk/ |
```

The implementation is not complicated neither:
```js

Given("url is {string}", function (url) {
  this.url = url;
});

When("I try to access this url", async function () {
  const result = await fetch(this.url);
  const { status, redirected, url } = result;

  this.statusCode = redirected && status == "200" ? "301" : status;
  this.redirectionUrl = url; // new line 
});


Then("I will be redirected to {string}", function (expected) {
  assert.equal(this.redirectionUrl, expected);
});

```

### Scenario: Check existence of DOM element

Checking the existence of DOM elements is important, especially for SEO's [on page factors](https://moz.com/learn/seo/on-page-factors), because Google checks the existence of SEO elements on the source code and index your website to the right place.

Here is just an example of implementation to check a dom element with an attribute `data-testid`. I used [JSDOM](https://github.com/jsdom/jsdom) to parse text to HTML.

```js
Given("url is {string}", function (url) {
  this.url = url;
});

When("I try to access this url", async function () { // jsdom event is asynchronized
  const result = await fetch(this.url);
  const { status, redirected, url } = result;
  const text = await result.text();
  const document = await new jsdom.JSDOM(text); // transform text to document

  this.document = document; // keep document in the this context
  this.statusCode = redirected && status == "200" ? "301" : status;
  this.redirectionUrl = url
});

Then(
  "I should find the following element with data-testid {string}",
  async function (expected) {
    const result = await this.document.window.document.querySelector(
      `[data-testid="${expected}"]`
    );

    assert.notEqual(result, null);
  }
);
```

### Conclusion

Cucumber test could be used to test a large amount of URLs (or **horizontal QA**), which will be useful to check websites' global healthiness (response status code, redirection, DOM element). The potential of this tool is unlimited, further implementation could include: CI integration, release process integration etc.

Thanks for reading !
