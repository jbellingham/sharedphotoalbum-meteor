import { Mongo } from "meteor/mongo";
import { CommentModel } from "./models/comments";
import { MediaModel } from "./models/media";
import { PostModel } from "./posts/posts";
import { SubscriptionModel } from "./models/subscriptions";

export const Comments = new Mongo.Collection<CommentModel>('comments');


export const Media = new Mongo.Collection<MediaModel>('media');

export const Posts = new Mongo.Collection<PostModel>('posts');

export const Subscriptions = new Mongo.Collection<SubscriptionModel>('subscriptions')