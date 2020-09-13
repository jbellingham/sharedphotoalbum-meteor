export default {
    Query: {
        async getUser(_: any, { userId }: any, context: any) {
            return userId ? Meteor.users.findOne({ _id: userId }) : await context.user()
        },
    },
    User: {
        email: (user: any) => (user.emails ? user.emails[0].address : user.services?.facebook?.email),
        name: (user: any) => user.profile?.name || `${user.profile?.firstName} ${user.profile?.lastName}`,
        profilePicture: (user: any) => user.services.facebook?.picture?.data,
    },
}
