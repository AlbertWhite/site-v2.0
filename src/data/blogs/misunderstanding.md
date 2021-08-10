---
title: "Some misunderstandings with React.memo, useMemo, and useCallback"
date: "2020-05-10"
category: "blog"
star: 5
---

[Read this article on medium](https://medium.com/@albertyuebaixu/some-misunderstandings-with-react-memo-usememo-and-usecallback-27449b670d60)

React.memo, PureComponent, React.useMemo, React.useCallback are React APIs for optimizing web performance. However, on the React official document website, there are only explanations without example, which makes it hard to understand the real use cases. In this article, I want to list my misunderstandings and pitfalls I had when I worked with these APIs.

Let's GO!

#### 1. If parent component rerender, will all the child components rerender, even if the props for the child component remain the same ?

The answer is Yes.

For the Root component, if the state or props don't change, the Root component will not rerender.

However, for the child components, even if they don't have any prop, or the props don't change at all, the child components will always rerender if the parent component rerenders.

There is only one exception: [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) or [React.memo](https://reactjs.org/docs/react-api.html#reactmemo). PureComponent is for classes, and React.memo is for functional components. In this case, **by default**, if **shallow comparison** determines that props don't change, the component will not rerender.

#### 2. Do we must implement shouldComponentUpdate for React.PureComponent ?

No. Except when you want to compare beyond the default shallow comparison.

#### 3. What's the relationship between React.memo and React.useMemo ?

Well, normally there is a relationship between A and useA, but it's a bit special for useMemo.

Let's take a look from the official doc, what does [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) use for:

> Returns a memoized value. This optimization helps to avoid expensive calculations on every render.`

I am sorry that it's a bit different from what [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) is used for:

> React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes..

After searching from StackOverFlow, I indeed found a way to create pure component with React.useMemo.

```js
const ChildMemoized = React.useMemo(
  () => <ChildByUseMemo prop={useMemoDependency} />,
  [useMemoDependency]
)
```

While using it, we must use it in this way:

```js
  <div>
    {ChildMemoized}
    {// <ChildMemoized/>} <!--not working-->
  </div>
```

useMemo returns a value. I guess that's why we must use it in the way of passing a variable.

#### 4. What is the official recommended usage for React.useMemo?

With the help of official documentation of useMemo

> useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.`

I made the following demo:

```js
const Component = ({ useMemoDependency }) => {
  const calculate = useMemoDependency => {
    console.log("calculate")
    // imagine there are expensive calculations here :)
    return useMemoDependency.slice(0)
  }

  const memoizedValue = React.useMemo(
    () => calculate(useMemoDependency), // calculate memoized value from dependency
    [useMemoDependency]
  )

  return <div>...</div>
}
```

If this useMemoDependency doesn't change, however many times Component rerenders, `console.log('calculate')` will show only once on component mounting.

#### 5. Can we replace useMemo by useCallback in the last example ?

We can replace it, but it will not work.

The [official doc for useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) mentions that **useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).**

But if we replace

```js
const memoizedValue = React.useMemo(
  () => calculate(useMemoDependency), // calculate memoized value from dependency
  [useMemoDependency]
)
```

by

```js
const memoizedValue = React.useCallback(
  calculate(useMemoDependency), // calculate memoized value from dependency
  [useMemoDependency]
)
```

`console.log('calculate')` will show on every rerendering.

I guess that we can replace useCallback by useMemo, but not in the inverse way.

#### 6. How to use useCallback to "prevent unnecessary renders" ?

It's also written on the [official doc](https://reactjs.org/docs/hooks-reference.html#usecallback), fascinating but confusing.

I have tried many times but it's not working:

```js
const ChildWithMemoizedProp = props => {
  console.log("render")
  return <div></div>
}

...

<ChildWithMemoizedProp
  memoizedValue={memoizedValue}
  setCount={setCount}
  memoizedOnClick={memoizedOnClick}
/>

...
```

In fact, the trick is that the component 'ChildWithMemoizedProp' should be PureComponent or React.memo.

#### 7. If ChildWithMemoizedProp is a PureComponent, we don't need to pass the memoized value to keep the equality of props, so why should we use useCallback ?

[Here](https://stackoverflow.com/questions/53159301/what-does-usecallback-usememo-do-in-react) is the best answer I found on stackoverflow.

In fact, web performance in React is a very complicated subject because of the mechanism of javascript. useCallback is used for the following situation:

```js
const Component = () => {
  const onClick = () => {}
  return <Child onClick={onClick}>
}
```

Every Component renders will create a new onClick function, even if Child is a PureComponent, it will do unwanted rerender because onClick is a new javascript function object.

However, if we declare the onClick in this way:

```js
const Component = () => {
  const onClick = useCallback(
    () => {...}), [], // dependency is empty to make sure it won't change
  );
  return <Child onClick={onClick}>
}
```

The PureComponent Child will not rerender if Component rerenders.

Equality of objects and functions is a difficult subject in javascript. For example, {} !== {}. We need to be careful with it to make sure the dependencies are really equal.

### 8. Will useCallback functions be called everytime when component rerender ?

Yes. Not like useMemo, which will be executed only once if the dependency array doesn't change, useCallback will be called everytime the compoent rerender, even if the dependency doesn't change.

The only purpose for useCallback is to returning the same callback function which will be passed to child component to prevent from child component rerendering.

#### 9. What is memoization ?

useCallback and useMemo will return memoized object. In computer science, [Memoized is a technique in which partial results are recorded (forming a memo) and then can be reused later without having to recompute them.](https://wikidiff.com/memoization/memorization)

The full working example is [here](https://github.com/AlbertWhite/react-demos/blob/master/demo45-usememo-usecallback/src/App.js).

Thanks for reading !
