import { Meteor } from 'meteor/meteor'
import { SendGridNotificationService } from '../../../../server/service/notifications/SendgridNotificationService'
import { NodemailerNotificationService } from '../../../../server/service/notifications/NodemailerNotificationService'

export const notifications = {
    sendNotification: 'sendNotification'
}

const emailService = Meteor.isDevelopment ?
    new NodemailerNotificationService() :
    new SendGridNotificationService()

Meteor.methods({
    async sendNotification() {
        await emailService.sendEmail()
    }
})