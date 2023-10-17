---
title: "Cypress test without polluting the database"
date: "2020-04-11"
category: "blog"
star: 4
keyword: "test"
---

Cypress is a popular end to end test tool. It can be used to test on localhost during the development, and it can also be used to test the preproduction and even production on the CI. In order to test on localhost, we just need to set 'baseUrl' to localhost in the cypress configuration. In order to test on CI, we can choose the 'headless' mode to run the test in terminal.

However, if we make test with preproduction or production, we will face a risk of polluting the database of preproduction and production. Imagine that if you want to test a button for adding to basket, what if we really add this product to the basket and never pay? If the CI runs 1000 times, there will be 1000 products added to the basket?

The best solution, is to keep the database untouched after the CI test, which means we need to bypass the modification of database. There are several propositions.

#### 1. Create a test process with 'deleting' after 'adding'

This is the most easy solution. When we design the process for test, if deleting is possible, we can delete what we have created in the cypress test.

However, sometimes it is not possible to delete what we have created on the cypress test, for example, a command can only be deleted from the backoffice but not from the client side, in this case, what can we do?

#### 2. Mock API response with cypress

Cypress provides the tool to mock the response of API. [Here](https://docs.cypress.io/guides/guides/network-requests.html#Organizing) is the tutorial from the cypress team about whether or not and how to mock API response. In general, if we want to mock a API with fixture, we can use:

```js
cy.server()
// you can also just write the fixture in the route
cy.route("GET", "comments/*", "fixture:example.json").as("getComment")

// trigger api call
cy.get(".fixture-btn").click()

cy.wait("@getComment")
  .its("responseBody")
  .should("have.property", "name")
  .and("include", "Using fixtures to represent data")
```

In the case above, fixture is used to store the mock response of API.

However, there is a downside for this solution: we cannot test the **real** process with **real api**. If we want to test the real response from the real server, what can we do ?

### 3. Register API response with PollyJS

[PollyJS](https://github.com/Netflix/pollyjs) is a JS library from Netflix. It allows us to record and replay interactions of API by recoding http transactions (what we see in the network panel in chrome) into [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) (Http Archive Format) file.

With Cypress, when we make the test locally, we can use the 'record' mode in PollyJS to record network interactions, before commiting our test, we change the mode from 'record' to 'replay' to let Cypress tests uses the HAR file for http requests in CI. In this way, **no real http interaction is done and the database is not polluted** in the Cypress test.

In this article, I have talked about three ways to make cypress test without polluting the database: delete after create, mock API response, and record network interactions with PollyJS. Thanks for reading !
