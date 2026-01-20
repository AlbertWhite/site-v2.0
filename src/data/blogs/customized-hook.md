---
title: "Common patterns for customized hooks"
date: "2021-06-15"
category: "blog"
star: 5
keyword: "react"
---

Customized hooks are like helper functions in React, they encapsulate logics with different React native hooks: useState, useEffect, useCallback, useMemo, useContext, useRef. In this article, I am going to share some common patterns for customized hooks with the help of React native hooks.

Customized hooks should begin with `with`, to help React with identifying that it is a hook. The following chapter names could be named `useYourHook`.

## Level 1 : Customized hook with a single native hook

### useYourEffect

The usage of useEffect is to load something only on component mount and when its dependency array updates. It could be useful for some initializing work or for the tracking on page loads. If you want to share some logic between components with useEffect, then you can create your `useYourEffect`.

A good example could be `useEventListener`:

```js
const useEventListener = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => {
      // remove the event listener on component unmount
      window.removeEventListener(event, callback)
    }
  }, [])
}
```

### useYourContext

Context is replacing redux, with its handy hook coming out. In fact, redux is also using the Context API ! Without redux, we can easily share the data globally in your application with `useYourContext`.

```js

const YourContext = React.createContext({});

// wrap the App
export const YourContextProvider = ({children, value}) => (
  <YourContext.Provider value={value}>
    {children}
  </YourContext.Provider>
)

// used in functional component
export const useYourContext = () => (
  return React.useContext(YourContext)
)

// used in class component
export const withYourContext = (WrappedComponent) => (
  class YourContextWrapper extends React.Component {
    render {
      return (
        <YourContext.Consumer>
          {(values) => {
            return <WrappedComponent {...this.props} values={values} />;
          }}
        </YourContext.Consumer>
      );
    };
  };
)

```

### useYourMemo

This hook is used for generating a memoized value. For example, here is a Hook to detect if you are in mobile mode

```js
const useIsMobile() {
  if(typeof window === 'undefined') return false;
  const breakpoint = 30;
  return useMemo(() => {
    return window.matchMedia(`not all and (min-width: ${breakpoint}rem)`).matches
  })
}
```

### Why there is not many useYourCallback

useCallback is a special hook, it is not used for preventing from being called only once, but is used for creating a memoized callback which will be passed into the Child component and prevent from the Child component reloading only because of the callback function. In other words, if the callback is not being passed to the child component, then useCallback is useless.

You can refer to this [article](/misunderstanding/) I have written to clairy the difference between `React.memo`, `useMemo` and `useCallback`.

## Level 2: Customized hook with compound native hooks

Sometimes, only one native hook is not enough, especially when you want to create a state management system like redux, or managing the data fetching.

### useState + useCallback

It's a common pattern for state management, when the state is not complicated. In your customized hook, useState is used to manage the data, and useCallback is used as handlers to update the data. `Both data and handlers are exported`.

For example, if you want to create a hook to manage the count with some complicated calculations:

```js
const useCount = (initialCount) => {
  const [count, setCount] = useState(initialCount)

  const addCount = useCallback((number) => {
    return setCount(count + number)
  }, [])

  const subStractCount = useCallback((number) => {
    return subStractCount(count - number)
  }, [])

  return {
    count,
    addCount,
    subStractCount,
  }
}
```

The above function could be funny, but I bet you get the idea :)

### useReducer + useContext

What if the data structure to manage is complicated ? In this case, useReducer is needed to manage the data structure in a `reduce` function, and export a `dispatch` function to update the state. `useContext` is optional, but it could be useful to pass the state and dispatch everywhere in your app.

Feel interested ? You can refer to [this article](https://albertyuebaixu.medium.com/how-to-use-hooks-usecontext-usereducer-to-replace-redux-58b1b176abfe) that I have written to replace redux by useReducer and useContext.

In general, the idea is:

```js
// creating
const YourContext = React.createContext({})
const [state, dispatch] = useReducer(reducer, initialContext)

export const YourReducerContextPrivider = ({ children }) => (
  <YourContext.Provider value={{ state, dispatch }}>
    {children}
  </YourContext.Provider>
)

export const useYourContext = () => {
  return React.useContext(YourContext)
}

// using

const { state, dispatch } = useYourContext()
dispatch({ type: ActionTypes.Add }) // ActionTypes are defined in the reducer function
```

### useData (useEffect + useState)

They are quite common patterns for fetching data. There are two possibilities: fetch with rest api or graphql.

With rest api:

```js
export const useDataWithFetch = (url) => {
  const [data, setData] = useState({})

  useEffect(async () => {
    const result = await axios(url)
    setData(result.data)
  }, [])

  return data
}
```

It shows the idea, and [a much better example](https://www.robinwieruch.de/react-hooks-fetch-data) could be found in robinwieruch's blog.

### Summary

React hooks give us the potential and flexibility to create customized hooks for different purposes: memoize, share data, locate dom, manage state, lifecycle management... It's a really powerful tool and we should make good use of it.

Thanks for reading !
