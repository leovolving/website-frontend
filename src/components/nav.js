import React from "react"  
import { Link, StaticQuery, graphql } from "gatsby"

const Nav = () => (  
  <div>
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/">Strapi Blog</Link>
            </li>
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <StaticQuery
              query={graphql`
                query {
                  allStrapiTag {
                    edges {
                      node {
                        strapiId
                        name
                      }
                    }
                  }
                }
              `}
              render={data =>
                data.allStrapiTag.edges.map((category, i) => {
                  return (
                    <li key={category.node.strapiId}>
                      <Link to={`/tag/${category.node.strapiId}`}>
                        {category.node.name}
                      </Link>
                    </li>
                  )
                })
              }
            />
          </ul>
        </div>
      </nav>
    </div>
  </div>
)

export default Nav
