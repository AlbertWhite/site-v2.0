---
title: "Rethink on React component patterns"
date: "2019-12-09"
category: "blog"
star: 5
---

As with mentioned by the [first part of tutorial from Gatsby](https://www.gatsbyjs.org/tutorial/part-one/#building-with-components):

> Components become the base building blocks of your site. Instead of being limited to the building blocks the browser provides, e.g. , you can easily create new building blocks that elegantly meet the needs of your projects.

The basic example should be: instead of creating `<button className="primary-button">`, we can create our own `<PrimaryButton/>` and use it throughout the website.

Gatsby also has a great notion about hierarchy of components:

- **Layout Component** for shared Header and Footer
- **Page Component** for every route
- **UI Component** for the rest of components

React provides some approches to organise our component, like HOC, renderProps. In this article, I will talk about some common patterns for organizing components with React.

#### 1 Add variants in props to switch the output

Format HTMl controls into Components
HTML native input, button are ugly and we will not use it directly into our website. The best solution, should be creating our own HTML control components and pass variants in props to control to attributes, onClick function and switch the output.

##### 1. Button Component

```js
const Button = ({ isloading, children, ...otherProps }) => {
  return (
    <StyledButton {...otherProps}>
      {isloading ? <Spinner /> : children}
    </StyledButton>
  )
}
```

##### Normal Button

```js
<Button>Button</Button>
```

<Button>Button</Button>

##### Loading Button

```js
<Button isloading="true">isLoading</Button>
```

<Button isloading="true">isLoading</Button>

##### Disabled Button

```js
<Button disabled>disabled</Button>
```

<Button disabled>disabled</Button>

#### 2. Combined HTML Controls

A HTML control doesn't live lonely in the DOM. It is always accompanied with a Label and error message. For the component `<Select/>`, `<input type="radio"/>`, it is even more important to combine other HTML controls like `<Options>` or multiple radio input.

##### Select Component

```js
const Select = props => {
  const { options, label, placeholder, error, name } = props
  return (
    <div>
      {label && <label>{label}</label>}
      {error && <span>{error}</span>}
      <select name={name}>
        {placeholder && <option value={-1}>{placeholder}</option>}
        {options &&
          options.map((option: { value: String, label: String }) => {
            const value = option.value ? option.value : option.label || option
            return <option>{option.label || value}</option>
          })}
      </select>
    </div>
  )
}
```

##### Use Select Component

```js
<Select
  label="Letter"
  placeholder="Please choose a letter"
  options="[{value: 'a', label: 'a'}, {value: 'b', label: 'b'}]"
/>
```

<Select label="Letter" placeholder="Please choose a letter" />

#### 3. Render children and condition

wishlist control component

Countryfilter

Modal component

Authentication render props, Context

Account HOC
