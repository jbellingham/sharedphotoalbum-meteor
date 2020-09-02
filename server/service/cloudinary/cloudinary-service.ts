import { v2 as cloudinary } from 'cloudinary/lib/cloudinary'

export class CloudinaryService {
    constructor() {}
    uploadFiles(files, publicId): Array<Promise<any>> {
        let uploads = []
        files.forEach(file => {
            uploads.push(this.uploadFile(file, publicId))
        });
        return uploads
    }

    uploadFile(file, feedId): Promise<any> {
        const { cloudName, uploadPreset } = Meteor.settings.public.cloudinary
        const { apiKey, secret } = Meteor.settings.cloudinary
        const env = Meteor.isDevelopment ? "development" : "production"
        const publicId = `${env}/feed-${feedId}`
        const fileType = this.getFileType(file)
    
        return cloudinary.uploader.upload(`${file}`, {
            folder: publicId,
            resource_type: fileType,
            quality: "60",
            transformation: {
                height: 2000,
            },
            upload_preset: uploadPreset,
            api_key: apiKey,
            api_secret: secret,
            cloud_name: cloudName
        })
    }

    getFileType = (file: string) => {
        const mimeType = file.split(';')[0].replace('data:', '')
        return mimeType.split('/')[0]
    }
}
