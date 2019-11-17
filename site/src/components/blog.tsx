import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const StyledTitle = styled.h2`
  color: #663399;
  color: var(--app-main-color, #663399);
`

const StyledDate = styled.div`
  font-size: 0.8rem;
  color: black;
  margin-bottom: 2rem;
`

export default ({ data }: any) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <StyledTitle>{post.frontmatter.title}</StyledTitle>
        <StyledDate>{post.frontmatter.date}</StyledDate>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query oneBlog($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
