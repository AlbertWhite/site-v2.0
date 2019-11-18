import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

const StyledTitle = styled.h2`
  color: #663399;
  color: var(--app-main-color, #663399);
`

const StyledDate = styled.div`
  font-size: 0.8rem;
  color: inherit;
  margin-bottom: 2rem;
`

export default ({ data }: any) => {
  const {
    frontmatter: { title, date },
    html,
  } = data.markdownRemark
  console.warn("alb", { data })
  return (
    <div>
      <StyledTitle>{title}</StyledTitle>
      {date && <StyledDate>{date}</StyledDate>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
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
