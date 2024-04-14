import { Gender } from "src/Enum/general.enum";
export declare class CreateUserDto {
    fullname: string;
    email: string;
    password: string;
    dob: string;
    gender: Gender;
}
export declare class UpdateUserInfoDto {
    fullname: string;
    email: string;
    profilePicture: string;
    gender: Gender;
}
