import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import "react-toggle/style.css"
import Toggle from "react-toggle"

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`

const StyledTitle = styled.h2`
  margin-bottom: 0;
  color: #663399;
  color: var(--app-main-color, #663399);
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
  box-shadow: ${(props: { isDarkMode: boolean; shouldHighLight: boolean }) =>
    props.shouldHighLight ? "box-shadow: 0 1px 0 0 currentColor;" : "none"};
  font-weight: bold;
  color: ${(props: { isDarkMode: boolean; shouldHighLight: boolean }) =>
    props.isDarkMode ? "white !important" : "black"};
`
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const StyledToggle = styled(Toggle)``

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
    case "/cup/":
    case "/fortify/":
    case "/love/":
    case "/momenthere/":
    case "/sleep/":
    case "/train/":
      shouldHighLightUX = true
      break
    default:
      shouldHighLightBlog = true
      break
  }

  return (
    <>
      <StyledHeader>
        <StyledTitleContainer>
          <StyledTitle>Albert Yuebai XU</StyledTitle>
          <StyledSubTitle>Javascript Developer</StyledSubTitle>
        </StyledTitleContainer>
        <StyledToggle
          className="customToggle"
          defaultChecked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          icons={false}
        />
      </StyledHeader>
      <StyledMenu>
        <StyledLink
          to={`/`}
          shouldHighLight={shouldHighLightAbout}
          isDarkMode={isDarkMode}
        >
          About
        </StyledLink>
        <StyledLink
          to={`/code`}
          shouldHighLight={shouldHighLightCode}
          isDarkMode={isDarkMode}
        >
          Project
        </StyledLink>
        <StyledLink
          to={`/blog`}
          shouldHighLight={shouldHighLightBlog}
          isDarkMode={isDarkMode}
        >
          Blog
        </StyledLink>
        <StyledLink
          to={`/ux`}
          shouldHighLight={shouldHighLightUX}
          isDarkMode={isDarkMode}
        >
          UX portfolio
        </StyledLink>
      </StyledMenu>
    </>
  )
}
