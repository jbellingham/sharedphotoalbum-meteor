import Feeds from './feeds'
import { Random } from 'meteor/random'
import { Subscriptions } from '..'

export default {
    Query: {
      async feeds(_: any, __: any, context: any, ___: any) {
          const user = await context.user()
          return Feeds.find({ownerId: user._id}).fetch()
      },
      async subscriptions(_: any, __: any, context: any, ___: any) {
        const user = await context.user()
        const feedIds = Subscriptions.find({userId: user._id}).map(_ => _.feedId)
        return Feeds.find({_id: {$in: feedIds}}).fetch()
      }
    },
    Mutation: {
        createFeed(_: any, { name, description, ownerId }: any, __: any) {
            const id = Feeds.insert({
                name: name,
                description: description,
                ownerId: ownerId,
                createdAt: new Date(),
                posts: [],
                inviteCode: Random.id()
            })

            const feed = Feeds.findOne(id)
            return feed
        }
    }
  }