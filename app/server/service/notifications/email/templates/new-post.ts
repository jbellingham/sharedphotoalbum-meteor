import Feeds from '../../../../../imports/api/feeds/feeds'
import Subscriptions from '../../../../../imports/api/subscriptions/subscriptions'
//import the base email class
import { EmailTemplate, TemplateType } from './email-template'

/**
 * Invite email template.
 * @class SendInviteEmailTemplate
 */
export class NewPostEmailTemplate extends EmailTemplate {
    build(args: unknown): void {
        const { feedId } = args
        const feed = Feeds.findOne(feedId)
        const baseUrl = Meteor.isDevelopment ? 'http://localhost:3000' : 'https://sharedphotoalbum.au.meteorapp.com'

        const subscriptions = Subscriptions.find({ feedId: feedId, isActive: true })
        subscriptions.forEach((_) => {
            const personalization = this.createPersonalization(_.userId, feed, baseUrl)
            this.email.addPersonalization(personalization)
        })
    }
    //the name of the notification recipient
    public name = ''

    //the name of the feed with the new post
    public feedName = ''

    public get templateId(): string {
        return 'd-3bee0e5093d74aeb8b3aab50bfbba276'
    }

    public get templateType(): TemplateType {
        return TemplateType.NewPost
    }

    /**
     * Post-content hook.
     * @method post
     */
    public post() {
        //do nothing
    }

    /**
     * Pre-content hook.
     * @method pre
     */
    public pre() {
        // do nothing
    }
}
