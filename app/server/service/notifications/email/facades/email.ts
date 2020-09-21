import { Meteor } from 'meteor/meteor'
import * as sendGrid from 'sendgrid'
import { SendGridResponse } from '../../../../../@types/send-grid'
import { MailService } from '@sendgrid/mail'
import { DynamicData } from '../templates/dynamic-data'

/**
 * The base class for emails.
 * @class Email
 */

class Mail extends sendGrid.mail.Mail {}
class Personalization extends sendGrid.mail.Personalization {}
export class Content extends sendGrid.mail.Content {}
class Email extends sendGrid.mail.Email {}

export abstract class EmailBase {
    //constants
    public static FROM_EMAIL = 'hello@jessebellingham.com'
    public static FROM_NAME = 'Notifications'
    public static TO_EMAIL = 'test@example.com'
    public static TO_NAME = 'Test Test'

    private personalizations: Personalization[] = new Array<Personalization>()

    //the SendGrid API
    protected sendGrid: MailService

    //the SendGrid Mail helper
    protected _mail: Mail

    public templateId: string

    public dynamicData: DynamicData

    /**
     * @constructor
     */
    constructor() {
        //get configuration object
        // this.configuration = ConfigurationFactory.config()

        //store the SendGrid API
        this.sendGrid = new MailService()//SendGridClient()
        this.sendGrid.setApiKey(Meteor.settings.sendGrid.apiKey)

        //set default from email address(es)
        this.setFromString(EmailBase.FROM_EMAIL, EmailBase.FROM_NAME)
    }

    /**
     * Returns the Contents array.
     * @method get contents
     * @return {Content[]}
     */
    public get contents(): Content[] {
        const contents = this.mail.getContents()
        return contents
    }

    /**
     * Returns the from Email object.
     * @return {Email}
     */
    public get from(): Email {
        return this.mail.getFrom()
    }

    /**
     * Set the from email and name.
     * @method set from
     * @param {Email} from
     */
    public set from(from: Email) {
        this.mail.setFrom(from)
    }

    public get to(): Email[] {
        return this.personalization.getTos()
    }

    /**
     * Returns the populated SendGrid.mail.Email helper object.
     * @method get mail
     * @return {Mail}
     */
    public get mail(): Mail {
        //return existing mail object
        if (this._mail !== undefined) {
            return this._mail
        }

        //set mail helper
        this._mail = new Mail()

        return this._mail
    }

    /**
     * Returns the SendGrid Personalization object.
     * @method get personalization
     * @return {Personalization}
     */
    public get personalization(): Personalization {
        //get first personalization by default
        if (!this.personalizations.length) {
            const personalization = new Personalization()
            this.personalizations.push(personalization)
            this.mail.addPersonalization(personalization)
        }
        return this.personalizations[0]
    }

    /**
     * Returns the subject for this email.
     * @method get subject
     * @return {string}
     */
    public get subject(): string {
        return this.mail.getSubject()
    }

    /**
     * Set the subject for this email.
     * @method set subject
     * @param {string} subject
     */
    public set subject(subject: string) {
        this.mail.setSubject(subject)
    }

    /**
     * Return the substitutions.
     * @method get substitution
     * @return {SendGridSubstitution[]}
     */
    public get substitutions(): { [key: string]: string } {
        return this.personalization.getSubstitutions()
    }

    /**
     * Add content to this email.
     * @method addContent
     * @param {Content} content
     * @return {EmailBase}
     */
    public addContent(content: Content): EmailBase {
        //add content to Mail helper
        this.mail.addContent(content)

        return this
    }

    /**
     * Add content to this email from a simple string. The default type is "text/html".
     * @method addContentString
     * @param {string} value
     * @param {string} type
     * @return {EmailBase}
     */
    public addContentString(value: string, type = 'text/html'): EmailBase {
        //build content
        const content: Content = {
            type,
            value,
        }

        //add content to Mail helper
        this.addContent(content)

        return this
    }

    /**
     * Add to address using simple values.
     * @method addTo
     * @param {string} email
     * @param {string} name
     * @return {EmailBase}
     */
    public addTo(email: string, name?: string): EmailBase {
        //create Email
        let to = new sendGrid.mail.Email(email, name)
        if (name !== undefined) {
            to.name = name
        }

        //add to Mail helper
        this.personalization.addTo(to)

        return this
    }

    /**
     * Add a substitution in the email template.
     * @method addSubstitution
     * @param {string} key
     * @param {string} value
     * @return {EmailBase}
     */
    public addSubstitution(key: string, value: string): EmailBase {
        const substition = new sendGrid.mail.Substitution(key, value)
        this.personalization.addSubstitution(substition)

        return this
    }

    /**
     * Post-send hook.
     * @method postSend
     * @abstract
     */
    abstract post()

    /**
     * Pre-send hook.
     * @method preSend
     * @abstract
     */
    abstract pre()

    /**
     * Send the email.
     * @method send
     * @abstract
     */
    abstract send(): Promise<SendGridResponse>

    /**
     * Set from using simple values.
     * @method setFromString
     * @param {string} email
     * @param {string} name
     * @return {EmailBase}
     */
    public setFromString(email: string, name?: string): EmailBase {
        //create Email
        let from = new sendGrid.mail.Email(email, name)
        if (name !== undefined) {
            from.name = name
        }

        //set from property
        this.from = from

        return this
    }
}
