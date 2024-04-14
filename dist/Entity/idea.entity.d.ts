import { IIdea } from "src/cms/cms";
import { UserEntity } from "./user.entity";
import { CommentsEntity } from "./comment.entity";
import { IdeaTags } from "src/Enum/general.enum";
export declare class IdeaEntity implements IIdea {
    id: number;
    idea: string;
    tags: IdeaTags;
    media: string[];
    likes: number;
    createdAt: Date;
    blogger: UserEntity;
    comments_made: CommentsEntity[];
}
