import assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { notifications } from './methods'
import { callWithPromise } from '../../../utils/method-utilities'
import Feeds, { FeedModel } from '../../../imports/api/feeds/feeds'
import Notifications from './notifications'
import { Accounts } from 'meteor/accounts-base'
import Subscriptions, { SubscriptionModel } from '../../../imports/api/subscriptions/subscriptions'
import { UserExtensions } from '../users/users'
import { TemplateType } from '../../service/notifications/email/templates/email-template'
import { EmailTemplateFactory } from '../../service/notifications/email/email-factory'

describe('notification methods', function () {
    before(() => {
        Feeds.rawCollection().drop()
        Meteor.users.rawCollection().drop()
        Subscriptions.rawCollection().drop()
    })
    after(() => {
        //
        // do nothing
        //
    })

    if (Meteor.isServer) {
        it('New post notification sends and stores in notifications collection', async function (done) {
            const { user, feed } = withUserSubscribedToFeed()
            const notificationIds = await callWithPromise(notifications.sendNotification, TemplateType.NewPost, {
                postId: 'fdsfds',
                feedId: feed._id,
            })
            const notification = Notifications.find({ _id: { $in: notificationIds } }).fetch()[0]
            assert.strictEqual(notificationIds.length === 1, true)
            assert.strictEqual(notification.recipientEmail, UserExtensions.getEmail(user))
            assert.strictEqual(notification.templateType, TemplateType.NewPost)
            done()
        })
        it('Invalid template type results in appropriate error being thrown', async function (done) {
            try {
                await callWithPromise(notifications.sendNotification, -1, { postId: 'fdsfds', feedId: 'dasfs' })
            } catch (error) {
                assert.strictEqual(error.message, EmailTemplateFactory.invalidTemplateTypeError)
            }
            done()
        })
    }
})

const withUserSubscribedToFeed = (): { user: Meteor.User; feed: FeedModel } => {
    const user = withUser()
    const feed = withFeed()
    withSubscription(user._id, feed._id)
    return { user, feed }
}

const withUser = (): Meteor.User => {
    const userId = Accounts.createUser({
        email: 'fake@email.com',
        password: 'password',
        profile: { firstName: 'John', lastName: 'Fakeson', name: `John Fakeson` },
    })
    return Meteor.users.findOne(userId)
}

const withFeed = (): FeedModel => {
    const feedId = Feeds.insert({
        name: 'name',
        description: 'description',
        createdAt: new Date(),
        ownerId: 'dsafs',
        inviteCode: 'adsf',
    })
    return Feeds.findOne(feedId)
}

const withSubscription = (userId: string, feedId: string): SubscriptionModel => {
    const subscriptionId = Subscriptions.insert({
        userId,
        feedId,
        createdAt: new Date(),
        isActive: true,
    })
    return Subscriptions.findOne(subscriptionId)
}
