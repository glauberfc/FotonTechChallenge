import { IResolvers } from 'graphql-tools'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { Product } from '../models/Product'
import { User } from '../models/User'
import { APP_SECRET, getLoggedUserId } from '../utils'

export const resolvers: IResolvers = {
  Query: {
    product: async (_, { id }) => {
      const product = await Product.findById(id)

      return product
    },
    products: async _ => {
      const products = await Product.find()

      return products
    },
    user: async (_, { id }) => {
      const user = await User.find(id)

      return user
    },
  },
  Mutation: {
    addProduct: async (_, args, context) => {
      const userId = getLoggedUserId(context)

      if (userId) {
        const newProduct = await new Product(args).save()
        return newProduct
      }

      throw new Error('Não autenticado!')
    },
    signUp: async (_, args) => {
      const password = await bcrypt.hash(args.password, 10)
      const user = await new User({ ...args, password }).save()
      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        token,
        user,
      }
    },
    login: async (_, args) => {
      const user: any = await User.findOne({ email: args.email })

      if (!user) {
        throw new Error('O usuário ainda não está cadastrado')
      }

      const valid = await bcrypt.compare(args.password, user.password)

      if (!valid) {
        throw new Error('Senha incorreta')
      }

      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        token,
        user,
      }
    },
  },
}
