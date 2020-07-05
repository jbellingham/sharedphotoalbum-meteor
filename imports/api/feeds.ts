import { Mongo } from 'meteor/mongo';

export interface FeedModel {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  ownerId: string;
  posts: string[]
}

export const Feeds = new Mongo.Collection<FeedModel>('feeds');