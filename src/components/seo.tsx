import React from "react"
import { Helmet } from "react-helmet"

const SEO = ({ title = "Albert Yuebai XU" }: { title?: string }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="description" content="Albert Yuebai XU website and portfolio" />
    <meta
      name="keywords"
      content="Yuebai, XU, Albert, frontend, developer, resume, portfolio, 许月白"
    />
    <meta name="author" content="Albert Yuebai XU" />
    <meta name="viewport" content="width=device-width, initial-scale = 1.0" />
    <meta property="og:title" content="Albert Yuebai XU" />
    <meta property="og:type" content="portfolio" />
    <meta property="og:url" content="http://www.yuebaixu.com" />
    <meta
      property="og:description"
      content="Albert Yuebai XU website and portfolio"
    />
    <meta
      property="og:site_name"
      content="Albert Yuebai XU, front-end developer"
    />
    <meta name="robots" content="index, follow" />
  </Helmet>
)

export default SEO
