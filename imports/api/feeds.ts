import { Mongo } from 'meteor/mongo';

export interface FeedModel {
  _id?: string;
  name: string;
  createdAt: Date;
  ownerId: string;
  posts: string[]
}

export const Posts = new Mongo.Collection<FeedModel>('posts');