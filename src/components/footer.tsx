import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const StyledBottom = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledIcons = styled.div`
  display: flex;
  align-items: center;
`

const StyledA = styled.a`
  display: inline-flex;
  width: 30px;
  height: 30px;
  margin-left: 1rem;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`

const IconImage = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export default function FooterIcons() {
  const data = useStaticQuery(graphql`
    query Icon {
      linkedin: file(relativePath: { eq: "icons/linkedin.png" }) {
        childImageSharp {
          gatsbyImageData(width: 30, height: 30, layout: FIXED)
        }
      }
      github: file(relativePath: { eq: "icons/github.png" }) {
        childImageSharp {
          gatsbyImageData(width: 30, height: 30, layout: FIXED)
        }
      }
      soundcloud: file(relativePath: { eq: "icons/soundcloud.png" }) {
        childImageSharp {
          gatsbyImageData(width: 30, height: 30, layout: FIXED)
        }
      }
      medium: file(relativePath: { eq: "icons/medium.png" }) {
        childImageSharp {
          gatsbyImageData(width: 30, height: 30, layout: FIXED)
        }
      }
    }
  `)

  return (
    <StyledBottom>
      <span>Powered by Gatsby.js. Albert Yuebai XU - 2025</span>
      <StyledIcons>
        <StyledA href="https://linkedin.com/in/albert-yuebai-xu-53a7099a">
          <IconImage image={getImage(data.linkedin)} alt="LinkedIn" />
        </StyledA>
        <StyledA href="https://github.com/AlbertWhite">
          <IconImage image={getImage(data.github)} alt="GitHub" />
        </StyledA>
        <StyledA href="https://medium.com/@albertyuebaixu">
          <IconImage image={getImage(data.medium)} alt="Medium" />
        </StyledA>
        <StyledA href="https://soundcloud.com/user-864339084">
          <IconImage image={getImage(data.soundcloud)} alt="SoundCloud" />
        </StyledA>
      </StyledIcons>
    </StyledBottom>
  )
}
