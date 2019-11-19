import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import { start } from "repl"

const isBlog = (node: any) => node.frontmatter.category === "blog"

const StyledTitle = styled.h3`
  color: #663399;
  color: var(--app-main-color, #663399);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`

const StyledDate = styled.div`
  font-size: 0.8rem;
  color: black;
  margin-bottom: 1.2rem;
`

const StyledContent = styled.p`
  color: black;
  font-size: 0.8rem;
`

const renderStar = (times: number) => {
  let stars = []
  for (let i = 0; i < times; i++) {
    stars.push("★")
  }
  return stars
}

export default ({ data }: any) => {
  return (
    <div>
      <SEO title="Albert Yuebai XU - blogs" />
      Technology changes rapid, so as the importance of articles. I add "stars"
      to mark the importance in today's context for development.
      {data.allMarkdownRemark.edges.map(({ node }: any) =>
        isBlog(node) ? (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <StyledTitle>{node.frontmatter.title}</StyledTitle>
              <StyledDate>
                {node.frontmatter.date} {renderStar(node.frontmatter.star)}
              </StyledDate>
              {/* <StyledDate></StyledDate> */}
              <StyledContent>{node.excerpt}</StyledContent>
            </Link>
          </div>
        ) : null
      )}
    </div>
  )
}

export const query = graphql`
  query blog {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            star
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
