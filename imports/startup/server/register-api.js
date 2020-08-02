import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'

import FeedsSchema from '../../api/feeds/Feeds.graphql'
import FeedsResolvers from '../../api/feeds/resolvers'

import UsersSchema from '../../api/users/User.graphql'
import UsersResolvers from '../../api/users/resolvers'

// import typeDefs from './schema'
//ssssdsa
// fdsfzsfsasas
const typeDefs = [
    FeedsSchema,
    UsersSchema
]

// import resolvers from './resolvers'

const resolvers = merge(FeedsResolvers, UsersResolvers)

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