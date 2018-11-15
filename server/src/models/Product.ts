import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
})

// const ProductModel: mongoo = mongoose.model('Product', {
//   name: String,
//   description: String,
//   quantity: Number,
//   price: Float,
//   provider: String,
// })

export const Product = mongoose.model('Product', ProductSchema)
