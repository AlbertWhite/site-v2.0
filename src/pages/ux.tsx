import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import ProjectItem from "../components/projectItem"
import SEO from "../components/seo"

const isUX = (node: any) => node.frontmatter.category === "ux"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTitle = styled.div`
  margin-bottom: 1rem;
`

export default ({ data }: any) => {
  return (
    <StyledContainer>
      <StyledTitle>
        I majored in HCI (Human Computer Interaction) for my master degree. <b>The education laied the ground for my sense of UX design</b>. Here is my
        portfolio at that time. 
      </StyledTitle>
      <SEO title="Albert Yuebai XU - UX portfolio" />
      {data.allMarkdownRemark.edges.map(({ node }: any) => {
        return isUX(node) ? (
          <ProjectItem
            key={node.fields.slug}
            image={data[node.frontmatter.imageId].childImageSharp.fixed}
            link={node.fields.slug}
            title={node.frontmatter.title}
            tech={""}
          />
        ) : null
      })}
    </StyledContainer>
  )
}

export const query = graphql`
  query ux {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            imageId
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    cup: file(relativePath: { eq: "ux/cup.jpg" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    momenthere: file(relativePath: { eq: "ux/momenthere.jpg" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    fortify: file(relativePath: { eq: "ux/fortify.jpg" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    love: file(relativePath: { eq: "ux/love.jpg" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    sleep: file(relativePath: { eq: "ux/sleep.jpg" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    train: file(relativePath: { eq: "ux/train.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
