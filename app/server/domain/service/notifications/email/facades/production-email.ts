import { MailDataRequired, PersonalizationData } from '../../../../../@types/send-grid/mail-data'
//import parent Email class
import { EmailBase } from './email'

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
        if (request.personalizations?.length) {
            const formattedRequest = formatRequest(request, this.templateId)
            return this.sendGrid.send(formattedRequest)
        } else {
            console.log('No recipients for email, not sent.')
            console.log('Payload:')
            console.log(request)
        }
    }
}

const formatRequest = (request: any, templateId: string) => {
    const formattedRequest: MailDataRequired = {
        from: request.from as string,
        templateId: templateId,
        // mailSettings: this.mail.getMailSettings(),
        personalizations: request.personalizations.map(function (personalization): PersonalizationData {
            return {
                to: personalization.to,
                dynamic_template_data: personalization.substitutions,
            }
        }),
    }
    return formattedRequest
}
