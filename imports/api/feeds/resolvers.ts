import Feeds from './feeds'
import { Random } from 'meteor/random'

export default {
    Query: {
      feeds() {
          return Feeds.find({}).fetch()
      }
    },
    Mutation: {
        createFeed(obj, { name, description, ownerId }, context) {
            const id = Feeds.insert({
                name: name,
                description: description,
                ownerId: ownerId,
                createdAt: new Date(),
                posts: [],
                inviteCode: Random.id()
            })

            console.log(id)
            const feed = Feeds.findOne(id)
            console.log(feed)
            return feed
        }
    }
  }