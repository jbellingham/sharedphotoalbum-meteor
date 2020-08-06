import { Mongo } from "meteor/mongo";
import { MediaModel } from "./media/media";
import { SubscriptionModel } from "./models/subscriptions";

export const Subscriptions = new Mongo.Collection<SubscriptionModel>('subscriptions')