import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Header from "./header"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 672px;
  margin: 0 auto;
`

export default ({ children }: any) => {
  return (
    <StyledContainer>
      <Header />
      {children}
    </StyledContainer>
  )
}
