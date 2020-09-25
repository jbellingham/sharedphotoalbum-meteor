import Media, { MediaModel } from '../../../server/domain/entities/media'

export default {
    Query: {
        async media(_: any, { postId }: any, __: any, ___: any): Promise<MediaModel[]> {
            return Media.find({ postId }).fetch()
        },
    },
}
