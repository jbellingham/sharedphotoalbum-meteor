import Comments from "./comments"

export default {
    Query: {
        comments(_: any, { postId }: any, __: any) {
            return Comments.find({ postId }).fetch()
        }
    },
    Comment: {
        commenter: comment => Meteor.users.findOne({ _id: comment.userId }),
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