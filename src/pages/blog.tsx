import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const isBlog = (node: any) => node.frontmatter.category === "blog"
const ALL = "all"
const PAGE_SIZE = 5

const CATEGORY_COLORS: { [keyword: string]: { bg: string; color: string } } = {
  react: { bg: "#e0e7ff", color: "#4338ca" },
  backend: { bg: "#ffedd5", color: "#c2410c" },
  other: { bg: "#dcfce7", color: "#15803d" },
  "web performance": { bg: "#fce7f3", color: "#be185d" },
  test: { bg: "#f3f4f6", color: "#4b5563" },
  "soft skills": { bg: "#fef9c3", color: "#a16207" },
}
const ALL_COLORS = { bg: "#111827", color: "#ffffff" }
const DEFAULT_COLORS = { bg: "#f3f4f6", color: "#4b5563" }

const getColors = (keyword: string) =>
  keyword === ALL ? ALL_COLORS : CATEGORY_COLORS[keyword] || DEFAULT_COLORS

const shortLabel = (keyword: string) =>
  keyword === "web performance" ? "web perf" : keyword

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

  const keywordsWithCount = keywordsWithoutDuplications.map((k) => ({
    keyword: k,
    count: nodes.filter(({ node }: any) => node.frontmatter.keyword === k)
      .length,
  }))

  const index = keywordsWithCount.findIndex((k) => k.keyword === ALL)
  keywordsWithCount[index].count = nodes?.length
  keywordsWithCount.sort((a, b) => b.count - a.count)
  return keywordsWithCount
}

const StyledHero = styled.h1`
  font-size: 2.5rem;
  line-height: 1.15;
  font-weight: 800;
  margin: 1.5rem 0 1.2rem;
  color: #111827;
`

const StyledHighlight = styled.span`
  color: #3538cd;
`

const StyledFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
`

const StyledFilter = styled.button<{
  isSelected: boolean
  bg: string
  color: string
}>`
  border: none;
  cursor: pointer;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: ${(props) => (props.isSelected ? ALL_COLORS.bg : props.bg)};
  color: ${(props) => (props.isSelected ? ALL_COLORS.color : props.color)};
`

const StyledDivider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 2rem;
`

const StyledPost = styled(Link)`
  display: block;
  box-shadow: none;
  margin-bottom: 2.5rem;
  &:hover {
    box-shadow: none;
  }
`

const StyledPostTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`

const StyledPostExcerpt = styled.p`
  color: #6b7280;
  margin-bottom: 0.8rem;
`

const StyledPostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const StyledTag = styled.span<{ bg: string; color: string }>`
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
`

const StyledPostDate = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  color: #9ca3af;
  text-transform: lowercase;
`

const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0 5rem;
`

const StyledPageButton = styled.button<{ isSelected: boolean }>`
  border: none;
  cursor: pointer;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 600;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  background: ${(props) => (props.isSelected ? ALL_COLORS.bg : "#f3f4f6")};
  color: ${(props) => (props.isSelected ? ALL_COLORS.color : "#4b5563")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`

const StyledScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

export default ({ data }: any) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL)
  const [currentPage, setCurrentPage] = useState(1)
  const nodes = data.allMarkdownRemark.edges.filter(({ node }: any) =>
    isBlog(node)
  )
  const keywordsWithCount = useMemo(() => getKeywordsWithCount(nodes), [])

  const filteredNodes = nodes.filter(({ node }: any) =>
    selectedCategory === ALL
      ? node
      : node.frontmatter.keyword === selectedCategory
  )
  const totalPages = Math.max(1, Math.ceil(filteredNodes.length / PAGE_SIZE))
  const paginatedNodes = filteredNodes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleSelectCategory = (keyword: string) => {
    setSelectedCategory(keyword)
    setCurrentPage(1)
  }

  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" })
    }
  }

  return (
    <div>
      <SEO title="Albert Yuebai XU - blogs" />
      <StyledHero>
        Writing about <StyledHighlight>backend systems</StyledHighlight>{" "}
        today, backed by years of frontend experience.
      </StyledHero>
      <StyledFilterContainer className="filterContainer">
        {keywordsWithCount.map(({ keyword, count }) => {
          const colors = getColors(keyword)
          return (
            <StyledFilter
              key={keyword}
              isSelected={keyword === selectedCategory}
              bg={colors.bg}
              color={colors.color}
              onClick={() => handleSelectCategory(keyword)}
            >
              {shortLabel(keyword)} {count}
            </StyledFilter>
          )
        })}
      </StyledFilterContainer>
      <StyledDivider />
      {paginatedNodes.map(({ node }: any) => {
        const colors = getColors(node.frontmatter.keyword)
        return (
          <StyledPost key={node.id} to={node.fields.slug}>
            <StyledPostTitle>{node.frontmatter.title}</StyledPostTitle>
            <StyledPostExcerpt>{node.excerpt}</StyledPostExcerpt>
            <StyledPostMeta>
              <StyledTag bg={colors.bg} color={colors.color}>
                {node.frontmatter.keyword}
              </StyledTag>
              <StyledPostDate>{node.frontmatter.date}</StyledPostDate>
            </StyledPostMeta>
          </StyledPost>
        )
      })}
      {totalPages > 1 && (
        <StyledPaginationContainer>
          <StyledPageButton
            isSelected={false}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            aria-label="Previous page"
          >
            ‹
          </StyledPageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <StyledPageButton
              key={page}
              isSelected={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </StyledPageButton>
          ))}
          <StyledPageButton
            isSelected={false}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            aria-label="Next page"
          >
            ›
          </StyledPageButton>
        </StyledPaginationContainer>
      )}
      <StyledScrollButton onClick={scrollToNext} aria-label="Scroll down">
        ↓
      </StyledScrollButton>
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
            date(formatString: "DD MMM YYYY")
            category
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
