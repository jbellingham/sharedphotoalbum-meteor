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

        //build request
        const request = this.sendGrid.createRequest({
            body: this.mail.toJSON(),
            method: 'POST',
            url: '/v3/mail/send',
        })

        //send request
        return this.sendGrid.request(request).then(() => {
            //post hook
            this.post()
        })
    }
}
