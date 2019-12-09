import React from "react"
import styled from "styled-components"

const StyledLabel = styled.label`
  font-size: 0.7rem;
  color: gray;
`

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  height: 32px;
  padding: 2px 20px 2px 0;
  border: 0;
  border-bottom: 1px solid gray;
  background: white
    url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgNDAiPjxwYXRoIGZpbGw9IiM0NDQiIGQ9Ik01IDE4LjZsNS4yLTcuMSA0LjggNy4xSDV6bTEwIDIuOGwtNC44IDcuMUw1IDIxLjRoMTB6Ii8+PC9zdmc+)
    no-repeat right;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: white;
  background-size: 16px;
  border-radius: 0;
  box-shadow: none;
  color: black;
  font-size: 14px;
  font-weight: 300;
  outline: 0;
`

export default ({ label, placeholder, error, name }: any) => {
  const options = [
    { value: "a", label: "a" },
    { value: "b", label: "b" },
  ]

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}
      {error && <span>{error}</span>}
      <StyledSelect name={name}>
        {placeholder && <option value={-1}>{placeholder}</option>}
        {options &&
          options.map((option: { value: String; label: String }) => {
            const value = option.value ? option.value : option.label || option
            return <option>{option.label || value}</option>
          })}
      </StyledSelect>
    </div>
  )
}
