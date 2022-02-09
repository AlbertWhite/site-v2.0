import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import SEO from "../components/seo"
import { Disqus } from "gatsby-plugin-disqus"
import { graphql } from "gatsby"

const Tab = ({ href, name, innerHtml }) => (
  <div style={{ margin: "50px 0" }}>
    <a href={href} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
    <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
  </div>
)

export default ({ data }: any) => {
  return (
    <div>
      <SEO title="FingerMoon - Guitar Arrangement" />
      <div>I arrange, play, record and mix songs with guitar fingerstyle.</div>

      <Tab
        name={"Tabs: 海がきこえる / 听见涛声 / I can hear the sea"}
        href={data.allFile.edges[2].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1212719878&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/i-can-hear-the-sea-guitar-finger-style" title="海がきこえる / 听见涛声 / I can hear the sea - Guitar Finger Style" target="_blank" style="color: #cccccc; text-decoration: none;">海がきこえる / 听见涛声 / I can hear the sea - Guitar Finger Style</a></div>'
        }
      />

      <div style={{ marginTop: "50px" }}>
        <Disqus />
      </div>
    </div>
  )
}

export const query = graphql`
  query scores {
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
