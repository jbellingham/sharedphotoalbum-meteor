import { Meteor } from 'meteor/meteor'
import { CloudinaryService } from "../../../../server/service/cloudinary/cloudinary-service"
import Media from "../media"

const cloudinaryService = new CloudinaryService()

export const methods = {
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
            throw error
        }
    }
})

const uploadFiles = (feedId: string, files: string[]): Array<Promise<any>> => {
    const env = Meteor.isDevelopment ? "development" : "production"
    const publicId = `${env}/feed-${feedId}`
    let uploads = new Array<Promise<any>>()
    files.forEach(file => {
        uploads.push(cloudinaryService.uploadFile(file, publicId))
    })
    return uploads
}