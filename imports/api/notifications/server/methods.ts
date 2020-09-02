import { Meteor } from 'meteor/meteor'
import { SendGridNotificationService } from '../../../../server/service/notifications/SendgridNotificationService'

export const notifications = {
    sendNotification: 'sendNotification'
}

const emailService = new SendGridNotificationService()

Meteor.methods({
    async sendNotification() {
        await emailService.sendEmail()
    }
})