---
title: "How to use hooks (useContext, useReducer) to replace redux"
date: "2020-06-29"
category: "blog"
star: 5
---

### Intro

In the beginning of development with React, Redux has been a great tool for managing data with certain drawbacks. The drawbacks include:

- Sometimes we have too many layers of components if they are connected. The 'connect' is actually a Higher Order Component.
- Sometimes we need to pass data through multiple levels to reach the component needed

React has introduced context and its own hook '**useContext**' to prevent from passing data through layers. With the hook **useReducer**, we can easily create a dispatch function by yourself. With the help of context, we can use the dispatch function everywhere, then why not make a try with replacing redux with **useContext** and **useReducer** ?

In this article, I will write down a tutorial on how to replace redux by useContext and useReducer with a working example. The code is [here](https://github.com/AlbertWhite/react-demos/tree/master/demo46-usecontext-usereducer-replace-redux).

### Some thinking on 'use' and 'with' in React

Just before this tutorial, I want to share something with hooks. React Hooks reinforce the development of react and make it more flexible. In general, there are two ways : 'use' and 'with'. 'use' is always used for customizing hooks, for example, 'useEffect', or [customized](https://reactjs.org/docs/hooks-custom.html) 'useMyEffect', 'useContext', or 'useMyContext'. 'with' is always used as HOC component. You can check an example of it with my article [Create HOC pattern 'withContext' for context](https://www.yuebaixu.com/context/).

Ok, let's start our tutorial:

### Step 1: Create context

The first step is to create Context. In react-redux, we distinguish state and dispatch with 'mapStateToProps' and 'mapDispatchToProps', so in our example, we also create **two** context to distinguish 'data' and 'action'.

Let's create two contexts: StateContext and DispatchContext with `React.createContext`.

```javascript
const initialContext = {...}

const StateContext = React.createContext(initialContext)
const DispatchContext = React.createContext(undefined)

```

### Step 2: Prepare the reducer function

I am making a simple example, and this reducer function supports two actionTypes: ADD and SUBTRACT.

```js
export const ActionTypes = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return ++state
    case ActionTypes.SUBTRACT:
      return --state
    default:
      return state
  }
}
```

### Step 3: Create Context provider for state and dispatch

Then, in the ContextProvider component, we wrap our children component inside the two context providers, to make data and actions available anywhere.

We also need to use **useReducer** with the reducer function to have state and dispatch, and then pass them as the initial values in `<StateContext.Provider/>` and `<DispatchContext.Provider/>`

```js
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialContext)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
```

### Step 4: Create customized hooks for useState and useDispatch

In order to use the state and dispatch actions everywhere in the app, we customize two hook functions.

In the hook useUIDispatch, we get the **dispatch** function from context, return a series of actions with ActionTypes. We use useCallback and useMemo for memoization.

```js
export const useUIState = () => {
  return React.useContext(StateContext)
}

export const useUIDispatch = () => {
  const dispatch = React.useContext(DispatchContext)

  if (dispatch === undefined) {
    throw new Error("useBookingDispatch must be used within a BookingProvider")
  }

  const add = React.useCallback(() => {
    dispatch({ type: ActionTypes.ADD })
  }, [dispatch])

  const subtract = React.useCallback(() => {
    dispatch({ type: ActionTypes.SUBTRACT })
  }, [dispatch])

  return React.useMemo(
    () => ({
      add,
      subtract,
    }),
    [dispatch]
  )
}
```

### Step 5: Wrap the `<App/>` inside the Provider

```js
function App() {
  return (
    <ContextProvider>
      <>
        <Number />
        <Button />
      </>
    </ContextProvider>
  )
}
```

### Step 6: Use customized hooks to get value and dispatch actions

```js
import { useUIDispatch } from "./UIContext"

export const Button = () => {
  const { add, subtract } = useUIDispatch()

  return (
    <>
      <button
        type="button"
        onClick={() => {
          add()
        }}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          subtract()
        }}
      >
        -
      </button>
    </>
  )
}
```

```js
export const Number = () => {
  const state = useUIState()
  return <>{state}</>
}
```

That's all of it. You can find a working demo on [here](https://github.com/AlbertWhite/react-demos/tree/master/demo46-usecontext-usereducer-replace-redux). Thanks for reading !
