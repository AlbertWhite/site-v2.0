import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import ProjectItem from "../components/projectItem"

interface ISiteData {
  id: string
  title: string
  tech: string
  url: string
}

export default ({ data }: any) => {
  const sites = data.site.siteMetadata.sites
  const site = sites[0]
  return (
    <Layout>
      {sites.map(({ id, title, tech, url }: ISiteData) => (
        <ProjectItem
          key={id}
          image={data[id].childImageSharp.fixed}
          link={url}
          title={title}
          tech={tech}
        />
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        sites {
          id
          title
          tech
          url
        }
      }
    }
    price: file(relativePath: { eq: "sites/price.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    movie: file(relativePath: { eq: "sites/movie.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    air: file(relativePath: { eq: "sites/air.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    world: file(relativePath: { eq: "sites/world.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    poet: file(relativePath: { eq: "sites/poet.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    life: file(relativePath: { eq: "sites/life.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    syria: file(relativePath: { eq: "sites/syria.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    metronome: file(relativePath: { eq: "sites/metronome.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    practice: file(relativePath: { eq: "sites/practice.png" }) {
      childImageSharp {
        fixed(width: 672, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
