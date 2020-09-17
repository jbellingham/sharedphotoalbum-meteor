import { Meteor } from 'meteor/meteor'
// import { SendGridNotificationService } from '../../../../server/service/notifications/SendgridNotificationService'
import { NodemailerNotificationService } from '../../../../server/service/notifications/email/senders/NodemailerNotificationService'
import { EmailTemplateFactory } from '../../../../server/service/notifications/email/email-factory'
import { SendGridNotificationService } from '../../../../server/service/notifications/email/senders/SendgridNotificationService'

export const notifications = {
    sendNotification: 'sendNotification',
}

// const emailService = Meteor.isDevelopment ? new NodemailerNotificationService() : new SendGridNotificationService()

Meteor.methods({
    async sendNotification() {
        const template = EmailTemplateFactory.newPost
        template.name = 'a name'
        template.feedName = 'a feed name'

        template.email.addTo('jbellingham91@gmail.com', 'dsadsa')

        try {
            await template.send()
        } catch (error) {
            console.log('poop')
            console.log(error)
            throw error
        }
    },
})
