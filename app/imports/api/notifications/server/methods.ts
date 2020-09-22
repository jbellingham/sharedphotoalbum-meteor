import { Meteor } from 'meteor/meteor'
import { EmailTemplateFactory } from '../../../../server/service/notifications/email/email-factory'
import { NewPostData } from '../../../../server/service/notifications/email/templates/new-post-data'
import Subscriptions from '../../subscriptions/subscriptions'
import Feeds from '../../feeds/feeds'

export const notifications = {
    sendNotification: 'sendNotification',
}

Meteor.methods({
    async sendNotification(postId: string, feedId: string) {
        const template = EmailTemplateFactory.newPost
        const feed = Feeds.findOne(feedId)
        const baseUrl = Meteor.isDevelopment ? 'http://localhost:3000' : 'https://sharedphotoalbum.au.meteorapp.com'

        const subscriptions = Subscriptions.find({ feedId: feedId, isActive: true })
        subscriptions.forEach(async (_) => {
            const user = Meteor.users.findOne(_.userId)
            const email = getEmail(user)
            const name = getName(user)
            template.email.addTo(email, name)
            template.dynamicData = new NewPostData(name, feed.name, `${baseUrl}/${feedId}`)

            try {
                await template.send()
            } catch (error) {
                console.log(error?.response?.body)
                throw error
            }
        })
    },
})

const getEmail = (user: Meteor.User) => (user.emails ? user.emails[0].address : user.services?.facebook?.email)

const getName = (user: Meteor.User) => user.profile?.name || user.profile?.firstName
