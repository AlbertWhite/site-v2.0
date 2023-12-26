import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

export default ({ data }: any) => {
  return (
    <>
      <SEO />
      <p>
        Hello / Bonjour / 你好, I am Albert, my Chinese name is Yuebai XU
        许月白. I am a full-stack developer with more than 6 years experience.
        My last job is in{" "}
        <a
          href="https://www.linkedin.com/company/the-fork-a-tripadvisor-company/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TheFork (A TripAdvisor Company)
        </a>{" "}
        as a fullstack developer. I am located in Paris.
      </p>
      <p>
        Having worked as front-end lead developer in a small team with 4
        fullstack developers and as a backend developer in a backend-driven
        team, I have led several cross-domain projects from planning the
        technical solution to ship the project in time. I am good at discovering
        and initializing technical solutions with different possibilities and
        choose the most coherent one based on the contextual constraints.
      </p>
      <p>
        Apart from building web interface and API, I have experience with
        typescript migration, nextjs migration, web performance investigations
        and improvement, GA tracking, braze and braze API implementation,
        talon.one, and technical SEO.
      </p>
      <p>
        As a developer, I am able to plan and work on complicated frontend
        subjects independently. I am good at Typescript, React, Nextjs,
        ApolloGraphQL, Cypress, Jest, React-testing-library. As for the backend
        side, I am familiar with ApolloGraphQL, Rest API, Joi, Cucumber Test,
        Express server and middleware, Sql, Knex under DDD (Domain Driven
        Design) principle.
      </p>
      <p>
        Outside of work, I am interested in creating things with code, like
        <a
          href="https://github.com/AlbertWhite/Recent-update-package"
          target="_blank"
        >
          {" "}
          a npm module
        </a>
        ,{" "}
        <a
          href="https://chrome.google.com/webstore/detail/page-title-fetcher/ipnimfnclmbojlnoeiiklmadebceackl"
          target="_blank"
        >
          a chrome extension
        </a>
        , and{" "}
        <Link to="/code" rel="noopener noreferrer">
          some data visualizations
        </Link>
        .
      </p>
      <p>
        Every piece of professional experience brings me something, I note them
        down as{" "}
        <Link to="/blog" rel="noopener noreferrer">
          blogs
        </Link>
        . Selected articles are on{" "}
        <a href={"https://medium.com/@albertyuebaixu"}>my Medium blog</a>.
      </p>
      <p>
        As a master student in Human Computer Interaction (HCI), I am well
        trained in UX design and I have a{" "}
        <Link to="/ux" rel="noopener noreferrer">
          portfolio
        </Link>
        .
      </p>
      <p>
        Here are my cv in{" "}
        <a
          href={data.allFile.edges[1].node.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          French version
        </a>{" "}
        and in{" "}
        <a
          href={data.allFile.edges[0].node.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          English version
        </a>{" "}
        , feel free to contact me via{" "}
        <a href="mailto:albert.yuebai@gmail.com?Subject=Hi%Albert">
          {" "}
          albert.yuebai@gmail.com
        </a>
      </p>
    </>
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
