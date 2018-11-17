import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Product {
    id: String!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    provider: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    jwt: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    product(id: String!): Product!
    products: [Product!]!
    user(id: String!): User!
  }

  type Mutation {
    addProduct(
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      provider: String!
    ): Product!
    deleteProduct(id: String!): Product
    signUp(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`
