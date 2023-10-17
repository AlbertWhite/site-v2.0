import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import { start } from "repl"

const isBlog = (node: any) => node.frontmatter.category === "blog"
const ALL = "all"
const renderStar = (times: number) => {
  let stars = []
  for (let i = 0; i < times; i++) {
    stars.push("★")
  }
  return stars
}

const getKeywordsWithCount = (nodes: any) => {
  const keywordsWithDuplications = nodes.map(
    ({ node }: any) => node.frontmatter.keyword
  )
  const keywordsWithoutDuplications = [
    ...keywordsWithDuplications.filter(
      (item: string, index: number) =>
        keywordsWithDuplications.indexOf(item) === index
    ),
    ALL,
  ]

  const keywordsWithCount = keywordsWithoutDuplications.map(k => ({
    keyword: k,
    count: nodes.filter(({ node }: any) => node.frontmatter.keyword === k)
      .length,
  }))

  const index = keywordsWithCount.findIndex(k => k.keyword === ALL)
  keywordsWithCount[index].count = nodes?.length
  keywordsWithCount.sort((a, b) => b.count - a.count)
  return keywordsWithCount
}

const StyledTitle = styled.h3`
  color: #663399;
  color: var(--app-main-color, #663399);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;

  &:first-of-type {
    margin-top: 2rem;
  }
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

const StyledFilter = styled.a<{ isSelected: boolean }>`
  font-size: 0.9rem;
  color: ${props => (props.isSelected ? "#663399" : "rgba(102, 51, 153, 0.5)")};
  box-shadow: none;
  cursor: pointer;
  margin-right: 0.8rem;
  font-weight: 800;
  &:hover {
    color: #663399;
    box-shadow: none;
  }
`

const StyledFilterContainer = styled.div`
  margin-top: 1rem;
  border-top: 0.1px solid rgba(0, 0, 0, 0.2);
  padding-top: 1rem;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: sticky;
  top: 0px;
  background: white;
`

export default ({ data }: any) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL)
  const nodes = data.allMarkdownRemark.edges.filter(({ node }: any) =>
    isBlog(node)
  )
  const keywordsWithCount = useMemo(() => getKeywordsWithCount(nodes), [])

  return (
    <div>
      <SEO title="Albert Yuebai XU - blogs" />
      Technology changes rapidly, so as the importance of articles. I add
      "stars" to mark the importance in today's context of development. <br />
      Selected articles are on{" "}
      <a href={"https://medium.com/@albertyuebaixu"}>Medium</a>.
      <StyledFilterContainer>
        {keywordsWithCount.map(({ keyword, count }) => (
          <StyledFilter
            isSelected={keyword === selectedCategory}
            onClick={() => setSelectedCategory(keyword)}
          >
            {keyword} ({count})
          </StyledFilter>
        ))}
      </StyledFilterContainer>
      {nodes
        .filter(({ node }: any) =>
          selectedCategory === ALL
            ? node
            : node.frontmatter.keyword === selectedCategory
        )
        .map(({ node }: any) => (
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
        ))}
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
            keyword
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
