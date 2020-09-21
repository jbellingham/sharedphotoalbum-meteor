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
        //get configuration
        // set email facade based on configuration
        if (Meteor.isProduction) {
            this.email = new ProductionEmail()
        } else {
            this.email = new TestEmail()
        }
    }

    /**
     * Returns the subject for this email.
     * @method get subject
     * @return {string}
     */
    public get subject(): string {
        return this.email.subject
    }

    /**
     * Set the subject for this email.
     * @method set subject
     * @param {string} subject
     */
    public set subject(subject: string) {
        this.email.subject = subject
    }

    /**
     * Add content to this email.
     * @method addContent
     * @param {SendGridContent} content
     * @return {Email}
     */
    public addContent(content: any): EmailService {
        this.email.addContent(content)
        return this
    }

    /**
     * Add content to this email from a simple string. The default type is "text/html".
     * @param {string} value
     * @param {string} type
     * @return {Email}
     */
    public addContentString(value?: string, type = 'text/html'): EmailService {
        this.email.addContentString(value, type)
        return this
    }

    /**
     * Add to address using simple values.
     * @method addTo
     * @param {string} email
     * @param {string} name
     * @return {Email}
     */
    public addTo(email: string, name?: string): EmailService {
        this.email.addTo(email, name)
        return this
    }

    /**
     * Add a substitution in the email template.
     * @method addSubstitution
     * @param {string} key
     * @param {string} value
     * @return {Email}
     */
    public addSubstitution(key: string, value: string): EmailService {
        this.email.addSubstitution(key, value)
        return this
    }

    /**
     * Populate the email using a template.
     * @method populateFromTemplate
     */
    public populateFromTemplate(template: EmailTemplate): EmailService {
        //add content to email from template
        this.email.addContent(template.content)

        //set the subject from the template
        this.email.subject = template.subject
        this.email.templateId = template.templateId
        this.email.dynamicData = template.dynamicData

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
