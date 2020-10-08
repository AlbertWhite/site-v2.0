---
title: "Three ways to create layout component in React"
date: "2020-08-28"
category: "blog"
star: 5
---

Well it is just a simple summary for how to use children props, HOC (Higher Order Component), and render props. They are not complicated to use, but it takes some efforts to remember to use them wisely and properly. For example, a common user case for HOC and renderProps are: customize the props for components inside Layout component.

#### Children props

```js
const Layout = ({children}) => (
  <div>
    {children}
  </div>
)

// to use
<Layout>
  <p>hello worlds</p>
</Layout>
```

#### Updated 2020/10/08: Pass props to children in layout component with React.cloneElement

```js
const childrenWithClient = React.cloneElement(children, injectedProps)
```

##### Updated 2020/08/28: Pass arrow function as children prop

We can also pass an arrow function as the child component. **It's very useful for creating "helper wrapper" component.**

Let's take an example of [`<Query>`](https://www.apollographql.com/docs/react/v2.5/essentials/queries/#the-query-component) component from apollo-graphql. Here is the usage:

```js
<Query query={SOME_QUERY}>
  {({ data, error }) => {
    if (error) {
      return null
    }
    if (data) {
      return <App data={data} />
    }
  }}
</Query>
```

In `Query` component, we pass an arrow function as the `children` props, let's imagine how Query component can be written:

```js
const Query = ({children}) {
  const {data, error} = getData();
  return children(data, error);
}

```

#### Higher Order Component

```js
const withLayout = Component => {
  return () => (
    <>
      <Component />
    </>
  )
}

// to use

withLayout(Component)
```

#### Render Props

The idea of render props is to pass a component (a function) as a prop.

Here is the basic example:

```js
const Layout = ({ render }) => (
  <>
    {render()}
  </>
)

// to use
<Layout render={() => <Component/>}>
```

or

```js
const Layout = ({ content }) => (
  <>
    {content}
  </>
)

// to use
<Layout content={<Component/>}>

```

or

```js
const Layout = ({ content }) => (
  <>
    {content}
  </>
)

// to use
const content = <div>content</div>
<Layout content={content}/>

```
