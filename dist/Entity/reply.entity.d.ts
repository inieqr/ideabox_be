import { CommentsEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";
export interface IReplies {
    id: number;
    reply: string;
    repliedAt: Date;
    comment_replied: CommentsEntity;
    replied_by: UserEntity;
    likes: number;
}
export declare class RepliesEntity implements IReplies {
    id: number;
    reply: string;
    likes: number;
    repliedAt: Date;
    replied_by: UserEntity;
    comment_replied: CommentsEntity;
}
