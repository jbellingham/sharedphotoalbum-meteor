import merge from 'lodash/merge'

import FeedsResolvers from '../../../../api/feeds/resolvers'
import UsersResolvers from '../../../../api/users/resolvers'
import PostsResolvers from '../../../../api/posts/resolvers'

const resolvers = merge(FeedsResolvers, UsersResolvers, PostsResolvers)
export default resolvers