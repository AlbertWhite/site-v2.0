---
title: "Three ways to create layout component in React"
date: "2020-04-05"
category: "blog"
star: 2
---

Well it is just a simple summary for how to use children props, HOC (Higher Order Component), and render props. They are not complicated to use, but it takes some efforts to remember to use them wisely and properly. For example, a common user case for HOC and renderProps are: customize the props for components inside Layout component.

### children props

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

### Higher Order Component

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

### Render Props

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
