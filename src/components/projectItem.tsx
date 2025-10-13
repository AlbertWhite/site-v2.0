import React from "react"
import styled, { css } from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

interface IProjectItemProps {
  image: any // Update this to match your GraphQL data structure
  link: string
  title: string
  tech: string
}

const sharedStyle = css`
  position: relative;
  text-decoration: none;
  box-shadow: none;
  display: block; /* Add this */
  margin-bottom: 2rem; /* Add spacing between items */
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

const StyledProjectContainer = styled.div`
  position: relative;
  height: 125px; /* Match your fixed height from GraphQL */
  width: 100%;
  overflow: hidden;
`

const StyledProjectInfo = styled.div`
  opacity: 1;
  transition: all 0.2s ease-out;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(16, 7, 25, 0.7);
  color: white;
  text-align: center;
  padding: 20px 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export default ({ image, link, title, tech }: IProjectItemProps) => {
  const Container = link.includes("http")
    ? StyledExternalLink
    : StyledInternalLink

  return (
    <Container to={link} href={link}>
      <StyledProjectContainer>
        <StyledImg src={image.src} alt={title} />
        <StyledProjectInfo>
          <div>{title}</div>
          <StyledTech>{tech}</StyledTech>
        </StyledProjectInfo>
      </StyledProjectContainer>
    </Container>
  )
}
