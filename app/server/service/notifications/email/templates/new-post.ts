//import the base email class
import { EmailTemplate } from './email-template'

/**
 * Invite email template.
 * @class SendInviteEmailTemplate
 */
export class NewPostEmailTemplate extends EmailTemplate {
    //the name of the notification recipient
    public name = ''

    //the name of the feed with the new post
    public feedName = ''

    /**
     * Returns the email subject.
     * @method get subject
     * @return {string}
     */
    public get subject(): string {
        return `${this.feedName} has a new post waiting for you`
    }

    public get templateId(): string {
        return 'd-3bee0e5093d74aeb8b3aab50bfbba276'
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
