require("dotenv").config({  
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createPages = async ({ graphql, actions, reporter }) => {
    console.log('===========================in createPages===========================================')
    const { createPage } = actions
    const result = await graphql(
      `
        {
          articles: allStrapiBlog {
            edges {
              node {
                strapiId
              }
            }
          }
          categories: allStrapiTag {
            edges {
              node {
                strapiId
              }
            }
          }
        }
      `
    )
  
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
  
    // Create blog articles pages.
    const articles = result.data.articles.edges
    const categories = result.data.categories.edges
    console.log('result', JSON.stringify(result))
    const articleTemplate = require.resolve("./src/templates/articles.js")
    const tagTemplate = require.resolve("./src/templates/category.js")
  
    articles.forEach((article, index) => {
      createPage({
        path: `/blog/${article.node.strapiId}`,
        matchPath: `/blog/${article.node.strapiId}`,
        component: articleTemplate,
        context: {
          id: article.node.strapiId,
        },
      })
    })
  
    categories.forEach((category, index) => {
      createPage({
        path: `/tag/${category.node.strapiId}`,
        matchPath: `/tag/${category.node.strapiId}`,
        component: tagTemplate,
        context: {
          id: category.node.strapiId,
        },
      })
    })
}
