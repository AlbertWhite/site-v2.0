import React from "react"
import "./src/styles/global.css"
require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
import Layout from "./src/components/layout"

// General component for all the site.
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
