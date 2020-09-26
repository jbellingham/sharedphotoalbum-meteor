//import email service
import { EmailService } from './email-service'
import { EmailTemplate, TemplateType } from './templates/email-template'

//import templates
import { NewPostEmailTemplate } from './templates/new-post'

/**
 * The email factory.
 * @class EmailFactory
 */
export class EmailTemplateFactory {
    public static invalidTemplateTypeError = 'InvalidTemplateTypeError'
    /**
     * Returns a new EmailService instance.
     * @method get emailService
     * @return {EmailService}
     */
    public static get emailService(): EmailService {
        return new EmailService()
    }

    /**
     * Send an invite email.
     * @method get sendInviteEmailTemplate
     * @return {EmailService}
     */
    public static get newPost(): NewPostEmailTemplate {
        return new NewPostEmailTemplate()
    }

    public static getTemplate(type: TemplateType): EmailTemplate {
        switch (type) {
            case TemplateType.NewPost:
                return new NewPostEmailTemplate()
            default:
                throw new Error(EmailTemplateFactory.invalidTemplateTypeError)
        }
    }
}
