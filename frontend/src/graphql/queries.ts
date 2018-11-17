import gql from 'graphql-tag'

export const productsQuery = gql`
  query ProductsQuery {
    products {
      id
      name
      description
    }
  }
`

export const productQuery = gql`
  query ProductQuery($id: String!) {
    product(id: $id) {
      id
      name
      description
      quantity
      price
      provider
    }
  }
`
