import Comments from "./comments"

export default {
    Query: {
      async comments(_: any, __: any, context: any, ___: any) {
          const user = await context.user()
          return Comments.find({ownerId: user._id}).fetch()
      }
    },
    Comment: {
        // todo: this isn't working...
        postedBy: comment => Meteor.users.findOne({ _id: comment.userId }),
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

            return Comments.findOne(id)
        }
    }
}