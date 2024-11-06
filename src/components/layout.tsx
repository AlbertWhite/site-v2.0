import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Header from "./header"
import Footer from "./footer"

export default ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
