import gql from 'graphql-tag'

export const productsQuery = gql`
  query ProductsQuery {
    products {
      name
      description
    }
  }
`

export const productQuery = gql`
  query ProductQuery($name: String!) {
    product(name: $name) {
      name
      description
      quantity
      price
      provider
    }
  }
`
