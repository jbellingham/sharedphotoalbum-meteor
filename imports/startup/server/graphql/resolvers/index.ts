import merge from 'lodash/merge'

import FeedsResolvers from '../../../../api/feeds/resolvers'
import UsersResolvers from '../../../../api/users/resolvers'

const resolvers = merge(FeedsResolvers, UsersResolvers)
export default resolvers