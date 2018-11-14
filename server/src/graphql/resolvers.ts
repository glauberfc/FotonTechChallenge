import { IResolvers } from 'graphql-tools'
import { Product } from '../models/Product'

export const resolvers: IResolvers = {
  Query: {
    product: async (_, { _id }) => {
      const product = await Product.findOne(_id)

      return product
    },
  },
  Mutation: {
    addProduct: async (_, { name, description, quantity, price, provider }) => {
      const newProduct = new Product({
        name,
        description,
        quantity,
        price,
        provider,
      })

      const product = await newProduct.save()
      return product
    },
  },
}
