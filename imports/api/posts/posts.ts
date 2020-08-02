import { Mongo } from "meteor/mongo"

export interface PostModel {
  _id?: string
  text: string
  createdAt: Date
  comments: string[]
  feedId: string
  userId: string
  media: string[]
}

const Posts = new Mongo.Collection<PostModel>('posts')
export default Posts