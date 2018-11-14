import * as ProductLoader from './models/ProductLoader'

export const typeDefs = `
  type Product {
    _id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    provider: String!
  }
`

export const resolvers = {
  products: () => ProductLoader.loadAllProducts(),
}
