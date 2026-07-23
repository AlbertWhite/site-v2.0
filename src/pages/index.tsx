import React from "react"
import styled, { css } from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const StyledHero = styled.h1`
  font-size: 2.1rem;
  line-height: 1.25;
  font-weight: 800;
  margin: 1.5rem 0 1.2rem;
  color: #111827;
`

const StyledHighlight = styled.span`
  color: #3538cd;
`

const StyledLead = styled.p`
  color: #374151;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledDivider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2.5rem 0 2rem;
`

const StyledSectionLabel = styled.div`
  font-family: monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 1.5rem;
`

const StyledJob = styled.div`
  margin-bottom: 2.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledJobHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;
`

const StyledCompany = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`

const StyledDateTag = styled.span`
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: #e0e7ff;
  color: #4338ca;
  white-space: nowrap;
`

const StyledList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: #374151;
  line-height: 1.7;
`

const StyledListItem = styled.li`
  margin-bottom: 0.5rem;

  &::marker {
    color: #3538cd;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const InlineCode = styled.code`
  background: #f3f4f6;
  color: #4338ca;
  padding: 0.15em 0.45em;
  border-radius: 0.35rem;
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.85em;
`

const StyledProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const projectLinkStyle = css`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  box-shadow: none;

  &:hover {
    box-shadow: none;
  }
`

const StyledProjectLink = styled.a`
  ${projectLinkStyle}
`

const StyledProjectInternalLink = styled(Link)`
  ${projectLinkStyle}
`

const StyledArrow = styled.span`
  color: #3538cd;
  flex-shrink: 0;
`

const StyledProjectTitle = styled.span`
  color: #111827;
  font-weight: 600;
`

const StyledCTARow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.75rem;
`

const StyledCTA = styled.a<{ primary?: boolean }>`
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  box-shadow: none;
  background: ${(props) => (props.primary ? "#111827" : "#f3f4f6")};
  color: ${(props) => (props.primary ? "#ffffff" : "#4b5563")};

  &:hover {
    box-shadow: none;
  }
`

export default ({ data }: any) => {
  const cv = data.allFile.edges[0].node.publicURL

  return (
    <div>
      <SEO title="Albert Yuebai XU - about" />

      <StyledHero>
        Hi, I'm Albert — a{" "}
        <StyledHighlight>full-stack developer</StyledHighlight> based in Paris.
      </StyledHero>
      <StyledLead>
        Hello / Bonjour / 你好, I'm Albert (Yuebai XU / 许月白), most recently
        at{" "}
        <a
          href="https://www.linkedin.com/company/the-fork-a-tripadvisor-company/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TheFork (Tripadvisor)
        </a>
        . I've led cross-functional projects from technical design to delivery,
        with expertise in event driven systems, Node.js, GraphQL, React, Next.js
        and SQL. I have experience with performance optimization for both SQL
        and web, backend migrations, technical SEO, and marketing integrations
        (Braze, Talon.One).
      </StyledLead>
      <StyledLead>
        Beyond coding, I'm experienced in technical design, documenting
        proposals, evaluating trade-offs, driving cross-team discussions,
        aligning stakeholders, and executing project roadmaps.
      </StyledLead>

      <StyledDivider />

      <StyledSectionLabel>Experience</StyledSectionLabel>

      <StyledJob>
        <StyledJobHeader>
          <StyledCompany>TheFork</StyledCompany>
          <StyledDateTag>2020 — now</StyledDateTag>
        </StyledJobHeader>
        <StyledList>
          <StyledListItem>
            Reduced fetch-reviews method latency by 50% (p95), 30% (p90), 25%
            (p75)
          </StyledListItem>
          <StyledListItem>
            Corrected invalid review data across ~24M rows
          </StyledListItem>
          <StyledListItem>
            Participated in the loyalty program migration to Talon.One: 6
            developers, 1 year of roadmap, ~200M rows
          </StyledListItem>
          <StyledListItem>
            Improved B2C website performance: investigated and reduced ~140KB in
            JS bundle and ~130KB in HTML on the homepage
          </StyledListItem>
          <StyledListItem>
            Led the migration of the B2C website to Next.js in the SEO team (4
            fullstack developers, 6 months of roadmap)
          </StyledListItem>
          <StyledListItem>
            Designed and shipped the ExpressJS middleware handling B2C website
            redirection: 50+ decision paths / 1000+ lines of code
          </StyledListItem>
          <StyledListItem>
            Designed and shipped the routing system for the B2C website with
            Next.js
          </StyledListItem>
        </StyledList>
      </StyledJob>

      <StyledJob>
        <StyledJobHeader>
          <StyledCompany>Fnac</StyledCompany>
          <StyledDateTag>2017 — 2019</StyledDateTag>
        </StyledJobHeader>
        <StyledList>
          <StyledListItem>
            Refactored the booking tunnel for fnac.com with React — 1400 lines
            of code removed
          </StyledListItem>
          <StyledListItem>
            Updated React to version 16.8 (with hooks) for fnac.com, refactored
            the codebase to use hooks, and created a general error page with{" "}
            <InlineCode>componentDidCatch</InlineCode>
          </StyledListItem>
        </StyledList>
      </StyledJob>

      <StyledDivider />

      <StyledSectionLabel>Side projects &amp; articles</StyledSectionLabel>
      <StyledProjectList>
        <StyledProjectInternalLink to="/blog">
          <StyledArrow>→</StyledArrow>
          <span>
            <StyledProjectTitle>Personal technical blog</StyledProjectTitle> —
            notes on backend systems, migrations, and the occasional detour
          </span>
        </StyledProjectInternalLink>
        <StyledProjectLink
          href="https://chromewebstore.google.com/detail/page-title-fetcher/ipnimfnclmbojlnoeiiklmadebceackl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledArrow>→</StyledArrow>
          <span>
            <StyledProjectTitle>Page title fetcher</StyledProjectTitle> — a
            Chrome extension
          </span>
        </StyledProjectLink>
        <StyledProjectLink
          href="https://medium.com/swlh/react-design-system-with-typescript-and-storybook-1a99cdba24c6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledArrow>→</StyledArrow>
          <span>
            <StyledProjectTitle>
              React design system with TypeScript and Storybook
            </StyledProjectTitle>{" "}
            — published on The Startup (Medium)
          </span>
        </StyledProjectLink>
      </StyledProjectList>

      <StyledDivider />

      <StyledSectionLabel>Get in touch</StyledSectionLabel>
      <StyledCTARow>
        <StyledCTA
          primary
          href="mailto:albert.yuebai@gmail.com?Subject=Hi%20Albert"
        >
          albert.yuebai@gmail.com
        </StyledCTA>
        <StyledCTA href={cv} target="_blank" rel="noopener noreferrer">
          CV
        </StyledCTA>
      </StyledCTARow>
    </div>
  )
}

export const query = graphql`
  query cv {
    allFile(filter: { sourceInstanceName: { eq: "cv" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
