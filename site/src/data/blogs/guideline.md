---
title: "Angular 1 Guideline"
date: "2017-06-04"
---

During the last two months, I did an internship as a front-end developper for Angular. The project is well-structured, and strictly follow [the angular guideline from John Papa](https://github.com/johnpapa/angular-styleguide). Based on the project, I created the 'minimum' version with the same structure. Here is the link for the project, you can read the article while checking the files for the project.

### 1. Module and Sub Module

Make the app as component based. For each component, define directive, controller. Use service or resource to share data between them.

While creating modules, it is important to know whether we need to create this module, or we can just make a submodule.

All modules should be defined into one file with its injection. Please be aware that submodules should be defined as the injecting of main module. Please take a look at code in app/app.js.

```js
;(function() {
  angular.module("mainModule", [
    "ui.router",
    "ngResource",

    "mainModule.subModule1",
    "mainModule.subModule2",
  ])

  angular.module("mainModule.subModule1", [])
  angular.module("mainModule.subModule2", [])
})()
```

### 2. IIFE and the better way to define directive, controller, and service

Use IIFE (Immediately Invoked Funcion ExHighlightssion) while defining modules, creating every controller, directive or service. As we know, all the controller, service and directive will be injected into index.html, use IIFE to **avoid variable collisions** and ensure variables are not global. [Here](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y010) is how Johnpapa describes it.

```js
//IIFE

;(function() {
  //here goes js code
})
```

In Angular, we can define directive, controller and service. They are necessary and serve different roles, it is not a good pratice to write them all in one file. The better way is to seperate them into different files. For example:

```js
// some.controller.js
angular.module("app").controller("SomeController", SomeController) // for reducing nested code

function SomeController() {}

// some.direcive.js
angular.module("app").directive("SomeDirective", SomeDirective)

function SomeDirective() {}

// some.factory.js
angular.module("app").factory("someFactory", someFactory)

function someFactory() {}
```

### 3. Module with route.js with element directive

There are two ways to create a html block. The first way is to define a module or submodule with defining its routes, for example, [SubModule1](https://github.com/AlbertWhite/angular-exercise/tree/master/app/components/subModule1) and [SubModule2](https://github.com/AlbertWhite/angular-exercise/tree/master/app/components/subModule2), in the file structure, there are route.js for them. They are used for replacing the 'ui-view' in the main page. They will share the same header and footer.

The second way to create a html block is by creating a directive, mostly an element directive, for example, [component1](https://github.com/AlbertWhite/angular-exercise/tree/master/app/components/subModule1/component1) and [component2](https://github.com/AlbertWhite/angular-exercise/tree/master/app/components/subModule1/component2). In the file stucture, there are no route.js file, but just .directive file for indicating the template file and resolve parameters.

A module with route.js is the container for element directive.

### 4. Angular-UI router

In order to use Angular UI router, we need to download and then inject as the dependency of main module, for example, please check [route.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/route.js).

While configuring routes, we need to use the stateprovider to define the state. Please note that after defining the state, we need to add a '#' for using the url. For example, if we define a state: index, we need to use /#/index to call it.

We can use urlRouterProvider.otherwise to redirect url which is not defined.

After we define states, use ui-sref = state to create links.

In routes, we can pass variables when we intiate a module. We can do that in the **resolve** function in routeConfig. The variable passed by route should be injected into the controller. For example, check [submodule1.controller.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/submodule1.controller.js)

### 5. Controller and pass value

In controller, it should be like this:

```js
;(function() {
  angular
    .module("mainModule.subModule1")
    .controller("SubModuleController1", SubModuleController1) //Highlightvent nested code

  SubModuleController1.$inject = []

  function SubModuleController1(Sub1Service) {
    var vm = this //use vm instead of this, to make sure we can use the parent scope in functions.
  }
})()
```

We use vm = this and we can use vm. to access variables in the scope.

While using directive component, we can pass parameters from parent component. For example, in the file [submodule1.html](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/submodule1.html), we pass 'valuepassed' to the component submodule1directive1.

Highlightvent a controller which is too long, a controller should only serves for a certain component. If there are common functions which can reused in controller, we should write them into service.

### 6. Directive

It is easy to write lots of things in one directive, but it is difficult to seperate them afterwards, since the code and logic have been twisted together, so before writing code, it is good to seperate each directive.

We can manipulate DOM in a controller, for example, by using **angular.element(event.target)** , we can get the trigger element and after we can use jquery functions to manipulate. But it is better to manipulate DOM in directive, in the end of a directive, there is a link function.

```js
function link(scope, element, attrs) {}
```

In the link function, the element is already the trigger element. With the scope, we can get the parameters passed. We can pass a function, a varaible, or a string.

We can pass parameters to a directive, for example, in the [submodule1.html](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/submodule1.html), we pass a string to the submodule1directive1.

In the directive [component1.directive.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/component1/component1.directive.js), we need to set **bindToController** to true, and define the variables passed in the scope.

```js
scope{
  // = for passing a virable
  // @ for passing a string
  // & for passing a function
}
```

### 7. Service and factory

If there are functions we can reuse, we should define them into a service. At first, we need to use a factory method to create a service, for example, [submodule1.service.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/submodule1.service.js).

```js
angular.module("mainModule.subModule1").factory("Sub1Service", Sub1Service)
```

As with what John papa [says](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y040), it is better to return a service as an object which contains the functions you want to pass, for example:

```js
    function xService(){
    var service = {
      a:a,
      b:b
    };

    return service;

    //////////////////////

    function a(var x){

    }

    function b(var y){

    }
  }
```

After that, we can use service in other components, for example, in [submodule2.controller.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule2/submodule2.controller.js)

### 8. Observer design patterns with service: service for subscribe and notify

Service holds the information which is shared by different components, once the information is changed in service, the information should be updated in all controllers.

Angular.watch is not the best solution, it is better to add a [observer](http://www.dofactory.com/javascript/observer-design-pattern) design patterns in service. With angular.watch.

Here is how it works with observer design patterns, in service.js, we need to add two functions: subscribe and notify. Subscribe funtion is for adding callbacks functions in the observer. Notify function is for updating all the functions in observer. Please take a look in [submodule1.service.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/submodule1.service.js).

If we want to use in other component, just use the subscribe function in service, for example, in [component2.controller.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/component2/component2.controller.js).

In the beginning, we use subscribe function to add all the components which need to be updated. Once value is updated in service, the notify function will notify all the funtions to update the value.

### 9. Promise in Angular

Promise is useful for dealing with asynchronous functions. Here is the simple example:

```js
var promise = $http({
  method: "GET",
  url: "/someUrl",
}).then(
  function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  },
  function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  }
)

promise.then()
```

$http call returns a promise, we can use $http.then() to add the functions which are excuted after the \$http service.

In Angular, Promise is written as \$q service.

Sometimes there are more than one \$http calling, and we need to gather all the promise together. In order to do this, we can use `Promise.all(arrayOfPromise)`.

We can pass the promise as variables and use promise.then() whenever we want to add callback functions.

### 10. Angular Resource and Service

Angular Resource is for managing all the Restful API. Like UI-Route service, we need to inject 'ngResource' in angular.module, for example, in app.js.

Afterwards, we can create a Resource by using the factory method, please check [submodule1.service.js](https://github.com/AlbertWhite/angular-exercise/blob/master/app/components/subModule1/submodule1.service.js).

We can see in the service, we create a resource:

```js
angular.module("mainModule.subModule1").factory("Sub1Resource", Sub1Resource)

function Sub1Resource($resource) {
  return $resource(
    "https://randomuser.me/api/",
    {},
    {
      getUser: {
        url: "https://randomuser.me/api",
        method: "GET",
      },
    }
  )
}
```

And then use it in service:

```js
function getDataFromResource() {
  //singleton design pattern
  //one time, just one instance for the className
  if (!getUserPromise) {
    getUserPromise = Sub1Resource.getUser().$promise.then(function(results) {
      getUserPromise = null
      return results
    })
  }
  return getUserPromise
}
```

Using resource is not necessary, but it is good to have a resource to manage all the urls and restful api.

### 11. Someother tools

In [EnvService](https://github.com/juanpablob/angular-environment), we can set the url path and use it global.

Gulp is a friend with Angular. With gulp, at least we want to:

- Auto add all the .js file in the html (gulp-inject)
- Auto compile SASS to CSS and inject into html (gulp-sass)
- Server and live reload

Please take a look at [gulpfile.js](https://github.com/AlbertWhite/angular-exercise/blob/master/gulpfile.js)

Thanks for reading and welcome for any feedback or opinions!
