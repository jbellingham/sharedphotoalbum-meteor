import Feeds from './feeds'
import { Random } from 'meteor/random'
import Posts from '../posts/posts'
import Subscriptions from '../subscriptions/subscriptions'

export default {
    Query: {
      async feeds(_: any, __: any, context: any, ___: any) {
          const user = await context.user()
          return Feeds.find({ownerId: user._id}).fetch()
      },
      async feedById(_: any, { _id }: any, __: any) {
        return Feeds.findOne(_id)
      },
      async subscriptions(_: any, __: any, context: any, ___: any) {
        const user = await context.user()
        const feedIds = Subscriptions.find({userId: user._id}).map(_ => _.feedId)
        return Feeds.find({_id: {$in: feedIds}}).fetch()
      }
    },
    Feed: {
      posts: feed => Posts.find({ feedId: feed._id }).fetch(),
      isOwner: async (feed: any, _: any, { user }: any, __: any) => {
        const u = await user()
        return feed.ownerId === u._id
      },
      isSubscription: async (feed: any, _: any, { user }: any, __: any) => {
        const u = await user()
        // better way to do this??
        return Subscriptions.find({ userId: u._id, feedId: feed._id }).count() > 0
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

            return Feeds.findOne(id)
        }
    }
}