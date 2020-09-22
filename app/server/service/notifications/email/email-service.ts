import { EmailTemplate } from './templates/email-template'
import { Meteor } from 'meteor/meteor'
import { EmailBase } from './facades/email'
import { TestEmail } from './facades/test-email'
import { ProductionEmail } from './facades/production-email'
import { SendGridResponse } from '../../../../@types/send-grid'

/**
 * The exposed email service.
 * @class EmailService
 */
export class EmailService {
    //the email
    public email: EmailBase

    /**
     * @constructor
     */
    constructor() {
        // set email facade based on configuration
        if (Meteor.isProduction) {
            this.email = new ProductionEmail()
        } else {
            this.email = new TestEmail()
        }
    }

    /**
     * Populate the email using a template.
     * @method populateFromTemplate
     */
    public populateFromTemplate(template: EmailTemplate): EmailService {
        this.email.templateId = template.templateId

        return this
    }

    /**
     * Send the email.
     * @method send
     * @abstract
     */
    public send(): Promise<SendGridResponse> {
        return this.email.send()
    }

    /**
     * Set from using simple values.
     * @method setFromString
     * @param {string} email
     * @param {string} name
     * @return {EmailService}
     */
    public setFromString(email: string, name?: string): EmailService {
        this.email.setFromString(email, name)
        return this
    }
}
