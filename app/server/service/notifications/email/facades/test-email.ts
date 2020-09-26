//import sendgrid
import sendGrid, * as SendGrid from 'sendgrid'
import { Meteor } from 'meteor/meteor'
import { ProductionEmail } from './production-email'
import { EmailBase } from './email'
import { SendGridResponse } from '../../../../../@types/send-grid'

/**
 * An email when testing the application.
 * @class TestEmail
 */
export class TestEmail extends ProductionEmail {
    /**
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * Pre-send hook.
     * @method pre
     */
    public pre() {
        super.pre()

        //get MailSettings
        let mailSettings
        if (this.mail.getMailSettings() === undefined) {
            mailSettings = new SendGrid.mail.MailSettings()
        } else {
            mailSettings = this.mail.getMailSettings()
        }

        //set SandBoxMode
        let sandBoxMode
        if (mailSettings.getSandBoxMode() === undefined) {
            sandBoxMode = new SendGrid.mail.SandBoxMode(Meteor.isDevelopment)
            mailSettings.setSandBoxMode(sandBoxMode)
        } else {
            sandBoxMode = mailSettings.getSandBoxMode()
            sandBoxMode.setEnabled(Meteor.isDevelopment)
        }
        this.mail.addMailSettings(mailSettings)
    }

    /**
     * Send the email
     * @method send
     */
    public send(): Promise<SendGridResponse> {
        //delete mail if it already exists
        return Promise.resolve({ statusCode: 200, body: {}, headers: {} })
    }
}
