import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./admin.dto";
import { FinallyResetPasswordDto, Logindto, RequestOtpResendDto, SendPasswordResetLinkDto, VerifyOtpDto } from "src/common/common.dto";
export declare class AdminController {
    private readonly adminservice;
    constructor(adminservice: AdminService);
    Registeradmin(dto: CreateAdminDto): Promise<{
        message: string;
    }>;
    Verify_email(dto: VerifyOtpDto): Promise<{
        isValid: boolean;
        accessToken: any;
    }>;
    resendVerificationLink(dto: RequestOtpResendDto): Promise<{
        message: string;
    }>;
    sendPasswordResetLink(dto: SendPasswordResetLinkDto): Promise<{
        message: string;
    }>;
    ResetPassword(dto: FinallyResetPasswordDto): Promise<{
        message: string;
    }>;
    Login(dto: Logindto): Promise<{
        accesstoken: string;
    }>;
}
