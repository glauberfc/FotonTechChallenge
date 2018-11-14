import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    provider: String!
  }

  type Query {
    product(_id: String!): Product
    products: [Product]
  }

  type Mutation {
    addProduct(
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      provider: String!
    ): Product
    deleteProduct(_id: String!): Product
  }
`
