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
        //store the SendGrid API
        this.sendGrid = new MailService()
        this.sendGrid.setApiKey(Meteor.settings.sendGrid.apiKey)

        //set default from email address(es)
        this.setFromString(EmailBase.FROM_EMAIL, EmailBase.FROM_NAME)
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
     * Add to address using simple values.
     * @method addTo
     * @param {string} email
     * @param {string} name
     * @return {EmailBase}
     */
    public addTo(email: string, name?: string): EmailBase {
        //create Email
        const to = new sendGrid.mail.Email(email, name)
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
        const from = new sendGrid.mail.Email(email, name)
        if (name !== undefined) {
            from.name = name
        }

        //set from property
        this.from = from

        return this
    }
}
