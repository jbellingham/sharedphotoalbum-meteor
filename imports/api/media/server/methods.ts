import { Meteor } from 'meteor/meteor'
import { CloudinaryService } from "../../../../server/service/cloudinary/cloudinary-service"
import Media from "../media"

const cloudinaryService = new CloudinaryService()

export const media = {
    createMedia: 'createMedia'
}

Meteor.methods({
    async createMedia(postId: string, feedId: string, files: string[]) {
        if (files.length === 0) return

        let mediaId
        try {
            const uploads = uploadFiles(feedId, files)
            return Promise.all(uploads).then(responses => {
                responses.forEach(async r => {
                    mediaId = Media.insert({
                        createdAt: new Date(),
                        postId,
                        publicId: r.public_id,
                        mimeType: `${r.resource_type}/${r.format}`
                    })
                })
            })
        }
        catch (error) {
            Media.remove({ _id: mediaId })
            console.log(error)
            throw error
        }
    }
})

const uploadFiles = (feedId: string, files: string[]): Array<Promise<any>> => {
    return cloudinaryService.uploadFiles(files, feedId)
}