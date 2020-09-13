import Feeds from './feeds'
import { Random } from 'meteor/random'
import Posts from '../posts/posts'
import Subscriptions from '../subscriptions/subscriptions'

export default {
    Query: {
        async feeds(_: any, __: any, context: any, ___: any) {
            const user = await context.user()
            const feedIds = Subscriptions.find({ userId: user._id }).map((_) => _.feedId)
            return Feeds.find({ $or: [{ ownerId: user._id }, { _id: { $in: feedIds } }] }).fetch()
        },
        async feedById(_: any, { _id }: any, __: any) {
            return Feeds.findOne(_id)
        },
        async feedByInviteCode(_: any, { inviteCode }: any, __: any) {
            return Feeds.findOne({ inviteCode })
        },
    },
    Feed: {
        posts: (feed) => Posts.find({ feedId: feed._id }, { sort: { createdAt: -1 } }).fetch(),
        isOwner: async (feed: any, _: any, { user }: any, __: any) => {
            const u = await user()
            return feed.ownerId === u._id
        },
        isActiveSubscription: async (feed: any, _: any, { user }: any, __: any) => {
            const u = await user()
            // better way to do this??
            return Subscriptions.find({ userId: u._id, feedId: feed._id, isActive: true }).count() > 0
        },
        isPendingSubscription: async (feed: any, _: any, { user }: any, __: any) => {
            const u = await user()
            // better way to do this??
            return Subscriptions.find({ userId: u._id, feedId: feed._id, isActive: false }).count() > 0
        },
    },
    Mutation: {
        async createFeed(_: any, { name, description }: any, context: any) {
            const user = await context.user()
            const id = Feeds.insert({
                name: name,
                description: description,
                ownerId: user._id,
                createdAt: new Date(),
                posts: [],
                inviteCode: Random.id(),
            })

            return Feeds.findOne(id)
        },
    },
}
