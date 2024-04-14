import { NotificationType } from "src/Enum/general.enum";
export declare class Notifications implements INotification {
    id: number;
    date: Date;
    account: string;
    notification_type: NotificationType;
    message: string;
    subject: string;
}
export interface INotification {
    id: number;
    account: string;
    notification_type: NotificationType;
    message: string;
    subject: string;
    date: Date;
}
export interface INotificationResponse {
    notification_type: NotificationType;
    message: string;
    subject: string;
    date: Date;
}
