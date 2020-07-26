import Feeds from './feeds'
import { Random } from 'meteor/random'
import { Subscriptions } from '..'

export default {
    Query: {
      feeds(obj, {userId, getSubscriptions}, context, info) {
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
        createFeed(obj, { name, description, ownerId }, context) {
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