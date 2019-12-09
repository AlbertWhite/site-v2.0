import React from "react"
import Button from "./blogs/component/Button"
import Select from "./blogs/component/Select"
import rehypeReact from "rehype-react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import SEO from "./seo"
const StyledTitle = styled.h2`
  color: #663399;
  color: var(--app-main-color, #663399);
`

const StyledDate = styled.div`
  font-size: 0.8rem;
  color: inherit;
  margin-bottom: 2rem;
`

const StyledDevider = styled.span`
  margin: 0 1rem;
`

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { button: Button, select: Select },
}).Compiler

export default ({ data }: any) => {
  const {
    frontmatter: { title, date },
    htmlAst,
  } = data.markdownRemark
  return (
    <div id="anchor">
      <StyledTitle>{title}</StyledTitle>
      {date && <StyledDate>{date}</StyledDate>}
      <div>{renderAst(htmlAst)}</div>

      <div>
        <Link to="/blog">Back to Blogs</Link>
        <StyledDevider>|</StyledDevider>
        <a
          href="/"
          onClick={e => {
            e.preventDefault()
            scrollTo(0, 0)
          }}
        >
          Go to Top
        </a>
      </div>
    </div>
  )
}

export const query = graphql`
  query oneBlog($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
