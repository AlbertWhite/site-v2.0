import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import ProjectItem from "../components/projectItem"
import SEO from "../components/seo"

interface ISiteData {
  id: string
  title: string
  tech: string
  url: string
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default ({ data }: any) => {
  const sites = data.site.siteMetadata.sites
  return (
    <StyledContainer>
      <SEO title="Albert Yuebai XU - websites" />
      {sites.map(({ id, title, tech, url }: ISiteData) => (
        <ProjectItem
          key={id}
          image={data[id].childImageSharp.fixed}
          link={url}
          title={title}
          tech={tech}
        />
      ))}
    </StyledContainer>
  )
}

export const query = graphql`
  query code {
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
