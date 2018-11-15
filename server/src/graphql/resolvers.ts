import { IResolvers } from 'graphql-tools'
import { Product } from '../models/Product'

export const resolvers: IResolvers = {
  Query: {
    product: async (_, { _id }) => {
      const product = await Product.findOne({ _id })

      return product
    },
    products: async _ => {
      const products = await Product.find()

      return products.map(item => (item._id = item._id.toString()))
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      const newProduct = await new Product(args).save()
      newProduct._id = newProduct._id.toString()

      return newProduct
    },
  },
}
