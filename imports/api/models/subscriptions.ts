export interface SubscriptionModel {
    _id?: string;
    feedId: string;
    userId: string;
    createdAt: Date;
    isActive: boolean;
}