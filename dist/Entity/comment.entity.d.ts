import { UserEntity } from "./user.entity";
import { RepliesEntity } from "./reply.entity";
import { IdeaEntity } from "./idea.entity";
export interface IComment {
    id: number;
    comment: string;
    madeAT: Date;
    likes: number;
    made_by: UserEntity;
    idea: IdeaEntity;
    replies: RepliesEntity[];
}
export declare class CommentsEntity implements IComment {
    id: number;
    comment: string;
    likes: number;
    madeAT: Date;
    made_by: UserEntity;
    idea: IdeaEntity;
    replies: RepliesEntity[];
}
