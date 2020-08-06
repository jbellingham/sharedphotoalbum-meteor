import Subscriptions from "./subscriptions"

export default {
    Query: {
      async subscription(_: any, { feedId, userId }: any, context: any, ___: any) {
          return Subscriptions.findOne({userId, feedId})
      }
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
        }
    }
}