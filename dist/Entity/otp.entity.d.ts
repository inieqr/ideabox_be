import { Role } from "src/Enum/general.enum";
export interface IUserOtp {
    id: number;
    email: string;
    otp: string;
    role: Role;
    expiration_time: Date;
    verified: boolean;
    created_at: Date;
}
export declare class UserOtp implements IUserOtp {
    id: number;
    email: string;
    role: Role;
    verified: boolean;
    expiration_time: Date;
    created_at: Date;
    otp: string;
}
