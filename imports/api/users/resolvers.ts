
export default {
    Query: {
      async user(_: any, __: any, context: any) {
          return await context.user()
      }
    },
    User: {
        email: (user: any) => user.emails ?
            user.emails[0].address :
            user.services?.facebook?.email
    }
}