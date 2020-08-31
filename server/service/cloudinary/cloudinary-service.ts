import { v2 as cloudinary } from 'cloudinary/lib/cloudinary'

export class CloudinaryService {
    constructor() {}
    uploadFile(file, publicId): Promise<any> {
        const { cloudName, uploadPreset } = Meteor.settings.public.cloudinary
        const { apiKey, secret } = Meteor.settings.cloudinary
    
        return cloudinary.uploader.upload(`${file}`, {
            folder: publicId,
            transformation: {
                height: 2000,
            },
            upload_preset: uploadPreset,
            api_key: apiKey,
            api_secret: secret,
            cloud_name: cloudName
        })
    }
}
