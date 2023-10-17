---
title: "Create HOC pattern for context"
date: "2020-04-02"
category: "blog"
star: 4
keyword: "react"
---

Some data should be shared throughout the whole application, for example, the site language, the device size. A common solution is to use redux and share the data in store.

In this article, I will talk with another way to share data inside application: by creating a HOC component for context `withContext(Component)`. A HOC, is to create a component with the form of `withSomething`. The advantage of this solution, is to pass context data to whatever which component by using `withContext(Component)`.

The implementation consists of three steps: Create context provider, create context hoc consumer, and finally, use it.

#### Context Provider

```js
const DeviceContext = React.createContext(initialData)

const DeviceContextProvider = props => {
  return (
    <DeviceContext.Provider value={initialData}>
      {this.props.children}
    </DeviceContext.Provider>
  )
}
```

Initial data from context provider can come from redux (by `connect`), or by javascript calculation. For the second case, we can take a look at an [example](https://github.com/AlbertWhite/react-demos/blob/master/demo42-context-design-pattern/src/shared/contexts/device/provider.js) for detecting the current device with `window.matchMedia(query)`.

#### Context Consumer HOC

```js
const withDeviceContext = Component => {
  return props => (
    <DeviceContext.Consumer>
      {data => <Component contextData={data} {...props} />}
    </DeviceContext.Consumer>
  )
}
```

#### Use

First, we need to wrap the Root component with `<ContextProvider/>`:

```js
function App() {
  return (
    <DeviceProvider>
      <ComponentWithDeviceInfo />
    </DeviceProvider>
  )
}
```

Then, for whatever which component with the need of context data, we can use it by

```js
const ComponentWithDeviceInfo = ({ contextData }) => <>...</>
export default withDeviceContext(ComponentWithDeviceInfo)
```

Please see the full example [here](https://github.com/AlbertWhite/react-demos/tree/master/demo42-context-design-pattern/src).

Thanks for reading!
