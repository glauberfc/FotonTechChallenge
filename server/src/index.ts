import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import * as mongoose from 'mongoose'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'

// Connect to DB
mongoose
  .connect(
    'mongodb://127.0.0.1:27017/FotonTechChallengeDB',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('🚀  MongoDB connected'))
  .catch(err => console.log(err))

// Define GraphQL server
const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, typeDefs],
  resolvers,
})

const server = new ApolloServer({
  schema,
  context: ({ req }: any) => ({
    token: req.headers.token,
  }),
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
