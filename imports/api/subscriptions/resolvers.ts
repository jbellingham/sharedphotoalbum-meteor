import Subscriptions from "./subscriptions"

export default {
    Query: {
      async subscription(_: any, { feedId, userId }: any, __: any, ___: any) {
          return Subscriptions.findOne({userId, feedId})
      },
      async pendingSubscriptionsByFeedId(_: any, { feedId }: any, __: any, ___: any) {
        return Subscriptions.find({feedId: feedId, isActive: false}).fetch()
      }
    },
    Subscription: {
        user: subscription => Meteor.users.findOne({_id: subscription.userId })
    },
    Mutation: {
        async createSubscription(_: any, { feedId, userId }: any, __: any) {
            const id = Subscriptions.insert({
                feedId,
                userId,
                createdAt: new Date(),
                isActive: false
            })

            return Subscriptions.findOne(id)
        },
        async updateSubscription(_: any, { subscriptionId, newValue }: any, __: any) {
            Subscriptions.update(subscriptionId, {
                $set: { isActive: newValue }
            })

            return Subscriptions.findOne(subscriptionId)
        }
    }
}