import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Header from "./header"
import Footer from "./footer"

const StyledContainer = styled.div`
  align-items: center;
  max-width: var(--app-max-width, 672px);
  max-width: 672px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 80%;
  }
`

export default ({ children }: any) => {
  return (
    <StyledContainer>
      <Header />
      {children}
      <Footer />
    </StyledContainer>
  )
}
