/// <reference types="multer" />
import { AdminRepository } from 'src/Users/admin/admin.repository';
import { UserRepository } from 'src/Users/user/user.reposiroty';
import { CmsRepository, CommentRepository, RepliesRepository } from './cms.repository';
import { EditblogPostDto, MakeblogPostDto } from './cms.dto';
import { UploadService } from 'src/helpers/upload.service';
import { IIdeaPostViewWithComment, IIdeaView } from './cms';
import { NotificationRepository } from 'src/common/common.repository';
import { CommentDto, LikeDto, ReplyDto } from 'src/common/common.dto';
export declare class CmsService {
    private readonly adminrepo;
    private readonly userrepo;
    private readonly blogrepo;
    private readonly commentrepo;
    private readonly repliesrepo;
    private readonly noticicationrepo;
    private readonly fileuploadservice;
    constructor(adminrepo: AdminRepository, userrepo: UserRepository, blogrepo: CmsRepository, commentrepo: CommentRepository, repliesrepo: RepliesRepository, noticicationrepo: NotificationRepository, fileuploadservice: UploadService);
    createIdea(id: number, dto: MakeblogPostDto, mediafiles: Express.Multer.File[]): Promise<IIdeaView>;
    EditIdea(postid: number, dto: EditblogPostDto, userid: number, mediafiles: Express.Multer.File[]): Promise<IIdeaView>;
    getAllIdeas(page?: number, limit?: number): Promise<{
        blogPosts: IIdeaPostViewWithComment[];
        total: number;
    }>;
    getOneIdea(id: number): Promise<IIdeaPostViewWithComment>;
    deleteIdea(id: number, userid: number): Promise<{
        msg: string;
    }>;
    MakeAComment(postid: number, userid: number, dto: CommentDto): Promise<{
        msg: string;
    }>;
    deleteCommentPost(commentid: number, userid: number): Promise<{
        msg: string;
    }>;
    EditAComment(commentid: number, userid: number, dto: CommentDto): Promise<{
        msg: string;
    }>;
    ReplyAComment(commentid: number, userid: number, dto: ReplyDto): Promise<{
        msg: string;
    }>;
    deleteReply(commentid: number, userid: number): Promise<{
        msg: string;
    }>;
    EditAReply(replyid: number, userid: number, dto: ReplyDto): Promise<{
        msg: string;
    }>;
    LikeAPost(postid: number, userid: number, dto: LikeDto): Promise<{
        msg: string;
    }>;
    LikeAComment(commentid: number, userid: number, dto: LikeDto): Promise<{
        msg: string;
    }>;
    LikeAReply(replyid: number, userid: number, dto: LikeDto): Promise<{
        msg: string;
    }>;
}
