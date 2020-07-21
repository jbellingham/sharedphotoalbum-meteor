export interface FeedModel {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  ownerId: string;
  posts: string[]
}