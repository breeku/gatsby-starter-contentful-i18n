import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"

const propTypes = {
    data: PropTypes.object.isRequired
}

const Product = ({ node }) => (
    <div>
        <Link
            style={{ color: `inherit`, textDecoration: `none` }}
            to={`/${node.node_locale}/products/${node.contentful_id}/`}
        >
            <div
                style={{
                    display: `flex`,
                    alignItems: `center`,
                    borderBottom: `1px solid lightgray`,
                    paddingBottom: rhythm(1 / 2),
                    marginBottom: rhythm(1 / 2)
                }}
            >
                <div style={{ marginRight: rhythm(1 / 2) }}>
                    {node.image[0].resolutions.src && (
                        <Img
                            style={{ margin: 0 }}
                            resolutions={node.image[0].resolutions}
                        />
                    )}
                </div>
                <div style={{ flex: 1 }}>{node.productName.productName}</div>
            </div>
        </Link>
    </div>
)

const IndexPage = props => {
    const usProductEdges = props.data.us.edges
    return (
        <Layout data={props.data} location={props.location}>
            <div style={{ marginBottom: rhythm(2) }}>
                <h3>en-US</h3>
                {usProductEdges.map(({ node }, i) => (
                    <Product node={node} key={node.id} />
                ))}
            </div>
        </Layout>
    )
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
    query PageEnUsQuery {
        site {
            siteMetadata {
                languages {
                    defaultLangKey
                    langs
                }
            }
        }
        us: allContentfulProduct(filter: { node_locale: { eq: "en-US" } }) {
            edges {
                node {
                    id
                    contentful_id
                    node_locale
                    productName {
                        productName
                    }
                    image {
                        resolutions(width: 75) {
                            ...GatsbyContentfulResolutions
                        }
                    }
                }
            }
        }
    }
`
