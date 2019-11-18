import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`

const StyledTitle = styled.h2`
  margin-bottom: 0;
`

const StyledSubTitle = styled.h4`
  margin-top: 0;
`

const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0 40px 0;
  justify-content: space-around;
`

const StyledLink = styled(Link)`
  box-shadow: ${(props: { shouldHighLight: boolean }) =>
    props.shouldHighLight ? "box-shadow: 0 1px 0 0 currentColor;" : "none"};
  font-weight: bold;
  color: black !important;
`

export default () => {
  const pathname = window.location.pathname
  let shouldHighLightAbout = false
  let shouldHighLightBlog = false
  let shouldHighLightCode = false
  let shouldHighLightUX = false

  switch (pathname) {
    case "/":
      shouldHighLightAbout = true
      break
    case "/code":
      shouldHighLightCode = true
      break
    case "/ux":
      shouldHighLightUX = true
      break
    default:
      shouldHighLightBlog = true
      break
  }

  return (
    <>
      <StyledTitleContainer>
        <StyledTitle>Albert Yuebai XU</StyledTitle>
        <StyledSubTitle>Javascript Developer</StyledSubTitle>
      </StyledTitleContainer>
      <StyledMenu>
        <StyledLink to={`/`} shouldHighLight={shouldHighLightAbout}>
          About
        </StyledLink>
        <StyledLink to={`/code`} shouldHighLight={shouldHighLightCode}>
          Project
        </StyledLink>
        <StyledLink to={`/blog`} shouldHighLight={shouldHighLightBlog}>
          Blog
        </StyledLink>
        <StyledLink to={`/ux`} shouldHighLight={shouldHighLightUX}>
          UX portfolio
        </StyledLink>
      </StyledMenu>
    </>
  )
}
