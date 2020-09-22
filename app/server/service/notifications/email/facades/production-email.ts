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

        const request = this.mail.toJSON()
        const dynamicData = this.dynamicData

        const formattedRequest: MailDataRequired = {
            from: request.from as string,
            subject: request.subject as string,
            templateId: this.templateId,
            // mailSettings: this.mail.getMailSettings(),
            personalizations: request.personalizations.map<PersonalizationData>(function (
                personalization,
            ): PersonalizationData {
                return {
                    to: personalization.to,
                    dynamic_template_data: dynamicData,
                }
            }),
        }

        return this.sendGrid.send(formattedRequest)
    }
}
