import { Gender, Role } from "src/Enum/general.enum";
import { IAdmin } from "src/Users/admin/admin";
export declare class AdminEntity implements IAdmin {
    id: number;
    fullname: string;
    email: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    role: Role;
    gender: Gender;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isRegistered: boolean;
    isVerified: boolean;
    reset_link_exptime: Date;
    password_reset_link: string;
    loginCount: number;
    isLocked: boolean;
    locked_until: Date;
}
