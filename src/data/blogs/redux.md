---
title: "Rethink on data in React"
date: "2019-12-12"
category: "blog"
star: 5
---

According to Gatsby, data is something outside of the component. React doesn't have its officiel way to fetch and manage data, and it only has its officiel way to pass data with props, HOC...

That's why there are libraries for support, for example, `redux` or `graphql` to help with organizing the data, `redux-saga` or `redux-thunk` to help with manage async actions with redux, `fetch` or `axios` to fetch data. 

There are different patterns for fetching and managing data in React. Notamment, there are:

#### 1. Redux + Redux Thunk

Redux is used for organising data in the "Store". Store is like the database in frontend.

Redux Thunk helps with use dispatch after a fetch. Techniquement, we can manage the async actions in the action creator.

```js
// action.js
const fetchAction = (url) => {
  return dispatch => {
    fetch(url).
      then(res => {
        dispatch(updateAction(res.json()))
      }).
      catch(() => dispatch(fetchErrorAction()))
  }
}

```

[Better example](https://github.com/reduxjs/redux-thunk#composition)

#### 2. Redux + UseEffect

UseEffect hook also helps with manage async action. We can fetch data in useEffect.

##### Example with UseEffect without redux

```js
const App = () => {

  const [data, setData] = useState(null)

  useEffect(async () => {
    const data = await axios(url)
    setData(data)
  })

  return (
    ... // use data
  )
}

```

##### Example with useEffect and redux

```js
const App = ({id, data}) => ({

  useEffect(() => { 
    fetchData(id)  // after fetchData action,  set data in store
  }, [id])

  return (
    // use data
  )
})

const mapStateToProps = state => ({
  data: ...,  // from store
  id: ...,
})

const mapDispatchToProps = dispatch => ({
  fetchData: id => {
    dispatch(fetchData(id))
  }
})

export default connect(mapStateToProps)(App)

```


#### 3. Redux + Redux Saga

If there are lots of actions in chain, [Redux saga](https://github.com/redux-saga/redux-saga) is a better option than redux-thunk. The difference between redux-saga and redux-thunk, is like the difference between `async/await` and `promise.then()`.

```js
function *initPage() {
  yield put(fetchData)
  yield put(useData)
}

function *fetchData(data) { // listener to the action fetchData
  yield put(updateData)
}

```

Redux-saga also provides `call` function so the fetch/update process can be done 100% in the saga functions.

#### 4. Apollo GraphQL

Tired of redux and store ? [Apollo GraphQL](https://www.apollographql.com/) is a great replacement. 

With Apollo GraphQL, on client side we don't need to use redux to manage the front end database "store". Instead, Apollo GraphQL provides **cache** to be used as store. Apollo also provides the api to manipulate with cache. 

```js
const App = () => {
  const {loading, error, data} = useQuery(GET_DATA)
  
  return {
    // use data
  }
}
```

A better example with GraphQL is [here](https://github.com/AlbertWhite/apollo-fullstack-todolist) on github. 

#### Takeaway

With Redux, we can choose libraries like redux-thunk or redux-saga to manage async actions, but it is not necessary because we can manage async actions in useEffect. 

GraphQL is the future of front end development with cache as its database in front-end. 

#### Resource

- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
