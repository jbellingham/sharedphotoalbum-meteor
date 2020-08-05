import Posts from "./posts"
import Feeds from "../feeds/feeds"
import Comments from "../comments/comments"

export default {
    Query: {
      async posts(_: any, { feedId } : any, __: any, ___: any) {
          return Posts.find({ feedId }).fetch()
      }
    },
    Post: {
        postedBy: post => Meteor.users.findOne({_id: post.userId}),
        comments: post => Comments.find({ postId: post._id }).fetch()
    },
    Mutation: {
        async createPost(_: any, { text, feedId }: any, context: any) {
            const user = await context.user()
            const id = Posts.insert({
                text,
                userId: user._id,
                createdAt: new Date(),
                comments: [],
                media: [],
                feedId
            })
            
            Feeds.update(feedId, {
                $push: { posts: id }
            })

             return Posts.findOne(id)
        },
    }
}