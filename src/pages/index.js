import React from "react"  
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"  
import ArticlesComponent from "../components/articles"

import "../assets/css/main.css"

const IndexPage = () => (  
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          allStrapiBlog {
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
        }
      `}
      render={data => (
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1>Strapi blog</h1>
            <ArticlesComponent articles={data.allStrapiBlog.edges} />
          </div>
        </div>
      )}
    />
  </Layout>
)

export default IndexPage
