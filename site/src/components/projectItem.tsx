import React from "react"
import styled from "styled-components"
import { useStaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"

interface IProjectItemProps {
  image: object
  link: string
  title: string
  tech: string
}

export default ({ image, link, title, tech }: IProjectItemProps) => {
  console.log(image)
  return (
    <a href={link}>
      <Img className="headshot" fixed={image} alt="headshot" />
      <div className="info-div">
        <div className="name">{title}</div>
        <div className="techno">{tech}</div>
      </div>
    </a>
  )
}
