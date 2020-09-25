export class User implements Meteor.User {
    _id: string
    username?: string
    emails?: Meteor.UserEmail[]
    createdAt?: Date
    profile?: any
    services?: any
}

export class UserExtensions {
    static getEmail(user: Meteor.User): string {
        return user.emails ? user.emails[0].address : user.services?.facebook?.email
    }

    static getName(user: Meteor.User): string {
        return user.profile?.name || user.profile?.firstName
    }
}
