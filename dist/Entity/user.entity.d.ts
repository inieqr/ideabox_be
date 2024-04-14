import { Gender, Role } from "src/Enum/general.enum";
import { IUser } from "src/Users/user/user";
import { CommentsEntity } from "./comment.entity";
import { RepliesEntity } from "./reply.entity";
import { IdeaEntity } from "./idea.entity";
export declare class UserEntity implements IUser {
    id: number;
    fullname: string;
    email: string;
    password: string;
    profilePicture: string;
    dob: string;
    age: number;
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
    my_blogs: IdeaEntity[];
    my_comment: CommentsEntity[];
    comment_replies: RepliesEntity[];
}
