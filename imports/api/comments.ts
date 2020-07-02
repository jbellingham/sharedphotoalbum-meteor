import { Mongo } from 'meteor/mongo';

export interface CommentModel {
  _id?: string;
  text: string;
  createdAt: Date;
  likes: number;
  postId: string
}

export const Comments = new Mongo.Collection<CommentModel>('comments');