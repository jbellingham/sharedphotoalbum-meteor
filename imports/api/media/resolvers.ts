import { Media } from "./media"

export default {
    Query: {
      async media(_: any, { postId }: any, context: any, ___: any) {
          return Media.find({ postId }).fetch()
      }
    },
    Mutation: {
        async createMedia(_: any, { publicId, postId }: any, __: any) {
            const id = Media.insert({
                createdAt: new Date(),
                postId,
                publicId
            })

            return Media.findOne(id)
        }
    }
}