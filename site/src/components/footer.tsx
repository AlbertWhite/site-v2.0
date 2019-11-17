import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0 40px 0;
`

const StyledLink = styled(Link)`
  margin-left: 50px;
  box-shadow: none;
`

const StyledBottom = styled.div``

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
      }
    `
  )
  return (
    <>
      <a href="https://www.linkedin.com/in/yuebai-xu-53a7099a/">
        <Img fixed={data.linkedin.childImageSharp.fixed} alt="headshot" />
      </a>
      <StyledBottom>Powered by Gatsby.js. Albert Yuebai XU - 2019</StyledBottom>
    </>
  )
}
