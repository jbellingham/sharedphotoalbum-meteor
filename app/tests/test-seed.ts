import Feeds from '../imports/api/feeds/feeds'

import faker from 'faker'

export const seedDatabase = () => {
    console.log('poop')
    Factory.define('feed', Feeds, {
        name: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        ownerId: '',
        inviteCode: '',
        posts: [],
    })
    // Feeds.insert({
    //     name: 'Test Feed',
    //     description: 'Some feed',
    //     createdAt: new Date(),
    //     ownerId:
    // })
}
