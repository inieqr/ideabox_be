import { LikeAction } from "src/Enum/general.enum";
export declare class ChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export declare class RequestOtpResendDto {
    email: string;
}
export declare class SendPasswordResetLinkDto {
    email: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class FinallyResetPasswordDto {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
}
export declare class Logindto {
    email: string;
    password: string;
}
export declare class CommentDto {
    comment: string;
}
export declare class ReplyDto {
    reply: string;
}
export declare class LikeDto {
    like: LikeAction;
}
