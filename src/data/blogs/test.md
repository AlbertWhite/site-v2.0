---
title: "Write test for React: component, hoc, hooks, promise, saga, graphql, custom hooks"
date: "2020-10-09"
category: "blog"
star: 4
---

[Read this article on medium](https://medium.com/@albertyuebaixu/write-test-for-react-component-hoc-hooks-promise-saga-b04b231ac9e8)

In this article, I will talk about writing test for react component, connected component, hoc, react hooks, redux saga function (generator function), and function with promise. In the end, I will also talk about an important technique: how to mock functions.

Examples are available in this git repo: [react test demos](https://github.com/AlbertWhite/react-test-demos)

### 1.Test for react component

We will begin with tests for react component with [Enzyme](https://airbnb.io/enzyme/). If you have already worked with Enzyme, you should know that there are **shallow** and **mount** for rendering the component. Mount is for rendering the full DOM while shallow will not render the sub component unless you **'find'** and **'dive'** into it.

Imagine that we have a component with the name of "Com" with another component "SubCom" inside. Here is an example of test:

```javascript
it("should have classes with name of container and subContainer", () => {
  // test with mount

  // WHEN
  const wrapper = mount(<Com />)

  // THEN
  expect(wrapper.find(".container").length).toEqual(1)
  expect(wrapper.find(".subContainer").length).toEqual(1)
})

it("should have a subComponent", () => {
  // test with shallow

  // WHEN
  const wrapper = shallow(<Com />)
  // THEN
  expect(wrapper.find("SubCom").length).toEqual(1)
  expect(wrapper.find("SubCom").props()).toEqual({ testProp: "testProp" }) // need to find the SubComponent in shallow rendering
})

it("func should be executed if we click on subComponent", () => {
  // GIVEN
  const func = jest.fn()
  const props = { func }

  // WHEN
  const wrapper = mount(<Com {...props} />)
  wrapper.find(".subContainer").simulate("click")

  // THEN
  expect(func).toBeCalled()
})
```

[Link to source code](https://github.com/AlbertWhite/react-test-demos/tree/master/src/component).

### 2. Test with connected component and HOC (Higher Order Component)

['Connect'](https://react-redux.js.org/api/connect) in react-redux is a higher order component. I will give two examples about how to test a connected component, and how to test another higher order component like [redux-form](https://github.com/erikras/redux-form).

```js
it("Should be able to test connected component", () => {
  // GIVEN
  const store = createStore(() => ({})) // mock store

  // WHEN
  const wrapper = mount(
    <Provider store={store}>
      // in need of a Provider for connected component
      <ConnectedComponent />
    </Provider>
  )

  // THEN
  expect(wrapper.find("div").length).toEqual(1)
})

it("should be able to test redux form", () => {
  // GIVEN
  const store = createStore(() => ({}))

  // WHEN
  const ConnectedReduxFormComponent = reduxForm({ form: "test" })(FormComponent)
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedReduxFormComponent />
    </Provider>
  )

  // THEN
  expect(wrapper.find("form").length).toEqual(1)
})
```

Link to [source code](https://github.com/AlbertWhite/react-test-demos/tree/master/src/connectedComponent).

### 3. Test with redux-saga

Redux-saga use [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), so test with saga function is to play with the ["next"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next) in generator function. Every 'yield' should correspond to an execution with 'next()'.

```js
// saga function
function* testGeneratorFunction() {
  yield call(testFunction, "test1")
  yield call(testFunction, "test2")
  yield call(testFunction, "test3")
}

// test
it("should call testFunction", () => {
  // GIVEN
  const gen = testGeneratorFunction()

  // WHEN
  let next = gen.next()
  let effect = call(testFunction, "test1")

  // THEN
  expect(next.value).toEqual(effect) // .next().value return the value from yield

  // WHEN
  next = gen.next()
  effect = call(testFunction, "test2")

  // THEN
  expect(next.value).toEqual(effect)

  // WHEN
  next = gen.next()
  effect = call(testFunction, "test3")

  // THEN
  expect(next.value).toEqual(effect)
})
```

[Link to source code](https://github.com/AlbertWhite/react-test-demos/tree/master/src/generatorFunctionOrReduxSaga).

### 4. Test with function who returns promise

Enzyme provides **resolves** and **rejects** to help with [testing with async](https://jestjs.io/docs/en/asynchronous.html), but it is also possible to test the promise by mocking the execution of promise with 'then'.

```js
// the original function
const service = input => {
  return new Promise((resolve, reject) => {
    if (input) {
      resolve("ok")
    } else {
      reject("error")
    }
  })
}

// the test
it("should return ok if input is true with .resolves", () => {
  const promise = service(true)
  return expect(promise).resolves.toBe("ok")
})

it("should return ok if input is true with .then", () => {
  // remember to return the promise in the end
  return service(true).then(data => {
    expect(data).toBe("ok")
  })
})

it("should return error if input is false with .rejects", () => {
  const promise = service(false)
  return expect(promise).rejects.toMatch("error")
})

it("should return error if input is false with .then", () => {
  return service(false).catch(error => {
    expect(error).toBe("error")
  })
})
```

[Link to source code](https://github.com/AlbertWhite/react-test-demos/tree/master/src/promise).

### 5. Test components with react hooks

In order to test hooks, I use [react testing library](https://testing-library.com/docs/react-testing-library/intro). React testing library is competitor of Enzyme for react integration test. The idea behind this library is to test the DOM by simulating the real user interface. It is like "mount" in Enzyme. (Update 2019/08/27: Enzyme now also supports hooks.)

```js
import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { ComponentWithHooks } from "./componentWithHook"

describe("ComponentWithHooks", () => {
  test("show default text", () => {
    // WHEN
    const { getByText, queryByText } = render(<ComponentWithHooks />)

    // THEN
    expect(getByText("Hello")).toBeInTheDocument()
    expect(queryByText("World")).not.toBeInTheDocument() // query by won't throw https://testing-library.com/docs/dom-testing-library/cheatsheet#queries
  })
  test("show default text", () => {
    // WHEN
    const { queryByTestId } = render(<ComponentWithHooks />)

    // THEN
    expect(queryByTestId("clicked")).not.toBeInTheDocument()

    // WHEN
    fireEvent.click(queryByTestId("button"))

    // THEN
    expect(queryByTestId("clicked")).toBeInTheDocument()
  })
})
```

[Link to source code](https://github.com/AlbertWhite/react-test-demos/tree/master/src/hook).

### 6. Test graphql queries

We can test graphql queries by providing a [MockedProvider](https://www.apollographql.com/docs/react/development-testing/testing/#mockedprovider) for mocked query responses. An example will be shown in the next part 'Test custom hooks'.

If the query is made by the hook **useQuery** and if it is used only once in the component, it is not a bad way to mock **useQuery** to return the expected result. (For more information: [How to mock dependencies in jest: the pitfalls, the tricks and the best practices]())

### 7. Test custom hooks

What is the custom hook ?
[A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks.](https://reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook)
Component is for the UI, then the custom hook is for your component logic. It can be how we get and format data, and it can be also how to handle the callbacks.

Without a library, it is not easy to test a custom hook independently because it "lives" in a component.
Luckily the library [react hooks testing library](https://react-hooks-testing-library.com/) helps us solve this problem.

Let's take an example of a custom hook which uses two other hooks (useContext and useQuery).

```js
const useMyHook = () => {
  const {id} = useMyContext() // get data from my context
  const {data, error, loading} = useQuery(query, variables: {id}) // use graphql hook to get data
  const formattedData = //... format data
  return formattedData // return data
}


// to test

// the hook use context and query, in this case we need to create wrapper for test
const GQLMockedProvider = ({children}) => (
  <MockedProvider mocks={...}> {/* MockedProvider from apollo to mock query responses */}
    <MyContext.Provider> {/* Wrap context provider for hook wrapper */}
      {children} {/* the children here is necessary, if not the hook won't be rendered*/}
    </MyContext.Provider>
  </MockedProvider>
)


describe('my hook', () => {
  it('should return right data', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useMyHook(), {
      wrapper: GQLMockedProvider, // use the wrapper
    });
    await waitForNextUpdate() // useQuery is async
    expect(result.current).toEqual(...)
  })
})

```

Thanks for reading !
