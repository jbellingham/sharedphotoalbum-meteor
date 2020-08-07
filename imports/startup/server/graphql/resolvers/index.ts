import merge from 'lodash/merge'

import DateResolvers from '../../../../api/shared/date/resolvers'
import FeedsResolvers from '../../../../api/feeds/resolvers'
import UsersResolvers from '../../../../api/users/resolvers'
import PostsResolvers from '../../../../api/posts/resolvers'
import MediaResolvers from '../../../../api/media/resolvers'
import SubscriptionsResolvers from '../../../../api/subscriptions/resolvers'
import CommentsResolvers from '../../../../api/comments/resolvers'

const resolvers = merge(
    DateResolvers,
    FeedsResolvers,
    UsersResolvers,
    PostsResolvers,
    MediaResolvers,
    SubscriptionsResolvers,
    CommentsResolvers)
    
export default resolvers