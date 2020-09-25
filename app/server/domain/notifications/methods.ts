import Feeds, { FeedModel } from '../../../imports/api/feeds/feeds'
import Subscriptions from '../../../imports/api/subscriptions/subscriptions'
import { EmailTemplateFactory } from '../../service/notifications/email/email-factory'
import { Personalization } from '../../service/notifications/email/facades/email'
import { Substitution } from 'sendgrid/lib/helpers/mail/mail'
import sendGrid from 'sendgrid'
import Notifications from './notifications'
import { EmailTemplate } from '../../service/notifications/email/templates/email-template'
import { User, UserExtensions } from '../users/users'

export const notifications = {
    sendNotification: 'sendNotification',
}

Meteor.methods({
    async sendNotification(postId: string, feedId: string) {
        const template = EmailTemplateFactory.newPost
        const feed = Feeds.findOne(feedId)
        const baseUrl = Meteor.isDevelopment ? 'http://localhost:3000' : 'https://sharedphotoalbum.au.meteorapp.com'

        const subscriptions = Subscriptions.find({ feedId: feedId, isActive: true })
        subscriptions.forEach((_) => {
            const personalization = createPersonalization(_.userId, feed, baseUrl)
            template.email.addPersonalization(personalization)
        })

        try {
            await template.send()
            storeNotification(template)
        } catch (error) {
            console.log(error?.response?.body)
            throw error
        }
    },
})

const createPersonalization = (userId: string, feed: FeedModel, baseUrl: string): Personalization => {
    const user = Meteor.users.findOne(userId) as User
    const email = UserExtensions.getEmail(user)
    const name = UserExtensions.getName(user)
    const personalization = new Personalization()
    const to = new sendGrid.mail.Email(email, name)
    personalization.addTo(to)
    personalization.addSubstitution(new Substitution('firstName', name))
    personalization.addSubstitution(new Substitution('feedName', feed.name))
    personalization.addSubstitution(new Substitution('postLink', `${baseUrl}/${feed._id}`))
    return personalization
}

const storeNotification = (template: EmailTemplate) => {
    const personalizations = template.email.mail.getPersonalizations()
    personalizations.forEach((personalization) => {
        const recipients = personalization.to
        recipients.forEach((recipient) => {
            Notifications.insert({
                createdAt: new Date(),
                templateId: template.templateId,
                recipientEmail: recipient.email,
                notificationType: template.notificationType,
                templateType: template.templateType,
                additionalData: personalization,
            })
        })
    })
}
