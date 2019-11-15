---
title: "Build your Mean Stack with Gulp"
date: "2016-07-12"
---

MEAN stack(MongoDB, Express.js, AngularJS, Node.js) is a very inspring topic nowadays for front-end developers, because they think they can become full-stack developer with only Javascript! However, it is still not the best choice to build web apps, and that's why we still need python, PHP and Java for back-end development.

However, as a front-end developer, it is still worth learning MEAN stack because that's a very good path for learning how backend works.

But.. wait, we only mention MEAN stack, but if we want to use Gulp(or Grunt) for it?

### How to make Gulp + Express work

Well, if we want to use Gulp and Express together, the problem might come to our mind. Well, we can use Express.js to build the server, but then how to use Gulp to run the Express Server?

The best solution to me now is to use the gulp liveload plugin [gulp-express](https://www.npmjs.com/package/gulp-express).

You can easily use this plugin to run your script of express server in your gulp file, and you can also use it to live reload your server and also browser!

gulpfile.js

```js
// gulpfile.js
var gulp = require("gulp")
var server = require("gulp-express")

gulp.task("server", function() {
  // Start the server
  server.run(["express-server.js"])

  // Reload the browser when file changes
  gulp.watch(["path/*.html"], server.notify)

  //Reload the server if the server changes
  gulp.watch(["express-server.js"], [server.run]) //reload server
})
```

That's awesome, isn't it? We can reload the server with the code '[server.run]' and reload the browser with 'server.notify'.

As for the express server, we can try with the basic one:

express-server.js

```js
// express-server.js
var express = require("express")
var app = express()

app.get("/", function(req, res) {
  res.send("Hello World!")
})

app.listen(3000, function() {
  console.log("Example app listening on port 3000!")
})
```

### How to make Express+Angular work

Before we want to make them work, I want to make it clear: Node.js is for backend, but Angular is still for front-end. Although we can set routing and bind data in Angular, but it is still front-end framework. In other words, if we want to deal with the database or public API via http request, we still need to do that in node server.

But now the problem comes, how does Express and Angular communicates with each other? Now the data is always got in the server, but Angular needs to use the data in controllers. Then how do angular get data from server?

Let's imagine: what is the basic way of communication between client and server?

Yes, with get and post request in http protocols.

Then the answer is clear for us. We need to create API in the server, and use the api in Angular. For example, in the server:

express-server.js

```js
// express-server.js
var express = require("express")
var app = express()

app.use(require("connect-livereload")())
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.listen(3000, function() {
  console.log("Example app listening on port 3000!")
})
app.get("/api/numbers", function(req, res) {
  //set api
  var numbers = [1, 2, 3, 4, 5]
  res.json(numbers)
})
```

app.js

```js
// app.js
var application = angular.module('application',[]);
application.controller('basicController', function($scope, $http) {
$http.get('/api/numbers') //use api in the server and get the data
    .success(function(data) {
      console.log(data);
      $scope.numbers = data;
    .error(function(data) {
        console.log('Error: ' + data);
    });
```

I set up a very simple project in [github](https://github.com/AlbertWhite/mean-stack-with-gulp). Please take a look and have fun!
