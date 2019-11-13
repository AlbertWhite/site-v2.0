// To implement an API, you export a function with the name of the API from gatsby-node.js.
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // This onCreateNode function will be called by Gatsby whenever a new node is created (or updated)
  if (node.internal.type === `MarkdownRemark`) {

    const { createNodeField } = actions // add new field to node
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({ 
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}