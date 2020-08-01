import Feeds from './feeds'
import { Random } from 'meteor/random'
import { Subscriptions } from '..'

export default {
    Query: {
      async feeds(_: any, { getSubscriptions }: any, context: any, ___: any) {
          const user = await context.user()
          let feeds;
          if (getSubscriptions) {
            const feedIds = Subscriptions.find({userId: user._id}).map(_ => _.feedId)
            feeds = Feeds.find({_id: {$in: feedIds}}).fetch()
          }
          else {
              feeds = Feeds.find({ownerId: user._id}).fetch()
          }
          return feeds
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