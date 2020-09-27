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
import * as faker from 'faker'

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
            // arrange
            const { users, feed } = withUsersSubscribedToFeed(1)

            // act
            const notificationIds = await callWithPromise(notifications.sendNotification, TemplateType.NewPost, {
                postId: 'fdsfds',
                feedId: feed._id,
            })
            const notification = Notifications.find({ _id: { $in: notificationIds } }).fetch()[0]

            // assert
            assert.strictEqual(notificationIds.length, users.length)
            assert.strictEqual(notification.recipientEmail, UserExtensions.getEmail(users[0]))
            assert.strictEqual(notification.templateType, TemplateType.NewPost)
            done()
        })
        it('New post notification on feed with multiple subscriptions sends and stores notifications for all subscriptions', async function (done) {
            // arrange
            const { users, feed } = withUsersSubscribedToFeed(5)

            // act
            const notificationIds = await callWithPromise(notifications.sendNotification, TemplateType.NewPost, {
                postId: 'fdsfds',
                feedId: feed._id,
            })
            const storedNotifications = Notifications.find({ _id: { $in: notificationIds } }).fetch()
            const recipientAddresses = users.map((user) => UserExtensions.getEmail(user))

            // assert
            assert.strictEqual(notificationIds.length, users.length)
            assert.strictEqual(
                storedNotifications.every((n) =>
                    recipientAddresses.some((recipient) => n.recipientEmail === recipient),
                ),
                true,
            )
            assert.strictEqual(
                storedNotifications.every((n) => n.templateType === TemplateType.NewPost),
                true,
            )
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

const withUsersSubscribedToFeed = (numberOfUsers: number): { users: Meteor.User[]; feed: FeedModel } => {
    const feed = withFeed()
    const users = new Array<Meteor.User>()
    for (let i = 0; i < numberOfUsers; i++) {
        const user = withUser()
        withSubscription(user._id, feed._id)
        users.push(user)
    }
    return { users, feed }
}

const withUser = (): Meteor.User => {
    const { firstName, lastName, name } = fakeName()
    const userId = Accounts.createUser({
        email: faker.internet.email(),
        password: 'password',
        profile: { firstName, lastName, name },
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

const fakeName = (): { firstName: string; lastName: string; name: string } => {
    const name = faker.name.findName()
    const names = name.split(' ')
    const firstName = names[0]
    const lastName = names[1]
    return { firstName, lastName, name }
}
