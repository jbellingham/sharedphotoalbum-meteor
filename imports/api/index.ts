import { Mongo } from "meteor/mongo";
import { MediaModel } from "./models/media";
import { SubscriptionModel } from "./models/subscriptions";

export const Media = new Mongo.Collection<MediaModel>('media');

export const Subscriptions = new Mongo.Collection<SubscriptionModel>('subscriptions')