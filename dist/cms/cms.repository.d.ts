import { CommentsEntity } from "src/Entity/comment.entity";
import { IdeaEntity } from "src/Entity/idea.entity";
import { RepliesEntity } from "src/Entity/reply.entity";
import { Repository } from "typeorm";
export declare class CmsRepository extends Repository<IdeaEntity> {
}
export declare class CommentRepository extends Repository<CommentsEntity> {
}
export declare class RepliesRepository extends Repository<RepliesEntity> {
}
