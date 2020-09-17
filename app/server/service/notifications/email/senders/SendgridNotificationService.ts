import { MailService } from '@sendgrid/mail'
import { INotificationService } from './INotificationService'

export class SendGridNotificationService implements INotificationService {
    private sendGrid = new MailService()
    constructor() {
        this.sendGrid.setApiKey(Meteor.settings.sendGrid.apiKey)
    }

    async sendEmail(): Promise<boolean> {
        const message = {
            to: 'jbellingham91@gmail.com',
            from: 'hello@jessebellingham.com',
            subject: 'Test',
            text: 'Test',
            html: 'Test',
        }
        console.log(message)
        try {
            const result = await this.sendGrid.send(message)
            result.map((_) => console.log(_))
        } catch (error) {
            console.log(error)
        }
        return true
    }
}
