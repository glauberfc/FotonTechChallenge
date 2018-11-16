import { IResolvers } from 'graphql-tools'
import { Product } from '../models/Product'

export const resolvers: IResolvers = {
  Query: {
    product: async (_, { name }) => {
      const product = await Product.findOne({ name })

      return product
    },
    products: async _ => {
      const products = await Product.find()

      return products
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      const newProduct = await new Product(args).save()

      return newProduct
    },
  },
}
