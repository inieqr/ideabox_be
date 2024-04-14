import { MailerService } from "@nestjs-modules/mailer";
export declare class Mailer {
    private readonly mailerservice;
    constructor(mailerservice: MailerService);
    SendVerificationeMail(email: string, name: string): Promise<void>;
    SendPasswordResetLinkMail(email: string, resetlink: string, name: string): Promise<void>;
}
