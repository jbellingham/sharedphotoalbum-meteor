import { Mongo } from 'meteor/mongo'
import { TemplateType } from '../../service/notifications/email/templates/email-template'

export interface NotificationModel {
    _id?: string
    createdAt: Date
    templateId: string
    recipientEmail: string
    notificationType: NotificationType
    templateType: TemplateType
    additionalData: unknown
}

export enum NotificationType {
    Email,
    Sms,
}

const Notifications = new Mongo.Collection<NotificationModel>('notifications')
export default Notifications
