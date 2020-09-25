import * as nodemailer from 'nodemailer'
import { INotificationService } from '../../INotificationService'

export class NodemailerNotificationService implements INotificationService {
    private transporter

    async sendEmail() {
        const testAccount = await nodemailer.createTestAccount()
        this.transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            ignoreTLS: true,
        })
        console.log('sending test email')

        // send mail with defined transport object
        const info = await this.transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'bar@example.com, baz@example.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>', // html body
        })

        console.log('Message sent: %s', info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        return true
    }
}
