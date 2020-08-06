export interface MediaModel {
  _id?: string
  publicId: string
  createdAt: Date
  postId: string
}

export const Media = new Mongo.Collection<MediaModel>('media');