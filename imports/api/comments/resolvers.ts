import { Posts } from ".."
import Comments from "./comments"

export default {
    Query: {
      async comments(_: any, __: any, context: any, ___: any) {
          const user = await context.user()
          return Comments.find({ownerId: user._id}).fetch()
      },
    //   async subscriptions(_: any, __: any, context: any, ___: any) {
    //     const user = await context.user()
    //     const feedIds = Subscriptions.find({userId: user._id}).map(_ => _.feedId)
    //     return Feeds.find({_id: {$in: feedIds}}).fetch()
    //   }
    },
    Mutation: {
        async createComment(_: any, { text, postId }: any, context: any) {
            const user = await context.user()
            const id = Comments.insert({
                text,
                userId: user._id,
                createdAt: new Date(),
                postId,
                likes: 0
            })

            const comment = Comments.findOne(id)
            return comment
        }
    }
}