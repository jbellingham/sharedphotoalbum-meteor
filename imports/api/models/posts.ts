export interface PostModel {
  _id?: string
  text: string
  createdAt: Date
  comments: string[]
  feedId: string
  media: string[]
}