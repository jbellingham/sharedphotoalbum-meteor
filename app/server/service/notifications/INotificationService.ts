export interface INotificationService {
    sendEmail: () => Promise<boolean>
}
