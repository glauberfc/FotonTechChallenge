import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
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

export const Product = mongoose.model('Product', ProductSchema)
