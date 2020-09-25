import { EmailBase } from '../facades/email'
import { EmailService } from '../email-service'

import { SendGridResponse } from '../../../../../../@types/send-grid'
import { NotificationType } from '../../../../entities/notifications'

/**
 * @class EmailTemplate
 */
export abstract class EmailTemplate {
    //the email
    public email: EmailBase

    //the email service
    public emailService: EmailService

    private _templateId: string

    private _templateType: TemplateType

    /**
     * @constructor
     */
    constructor() {
        //create a new instance of the EmailService
        this.emailService = new EmailService()

        //store a reference to the Email
        this.email = this.emailService.email
    }

    public get templateId(): string {
        return this._templateId
    }

    public set templateId(templateId: string) {
        this._templateId = templateId
    }

    public get templateType(): TemplateType {
        return this._templateType
    }

    public set templateType(templateType: TemplateType) {
        this._templateType = templateType
    }

    public get notificationType(): NotificationType {
        return NotificationType.Email
    }

    /**
     * Post-content hook.
     * @method post
     * @abstract
     */
    abstract post()

    /**
     * Pre-content hook.
     * @method pre
     * @abstract
     */
    abstract pre()

    /**
     * Send this email template using the EmailService.
     * @method send
     * @abstract
     */
    public send(): Promise<SendGridResponse> {
        return this.emailService.populateFromTemplate(this).send()
    }
}

export enum TemplateType {
    NewPost,
}
