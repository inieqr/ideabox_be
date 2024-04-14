/// <reference types="multer" />
import { CmsService } from "./cms.service";
import { MakeblogPostDto } from "./cms.dto";
import { IIdeaPostViewWithComment, IIdeaView } from "./cms";
import { CommentDto, LikeDto, ReplyDto } from "src/common/common.dto";
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    createIdea(id: number, dto: MakeblogPostDto, mediafiles: Express.Multer.File[]): Promise<IIdeaView>;
    editIdea(postid: number, userid: number, dto: MakeblogPostDto, mediafiles: Express.Multer.File[]): Promise<IIdeaView>;
    DeleteIdea(ideaid: number, userid: number, req: any): Promise<{
        msg: string;
    }>;
    getBlogPosts(page: number, limit: number): Promise<{
        data: IIdeaPostViewWithComment[];
        total: number;
        page: number;
        limit: number;
    }>;
    getoneIdea(id: number): Promise<IIdeaPostViewWithComment>;
    LikePost(postid: number, userid: number, dto: LikeDto): Promise<{
        msg: string;
    }>;
    Makecomment(postid: number, userid: number, dto: CommentDto): Promise<{
        msg: string;
    }>;
    editComment(commentid: number, userid: number, dto: CommentDto): Promise<{
        msg: string;
    }>;
    DeleteComment(commentid: number, userid: number): Promise<{
        msg: string;
    }>;
    LikeComment(postid: number, userid: number, dto: LikeDto): Promise<{
        msg: string;
    }>;
    ReplyAComment(replyid: number, userid: number, dto: ReplyDto): Promise<{
        msg: string;
    }>;
    editReply(replyid: number, userid: number, dto: ReplyDto): Promise<{
        msg: string;
    }>;
    DeleteReply(replyid: number, userid: number): Promise<{
        msg: string;
    }>;
    LikeAReply(userid: number, replyid: number, dto: LikeDto): Promise<{
        msg: string;
    }>;
}
