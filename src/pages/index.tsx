import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

export default ({ data }: any) => {
  return (
    <>
      <SEO />
      <p>
        Hi, I am Albert, my Chinese name is Yuebai XU 许月白. I am a full-stack
        developer based in Paris. Now I am working in{" "}
        <a
          href="https://www.linkedin.com/company/the-fork-a-tripadvisor-company/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TheFork (A TripAdvisor Company)
        </a>{" "}
        as a fullstack developer.
      </p>
      <p>
       As a front-end developer with more than 4 years' experience, I am very good at Javascript, React, ApolloGraphQL, as well as code checking and building tools: Webpack, Eslint, Typescript. 
      </p>
       
      <p>
       I am focusing on using the above technologies for front-end problematic solution design: <b>SEO implementation; Web performance improvement; Design System Integration; Code Quality enhancement; GTM / Adobe Tracking. </b>
      </p>

      <p>
       As a full-stack developer, I am able to interact with DB with SQL and Knex.js; build GraphQL Server and Express Server under DDD (Domain Driven Design) principle; launch project with Docker and Docker compose. 
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
          href={data.allFile.edges[0].node.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          French version
        </a>{" "}
        and in{" "}
        <a
          href={data.allFile.edges[1].node.publicURL}
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
    allFile(filter: { extension: { eq: "pdf" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
