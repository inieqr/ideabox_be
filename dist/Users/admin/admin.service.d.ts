import { AdminRepository } from "./admin.repository";
import { NotificationRepository, OtpRepository } from "src/common/common.repository";
import { CreateAdminDto } from "./admin.dto";
import { Mailer } from "src/Mailer/mailer.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { FinallyResetPasswordDto, Logindto, RequestOtpResendDto, SendPasswordResetLinkDto, VerifyOtpDto } from "src/common/common.dto";
export declare class AdminService {
    private readonly adminrepo;
    private readonly noticicationrepo;
    private readonly otprepo;
    private readonly mailerservice;
    private configservice;
    private jwt;
    constructor(adminrepo: AdminRepository, noticicationrepo: NotificationRepository, otprepo: OtpRepository, mailerservice: Mailer, configservice: ConfigService, jwt: JwtService);
    hashpassword(password: any): Promise<string>;
    comaprePassword(userpassword: any, dbpassword: any): Promise<boolean>;
    generateEmailToken(): string;
    signToken(id: number, email: string, role: string): Promise<{
        accesstoken: string;
    }>;
    createSuperAdmin(dto: CreateAdminDto): Promise<{
        message: string;
    }>;
    SuperAdminverifyEmail(dto: VerifyOtpDto): Promise<{
        isValid: boolean;
        accessToken: any;
    }>;
    AdminResendemailVerificationLink(dto: RequestOtpResendDto): Promise<{
        message: string;
    }>;
    AdminsendPasswordResetLink(dto: SendPasswordResetLinkDto): Promise<{
        message: string;
    }>;
    AdminfinallyResetPassword(dto: FinallyResetPasswordDto): Promise<{
        message: string;
    }>;
    loginAdmin(logindto: Logindto): Promise<{
        accesstoken: string;
    }>;
}
