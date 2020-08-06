import { Mongo } from "meteor/mongo"

export interface SubscriptionModel {
    _id?: string;
    feedId: string;
    userId: string;
    createdAt: Date;
    isActive: boolean;
}

const Subscriptions = new Mongo.Collection<SubscriptionModel>('subscriptions')
export default Subscriptions