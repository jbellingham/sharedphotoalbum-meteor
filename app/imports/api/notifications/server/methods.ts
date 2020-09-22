import { Meteor } from 'meteor/meteor'
import { EmailTemplateFactory } from '../../../../server/service/notifications/email/email-factory'
import Subscriptions from '../../subscriptions/subscriptions'
import Feeds, { FeedModel } from '../../feeds/feeds'
import sendGrid from 'sendgrid'
import { Personalization } from '../../../../server/service/notifications/email/facades/email'
import { Substitution } from 'sendgrid/lib/helpers/mail/mail'

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
        } catch (error) {
            console.log(error?.response?.body)
            throw error
        }
    },
})

const getEmail = (user: Meteor.User) => (user.emails ? user.emails[0].address : user.services?.facebook?.email)

const getName = (user: Meteor.User) => user.profile?.name || user.profile?.firstName

const createPersonalization = (userId: string, feed: FeedModel, baseUrl: string): Personalization => {
    const user = Meteor.users.findOne(userId)
    const email = getEmail(user)
    const name = getName(user)
    const personalization = new Personalization()
    const to = new sendGrid.mail.Email(email, name)
    personalization.addTo(to)
    personalization.addSubstitution(new Substitution('firstName', name))
    personalization.addSubstitution(new Substitution('feedName', feed.name))
    personalization.addSubstitution(new Substitution('postLink', `${baseUrl}/${feed._id}`))
    return personalization
}
