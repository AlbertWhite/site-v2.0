import React from "react"
import styled, { css } from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"

interface IProjectItemProps {
  image: object
  link: string
  title: string
  tech: string
}

const sharedStyle = css`
  position: relative;
  text-decoration: none;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`

const StyledInternalLink = styled(Link)`
  ${sharedStyle}
`

const StyledExternalLink = styled.a`
  ${sharedStyle}
`

const StyledProjectInfo = styled.div`
  opacity: 1;
  transition: all 0.2s ease-out;
  position: absolute;
  width: 100%;
  top: 0;
  background-color: rgba(16, 7, 25, 0.7);
  color: white;
  text-align: center;
  padding: 50px 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  ${StyledInternalLink}:hover & {
    opacity: 0;
  }
  ${StyledExternalLink}:hover & {
    opacity: 0;
  }
`

const StyledTech = styled.div`
  margin-left: 1rem;
`

export default ({ image, link, title, tech }: IProjectItemProps) => {
  const Container = link.includes("http")
    ? StyledExternalLink
    : StyledInternalLink

  return (
    <Container to={link} href={link}>
      <Img fixed={image} alt="headshot" />
      <StyledProjectInfo>
        <div>{title}</div>
        <StyledTech>{tech}</StyledTech>
      </StyledProjectInfo>
    </Container>
  )
}
