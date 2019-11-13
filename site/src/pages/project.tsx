import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import ProjectItem from "../components/projectItem"

export default ({ data }: any) => {
  console.log({ data })
  return (
    <Layout>
      <ProjectItem
        image={data["price"].childImageSharp.fixed}
        link={"1"}
        title={"2"}
        tech={"3"}
      />
      {/* <a>
        <Img
          className="headshot"
          fixed={data.file.childImageSharp.fixed}
          alt="headshot"
        />
        <div className="info-div">
          <div className="name">title</div>
          <div className="techno">techno</div>
        </div>
      </a> */}
    </Layout>
  )
}

export const query = graphql`
  query {
    price: file(relativePath: { eq: "sites/price.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    movie: file(relativePath: { eq: "sites/movie.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
