---
title: "Rethink on React component patterns"
date: "2019-12-09"
category: "blog"
star: 5
---

As mentioned by the [first part of tutorial from Gatsby](https://www.gatsbyjs.org/tutorial/part-one/#building-with-components):

> Components become the base building blocks of your site. Instead of being limited to the building blocks the browser provides, e.g. , you can easily create new building blocks that elegantly meet the needs of your projects.

The basic example should be: instead of creating `<button className="primary-button">`, we can create our own `<PrimaryButton/>` and use it throughout the website.

Gatsby also has a great notion about hierarchy of components:

- **Layout Component** for shared Header and Footer
- **Page Component** for every route
- **UI Component** for the rest of components

React provides some approaches to organise our component, like HOC, renderProps. In this article, I will talk about some common patterns for organizing components with React.

#### 1 Add variants in props to switch the output

Format HTMl controls into Components
HTML native input, button are ugly and we will not use it directly into our website. The best solution, should be creating our own HTML control components and pass variants in props to control attributes, onClick function and switch the output.

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
<Button onClick="callbackFunction">Button</Button>
```

<Button>Button</Button>

##### Loading Button

```js
<Button isloading="true" onClick="callbackFunction">
  isLoading
</Button>
```

<Button isloading="true">isLoading</Button>

##### Disabled Button

```js
<Button disabled onClick="callbackFunction">
  disabled
</Button>
```

<Button disabled>disabled</Button>

#### 2. Combined HTML Controls

A HTML control doesn't live alone in the DOM. It is always accompanied with a Label and error message. For the component `<Select/>`, `<input type="radio"/>`, it is even more important to combine other HTML controls like `<Options>` or multiple radio input.

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

<Select label="Letter" placeholder="Please choose a letter" ></Select>

It is also possible to create your own component with MaterialUI, and it is a good practice to leave two hooks "onChange" and "value" as props. If you want to control the component outside of component itself. **The way how you construct your form control component depends on how you organise your form**.

#### 3. Use logic in component

Component is not only HTML tags. Component also contains **logic**, so that we can pass callback function and variables into the component to make it more complicated.

Component can be used to format data, to initial service, to render children content with condition.

For example, we can use [onErrorDidCatch](https://reactjs.org/docs/react-component.html#componentdidcatch) to implement a new layer of component as error boundary.

##### Render children with condition

```js
// Show Component only for certain countries
const CountryFilter = ({children, countries}) => {
  const country = useContext(CountryContext)
  {countries.includes(country) ? children : null}
}

// usage
<CountryFilter countries={['FR']}>
  <CountryText>
</CountryFilter>
```

##### Error boundary

```js
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: "" }
  }

  componentDidCatch(error) {
    this.setState({ error })
    trackError(error) // if track exist
  }

  render() {
    const { error } = this.state
    if (error) {
      return <Error />
    }
    return this.props.children
  }
}

// usage
;<ErrorBoundary>
  <App />
</ErrorBounday>
```

#### 4. Layout Component, Page Component, and other Component

Make use of hierarchy of components can help with organising components for all levels.

- **Layout Component** for shared Header and Footer
- **Page Component** for every route
- **UI Component** for the rest of components

```js
const ResponsiveLayout = ({children}) => {
  <Header/>
    {children}
  <Footer/>
}

const App = (contextValue) => {
  <AppContext.Provider value={contextValue}>
    <ResponsiveLayout>
      <Switch>
        <Route component={PageA} path={routes.a} exact>
        <Route component={PageB} path={routes.b}>
      </Switch>
    </ResponiveLayout>
  </AppContext.Provider>
}
```

#### 5. RenderProps

RenderProps is like children props, but it is more flexible.

```js
const PaymentLayout = ({render, payment}) => {
  return (
    <Header/>
    {
      render(payment)
    }
  )
}

const PaymentMethod = (payment) => {
  ...
}

// usage: render all payment methods
...
payments.map(payment => (
  <PaymentLayout payment={payment} render={
    payment => (<PaymentMethod payment/>)
  }/>
))

```

#### Bonus: [Material UI](https://material-ui.com/getting-started/installation/)

React provides strategies to organise components, but it doesn't provide components itself.

Because of that, there are lots of third parties React library for controls, like React-Toggle, React-Modal, ...

Material UI provides all components in one library. The more interesting thing is that we can use Material UI to create our own component.

##### ButtonWithMenu

```js
import Menu from "@material-ui/core/Menu"

const ButtonWithMenu = ({ children, content, className }) => {
  const buttonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <button
        ref={buttonRef}
        className={`${className}`}
        onClick={handleOpen}
        type="button"
      >
        {content}
      </button>
      <Menu anchorEl={buttonRef.current} onClose={handleClose} open={isOpen}>
        {children}
      </Menu>
    </div>
  )
}

// usage
;<ButtonWithMenu content={<div>...</div>}>
  <MenuItem>...</MenuItem>
</ButtonWithMenu>
```
