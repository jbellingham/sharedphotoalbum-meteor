//import the base email class
import { EmailTemplate, TemplateType } from './email-template'

/**
 * Invite email template.
 * @class SendInviteEmailTemplate
 */
export class NewPostEmailTemplate extends EmailTemplate {
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
