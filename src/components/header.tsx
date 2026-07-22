import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`

const StyledTitle = styled.h2`
  margin-bottom: 0;
  font-weight: 800;
  color: #111827;
  color: var(--app-main-color, #111827);
`

const StyledSubTitle = styled.h4`
  margin-top: 0;
  font-family: monospace;
  font-weight: 400;
  color: #9ca3af;
`

const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
`

const StyledLink = styled(Link)<{
  isDarkMode: boolean
  shouldHighLight: boolean
}>`
  box-shadow: none;
  font-weight: ${props => (props.shouldHighLight ? 700 : 400)};
  text-decoration: ${props => (props.shouldHighLight ? "underline" : "none")};
  text-underline-offset: 4px;
  color: ${props => {
    if (props.isDarkMode) return "white !important"
    return props.shouldHighLight ? "#111827" : "#9ca3af"
  }};
  &:hover {
    box-shadow: none;
  }
`

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

export default () => {
  let initialDarkMode = false
  if (typeof window !== "undefined") {
    // local storage cannot save boolean, it can only save string. It can not be found with SSR.
    initialDarkMode =
      JSON.parse(localStorage.getItem("isDarkMode") || null) || false
  }
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode))
    }
    if (isDarkMode) {
      document.querySelector("body").className = "dark"
    } else {
      document.querySelector("body").className = ""
    }
  }, [isDarkMode])

  let pathname = "/"
  if (typeof window !== "undefined") {
    pathname = window.location.pathname
  }
  const shouldHighLightAbout = pathname.includes("/about/")
  const shouldHighLightBlog = !shouldHighLightAbout

  return (
    <StyledHeader>
      <StyledTitleContainer>
        <StyledTitle>Albert Yuebai Xu</StyledTitle>
        <StyledSubTitle>fullstack developer</StyledSubTitle>
      </StyledTitleContainer>
      <StyledMenu>
        <StyledLink
          to={`/`}
          shouldHighLight={shouldHighLightBlog}
          isDarkMode={isDarkMode}
        >
          blog
        </StyledLink>
        <StyledLink
          to={`/about`}
          shouldHighLight={shouldHighLightAbout}
          isDarkMode={isDarkMode}
        >
          about
        </StyledLink>
      </StyledMenu>
    </StyledHeader>
  )
}
