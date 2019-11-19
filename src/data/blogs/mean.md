---
title: "Build your Mean Stack with Gulp"
date: "2016-07-12"
category: "blog"
star: 2
---

MEAN stack(MongoDB, Express.js, AngularJS, Node.js) is a very inspiring topic nowadays for front-end developers, because we can become full-stack developer with only Javascript! As a front-end developer, it is worth learning MEAN stack because that's a very good path for learning how backend works.

Gulp is the task runner which supports live-loading. Is it possible to run Node Server with gulp ?

### How to make Gulp + Express work

Well, if we want to use Gulp and Express together, the problem might come to our mind: we can use Express.js to build the server, but how to use Gulp to run it?

Luckly, there is a gulp plugin exist: [gulp-express](https://www.npmjs.com/package/gulp-express).

You can easily use this plugin to run express server in the gulp file, and you can also use it to live reload your server and browser!

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

That's awesome, isn't it? We can reload the server with the code `server.run` and reload the browser with `server.notify`.

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

How does Express and Angular communicates with each other? How does angular controller get data from server?

Then the answer is clear for us. We need to create API in the server, and use the API in Angular. For example, in the server:

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

Here is the [demo](https://github.com/AlbertWhite/mean-stack-with-gulp) in github. Thanks for reading!
