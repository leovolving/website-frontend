import React from "react"  
import { graphql } from "gatsby"

import ArticlesComponent from "../components/articles"  
import Layout from "../components/layout"

export const query = graphql`  
  query Category($id: Int!) {
    articles: allStrapiBlog(filter: { tags: { elemMatch: { id: { eq: $id } } } }) {
      edges {
        node {
          strapiId
          title
          tags {
            name
          }
          banner {
            publicURL
          }
        }
      }
    }
    category: strapiTag(strapiId: { eq: $id }) {
      name
    }
  }
`

const Category = ({ data }) => {  
  const articles = data.articles.edges
  const category = data.category.name

  return (
    <Layout>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category}</h1>
          <ArticlesComponent articles={articles} />
        </div>
      </div>
    </Layout>
  )
}

export default Category
