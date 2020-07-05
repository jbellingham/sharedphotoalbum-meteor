import { Mongo } from "meteor/mongo";

export interface SubscriptionModel {
    _id?: string;
    feedId: string;
    userId: string;
    createdAt: Date;
    isActive: boolean;
}

export const Subscriptions = new Mongo.Collection<SubscriptionModel>('subscriptions')