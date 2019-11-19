import React from "react"
import Layout from "./src/components/layout"
// Wraps every page in a component

export const wrapPageElement = ({ element, props }) => {
  console.warn("alb", "happy world")
  return <Layout {...props}>{element}</Layout>
}
