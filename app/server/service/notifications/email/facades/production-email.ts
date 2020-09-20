
import { classes } from '@sendgrid/helpers'
import { MailDataRequired, PersonalizationData } from '../../../../../@types/send-grid/mail-data'
//import parent Email class
import { EmailBase } from './email'

// class Mail extends classes.Mail { }

/**
 * An email when application is in production.
 * @class ProductionEmail
 */
export class ProductionEmail extends EmailBase {
    /**
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * Post-send hook.
     * @method postSend
     */
    public post() {
        //left blank intentionally
    }

    /**
     * Pre-send hook.
     * @method preSend
     */
    public pre() {
        //left blank intentionally
    }

    /**
     * Send the email
     * @method send
     */
    public send(): Promise<any> {
        //pre hook
        this.pre()

        //build request
        // const request = this.sendGrid.createRequest({
        //     body: this.mail.toJSON(),
        //     method: 'POST',
        //     url: '/v3/mail/send',
        // })

        const request = this.mail.toJSON()

        const formattedRequest: MailDataRequired = {
            // to: request.personalizations[0].to.map(_ => _.email),
            from: request.from as string,
            subject: request.subject as string,
            html: request.content[0].value,
            templateId: this.templateId,
            // mailSettings: this.mail.getMailSettings(),
            personalizations: request.personalizations.map<PersonalizationData>(function(personalization): PersonalizationData {
                return {
                    to: personalization.to,
                    dynamic_template_data: {
                        firstName: "poop",
                        feedName: "poop feed"
                    },
                }
            })
        }

        return this.sendGrid.send(formattedRequest).then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
        // return this.sendGrid.request(request).then((response) => {
        //     //post hook
        //     this.post()
        // }, (error) => {
        //     console.log(error)
        // })
    }
}
