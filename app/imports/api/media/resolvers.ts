import Media from './media'

export default {
    Query: {
        async media(_: any, { postId }: any, context: any, ___: any) {
            return Media.find({ postId }).fetch()
        },
    },
}
