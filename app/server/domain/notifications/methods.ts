import { EmailTemplateFactory } from '../../service/notifications/email/email-factory'
import Notifications from './notifications'
import { EmailTemplate, TemplateType } from '../../service/notifications/email/templates/email-template'
import { Meteor } from 'meteor/meteor'

export const notifications = {
    sendNotification: 'sendNotification',
}

Meteor.methods({
    async sendNotification(templateType: TemplateType, args: unknown) {
        const template = EmailTemplateFactory.getTemplate(templateType)
        template.build(args)

        try {
            await template.send()
            return storeNotification(template)
        } catch (error) {
            console.log(error?.response?.body)
            throw error
        }
    },
})

const storeNotification = (template: EmailTemplate): Array<string> => {
    const ids = new Array<string>()
    const personalizations = template.email.mail.getPersonalizations()
    personalizations.forEach((personalization) => {
        const recipients = personalization.to
        recipients.forEach((recipient: { email: any }) => {
            const id = Notifications.insert({
                createdAt: new Date(),
                templateId: template.templateId,
                recipientEmail: recipient.email,
                notificationType: template.notificationType,
                templateType: template.templateType,
                additionalData: personalization,
            })
            ids.push(id)
        })
    })
    return ids
}
