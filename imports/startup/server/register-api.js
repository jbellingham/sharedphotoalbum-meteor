import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import FeedsSchema from '../../api/feeds/Feeds.graphql'
import FeedsResolvers from '../../api/feeds/resolvers'
import merge from 'lodash/merge'

// import typeDefs from './schema'
const testSchema = `
type Query {
  hi: String
  feeds: [Feed]
}
`;
// 

const typeDefs = [
    testSchema,
    FeedsSchema
]

// import resolvers from './resolvers'
const testResolvers = {
  Query: {
    hi() {
      return "Hello World.";
    }
  }
}

const resolvers = merge(testResolvers, FeedsResolvers)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      user: async () => await getUser(req.headers.authorization)
    })
  })
  
server.applyMiddleware({
    app: WebApp.connectHandlers,
    path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
    if (req.method === 'GET') {
        res.end()
    }
})