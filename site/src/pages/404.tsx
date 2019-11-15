import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default () => {
  return (
    <Layout>
      <h1>Sorry, page not found.</h1>
      <Link to="/" target="_blank">
        Feel lucky?
      </Link>
    </Layout>
  )
}
