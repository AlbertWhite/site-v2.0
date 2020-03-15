import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const StyledIcons = styled.div``

const StyledBottom = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
`

const StyledA = styled.a`
  box-shadow: none;
  margin-left: 1rem;
  &:hover {
    box-shadow: none;
  }
`

export default () => {
  const data = useStaticQuery(
    graphql`
      query Icon {
        linkedin: file(relativePath: { eq: "icons/linkedin.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        github: file(relativePath: { eq: "icons/github.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        soundcloud: file(relativePath: { eq: "icons/soundcloud.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  return (
    <StyledBottom>
      <span>Powered by Gatsby.js. Albert Yuebai XU - 2019</span>
      <StyledIcons>
        <StyledA href="https://www.linkedin.com/in/yuebai-xu-53a7099a/">
          <Img fixed={data.linkedin.childImageSharp.fixed} alt="headshot" />
        </StyledA>
        <StyledA href="https://github.com/AlbertWhite">
          <Img fixed={data.github.childImageSharp.fixed} alt="headshot" />
        </StyledA>
        <StyledA href="https://soundcloud.com/user-864339084">
          <Img fixed={data.soundcloud.childImageSharp.fixed} alt="headshot" />
        </StyledA>
      </StyledIcons>
    </StyledBottom>
  )
}
