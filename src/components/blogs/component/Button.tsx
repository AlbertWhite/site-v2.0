import React from "react"
import styled, { keyframes } from "styled-components"
import { Orange } from "./Color"

const animation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const StyledSpinner = styled.div`
  display: block;
  border: 2px solid white;
  border-top: 5px solid ${Orange};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${animation} 2s linear infinite;
`

const Spinner = () => <StyledSpinner />

const StyledButton = styled.button`
  display: block;
  width: 100px;
  height: 42px;
  padding: 5px 10px;
  border: 0;
  border-radius: 2px;
  -webkit-appearance: none;
  appearance: none;
  background-color: ${Orange};
  cursor: pointer;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  font-weight: 600;
  font-weight: normal;
  line-height: 1;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: center;

  &:hover,
  &:visited,
  &:active,
  &:focus {
    background: lighten(${Orange}, 5%);
    border-color: lighten(${Orange}, 5%);
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      background-color: ${Orange};
    }
  }
`

export default ({
  type,
  disabled,
  isloading, // gatsby-remark-component does not support maj case in prop
  children,
  ...otherProps
}: any) => {
  return (
    <StyledButton {...otherProps} disabled={disabled} type={type}>
      {isloading ? <Spinner /> : children}
    </StyledButton>
  )
}
