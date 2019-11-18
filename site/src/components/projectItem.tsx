import React from "react"
import styled from "styled-components"
import { useStaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"

interface IProjectItemProps {
  image: object
  link: string
  title: string
  tech: string
}

const StyledContainer = styled.a`
  position: relative;
  text-decoration: none;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`

const StyledProjectInfo = styled.div`
  opacity: 1;
  transition: all 0.2s ease-out;
  position: absolute;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 50px 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  ${StyledContainer}:hover & {
    opacity: 0;
  }
`

const StyledTech = styled.div`
  margin-left: 1rem;
`

export default ({ image, link, title, tech }: IProjectItemProps) => {
  return (
    <StyledContainer href={link} target="_blank">
      <Img fixed={image} alt="headshot" />
      <StyledProjectInfo>
        <div>{title}</div>
        <StyledTech>{tech}</StyledTech>
      </StyledProjectInfo>
    </StyledContainer>
  )
}
