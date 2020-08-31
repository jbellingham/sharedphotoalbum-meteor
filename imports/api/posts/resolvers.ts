import Posts from "./posts"
import Feeds from "../feeds/feeds"
import Comments from "../comments/comments"
import Media from "../media/media"
import { methods } from "../media/server/methods"

export default {
    Post: {
        poster: (post: { userId: string }) => Meteor.users.findOne({ _id: post.userId }),
        comments: (post: { _id: string }) => Comments.find({ postId: post._id }).fetch(),
        media: (post: { _id: string }) => Media.find({ postId: post._id }).fetch()
    },
    Mutation: {
        async createPost(_: any, { text, feedId, files }: any, context: any) {
            let success = true
            const user = await context.user()
            const id = Posts.insert({
                text,
                userId: user._id,
                createdAt: new Date(),
                comments: [],
                media: [],
                feedId
            })

            try {
                Meteor.call(methods.createMedia, id, feedId, files)
            }
            catch (error) {
                console.log(error)
                Posts.remove({ _id: id })
                success = false
            }
            
            if (success) {
                Feeds.update(feedId, {
                    $push: { posts: id }
                })
            }

             return Posts.findOne(id)
        },
    }
}