import Feeds from './feeds'
import { Random } from 'meteor/random'
import { Subscriptions } from '..'

export default {
    Query: {
      feeds(_: any, { userId, getSubscriptions }: any, __: any, ___: any) {
          let feeds;
          if (getSubscriptions) {
            const feedIds = Subscriptions.find({userId}).map(_ => _.feedId)
            feeds = Feeds.find({_id: {$in: feedIds}}).fetch()
          }
          else {
              feeds = Feeds.find({ownerId: userId}).fetch()
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