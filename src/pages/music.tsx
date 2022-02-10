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
        href={data.allFile.edges[0].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1212719878&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/i-can-hear-the-sea-guitar-finger-style" title="海がきこえる / 听见涛声 / I can hear the sea - Guitar Finger Style" target="_blank" style="color: #cccccc; text-decoration: none;">海がきこえる / 听见涛声 / I can hear the sea - Guitar Finger Style</a></div>'
        }
      />

      <Tab
        name={"Tabs: 恰似你的溫柔 / Just Like Your Tenderness"}
        href={data.allFile.edges[1].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1151288788&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/just-like-your-tenderness-by-tsai-chin-guitar-fingerstyle" title="恰似你的溫柔 / Just Like Your Tenderness (by Tsai Chin) - Guitar FingerStyle" target="_blank" style="color: #cccccc; text-decoration: none;">恰似你的溫柔 / Just Like Your Tenderness (by Tsai Chin) - Guitar FingerStyle</a></div>'
        }
      />

      <Tab
        name={"Tabs: 时光倒流二十年 / Flow Back In Time 20 Years - 陳奕迅"}
        href={data.allFile.edges[2].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1151285212&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/eason-chan-yick-shun-guitar-fingerstyle" title="时光倒流二十年 / Flow Back In Time 20 Years  - 陳奕迅 (Eason Chan Yick-shun) - Guitar Fingerstyle" target="_blank" style="color: #cccccc; text-decoration: none;">时光倒流二十年 / Flow Back In Time 20 Years  - 陳奕迅 (Eason Chan Yick-shun) - Guitar Fingerstyle</a></div>'
        }
      />

      <Tab
        name={"Tabs: Can't Help Falling In Love"}
        href={data.allFile.edges[3].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1030903186&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/cant-help-falling-in-love" title="Can&#x27;t Help Falling In Love - Guitar FingerStyle" target="_blank" style="color: #cccccc; text-decoration: none;">Can&#x27;t Help Falling In Love - Guitar FingerStyle</a></div>'
        }
      />

      <Tab
        name={"Tabs: 宝贝 / Baby (In the night)"}
        href={data.allFile.edges[4].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1031916397&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/baobei" title="宝贝 / Baby (In the night) - Guitar FingerStyle" target="_blank" style="color: #cccccc; text-decoration: none;">宝贝 / Baby (In the night) - Guitar FingerStyle</a></div>'
        }
      />

      <Tab
        name={"Tabs: 似水流年 / The Years Flow Like Water - 喜多郎 Kitarō"}
        href={data.allFile.edges[5].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1034548885&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/final" title="似水流年 / The Years Flow Like Water - 喜多郎 Kitarō - FingerStyle Guitar" target="_blank" style="color: #cccccc; text-decoration: none;">似水流年 / The Years Flow Like Water - 喜多郎 Kitarō - FingerStyle Guitar</a></div>'
        }
      />

      <Tab
        name={"Tabs: 天天想你 / Miss you everyday "}
        href={data.allFile.edges[6].node.publicURL}
        innerHtml={
          '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1035996412&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-864339084" title="指月 Finger moon" target="_blank" style="color: #cccccc; text-decoration: none;">指月 Finger moon</a> · <a href="https://soundcloud.com/user-864339084/miss-you-everyday-guitar" title="天天想你 / Miss you everyday - Guitar FingerStyle" target="_blank" style="color: #cccccc; text-decoration: none;">天天想你 / Miss you everyday - Guitar FingerStyle</a></div>'
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
    allFile(filter: { sourceInstanceName: { eq: "scores" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
