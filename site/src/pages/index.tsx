import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default () => {
  return (
    <Layout>
      <p>
        Hi, I am Albert, my Chinese name is Yuebai XU 许月白. I am a front-end
        developper based in Paris.
      </p>
      <p>
        I have experience with{" "}
        <a
          href="https://github.com/AlbertWhite/react-demos"
          target="_blank"
          rel="noopener noreferrer"
        >
          react/redux
        </a>
        ,{" "}
        <Link to="note/guideline" target="_blank">
          angular1 + gulp
        </Link>
        . Now I am working in{" "}
        <a href="https://www.fnac.com/" target="_blank">
          Fnac
        </a>{" "}
        as a front-end developer with React.
      </p>
      <p>
        I am interested with creating things, like
        <a
          href="https://github.com/AlbertWhite/Recent-update-package"
          target="_blank"
        >
          {" "}
          a npm module
        </a>
        ,{" "}
        <a href="https://github.com/AlbertWhite/Title-reader" target="_blank">
          a chrome extension
        </a>
        , and{" "}
        <Link to="site" rel="noopener noreferrer">
          some data visualizations
        </Link>
        .
      </p>
      <p>
        Every piece of professional experience brings me something, I note them
        down as{" "}
        <Link to="note" rel="noopener noreferrer">
          notes
        </Link>
        .
      </p>
      <p>
        As a master student in Human Computer Interaction (HCI), I am well
        trained in UX design and I have a{" "}
        <Link to="portfolio" rel="noopener noreferrer">
          portfolio
        </Link>
        .
      </p>
      <p>I love Paris and I am on my way.</p>
      <p>
        {/* Here is my{" "}
        <a href={Resume} target="_blank" rel="noopener noreferrer"> 
          cv
        </a>
        , */}
        please feel free to contact me via{" "}
        <a href="mailto:albert.yuebai@gmail.com?Subject=Hi%Albert">
          {" "}
          albert.yuebai@gmail.com
        </a>
      </p>
    </Layout>
  )
}
