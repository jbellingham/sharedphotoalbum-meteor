import { Mongo } from "meteor/mongo";
import { CommentModel } from "./comments/comments";
import { MediaModel } from "./models/media";
import { SubscriptionModel } from "./models/subscriptions";

export const Comments = new Mongo.Collection<CommentModel>('comments');


export const Media = new Mongo.Collection<MediaModel>('media');

export const Subscriptions = new Mongo.Collection<SubscriptionModel>('subscriptions')