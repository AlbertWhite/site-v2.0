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
`

const StyledLink = styled(Link)`
  margin-left: 50px;
  box-shadow: none;
`

export default () => {
  return (
    <>
      <StyledTitleContainer>
        <StyledTitle>Albert Yuebai XU</StyledTitle>
        <StyledSubTitle>Javascript Developer</StyledSubTitle>
      </StyledTitleContainer>
      <StyledMenu>
        <StyledLink to={`/`}>About</StyledLink>
        <StyledLink to={`/code`}>Project</StyledLink>
        <StyledLink to={`/blog`}>Blog</StyledLink>
        <StyledLink to={`/ux`}>UX portfolio</StyledLink>
      </StyledMenu>
    </>
  )
}
