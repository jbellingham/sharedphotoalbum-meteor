import { TestSeeder } from '../../../tests/test-seed'
import { notifications } from './methods'
import assert from 'assert'

if (Meteor.isServer) {
    describe('notifications methods', function () {
        it('', function () {
            console.log('poop')
            TestSeeder.seedDatabase()
            assert.strictEqual(true, false)
            // Meteor.call(notifications.sendNotification)
        })
    })
}
