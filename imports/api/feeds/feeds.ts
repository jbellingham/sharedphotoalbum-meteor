import { Mongo } from "meteor/mongo";

export interface FeedModel {
  _id?: string
  name: string
  description: string
  createdAt: Date
  ownerId: string
  inviteCode: string
  posts: string[]
}

const Feeds = new Mongo.Collection<FeedModel>('feeds')
export default Feeds