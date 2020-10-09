---
title: "How to mock default import and named import in jest"
date: "2020-10-09"
category: "blog"
star: 4
---

Dependencies make tests complicated. Mock them help us concentrate on the things we really want to test.

There are two possibilities of import: default import (`import A from`) and named import (`import {A} from`). In general, mock default import is much easier than mock named import. In case of mocking, there is also a difference of mock only once and mock multiple times.

### Mock default import only once

```js
import func from "./defaultDependency"

jest.mock("./defaultDependency", () => input => input) // mock should in the beginning

describe("func", () => {
  it("should work with mock dependency", () => {
    expect(func("hello")).toEqual("hello")
  })
})
```

### Mock default import multiple times

```js
import reverseString from "./defaultDependency"

jest.mock("./defaultDependency")

describe("func", () => {
  it("should work with mock dependency", () => {
    reverseString.mockImplementationOnce(input => input)
    expect(func(true, "hello")).toEqual("hello")
  })

  it("should work with mock dependency", () => {
    reverseString.mockImplementationOnce(input => input + "1")
    expect(func(true, "hello")).toEqual("hello1")
  })
})
```

### Mock named import only once

```js
import { func } from "./nameDependency"

jest.mock("./nameDependency", () => ({ sameString: input => input + "1" })) // mock should in the beginning

describe("func", () => {
  it("should work with mock dependency", () => {
    expect(func("hello")).toEqual("hello1")
  })
})
```

### Mock named dependency multiple times

```js
import * as nameDependencies from "./nameDependency"

nameDependencies.sameString = jest.fn() // not recommended because it modify the readonly import

describe("func", () => {
  it("should work with mock dependency", () => {
    nameDependencies.sameString.mockImplementationOnce(input => input + "2")
    expect(func("hello2")).toEqual("hello2")
  })

  it("should work with mock dependency", () => {
    nameDependencies.sameString.mockImplementationOnce(input => input + "3")
    expect(func("hello3")).toEqual("hello3")
  })
})
```

### Mock named import, but still need other named imports from the same dependency

This case is a bit tricky, because we cannot use `jest.mock("./nameDepdency")` here because it will override the whole import.
In this case, jest [spyOn](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) provides a nice solution.

```js
import * as functions from "./nameDependency"

jest.spyOn(functions, "func").mockImplementation(input => input)

describe("func", () => {
  it("should work with mock dependency", () => {
    expect(func("hello")).toEqual("hello")
  })
})
```

[Link to source code](https://github.com/AlbertWhite/react-test-demos/tree/master/src/dependency).
