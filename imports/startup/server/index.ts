import '../server/config/service-config'
import '/imports/api'
import { ApolloServer, gql } from 'apollo-server-express'

// import typeDefs from './schema'
// import resolvers from './resolvers'

const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    context: async ({ req }) => ({
        user: {}//await getUser(req.headers.authorization)
    })
})