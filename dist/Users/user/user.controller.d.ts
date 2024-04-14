import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { FinallyResetPasswordDto, Logindto, RequestOtpResendDto, SendPasswordResetLinkDto, VerifyOtpDto } from "src/common/common.dto";
export declare class UserController {
    private readonly userservice;
    adminservice: any;
    constructor(userservice: UserService);
    getProfile(req: any): Promise<any>;
    Registeradmin(dto: CreateUserDto): Promise<{
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
        token: string;
    }>;
}
