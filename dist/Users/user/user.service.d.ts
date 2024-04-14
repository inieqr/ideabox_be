import { NotificationRepository, OtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FinallyResetPasswordDto, Logindto, RequestOtpResendDto, SendPasswordResetLinkDto, VerifyOtpDto } from 'src/common/common.dto';
import { UserRepository } from './user.reposiroty';
import { CreateUserDto } from './user.dto';
import { IUser } from './user';
export declare class UserService {
    private readonly userRepo;
    private readonly noticicationrepo;
    private readonly otprepo;
    private readonly mailerservice;
    private configservice;
    private jwt;
    constructor(userRepo: UserRepository, noticicationrepo: NotificationRepository, otprepo: OtpRepository, mailerservice: Mailer, configservice: ConfigService, jwt: JwtService);
    hashpassword(password: any): Promise<string>;
    comaprePassword(userpassword: any, dbpassword: any): Promise<boolean>;
    generateEmailToken(): string;
    signToken(id: number, email: string, role: string): Promise<{
        token: string;
    }>;
    getProfile(userId: number): Promise<IUser>;
    createUser(dto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyOtpDto): Promise<{
        isValid: boolean;
        accessToken: any;
    }>;
    ResendExpiredOtp(dto: RequestOtpResendDto): Promise<{
        message: string;
    }>;
    sendPasswordResetLink(dto: SendPasswordResetLinkDto): Promise<{
        message: string;
    }>;
    finallyResetPassword(dto: FinallyResetPasswordDto): Promise<{
        message: string;
    }>;
    login(logindto: Logindto): Promise<{
        token: string;
    }>;
}
