"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../Entity/admin.entity");
const user_entity_1 = require("../Entity/user.entity");
const admin_repository_1 = require("../Users/admin/admin.repository");
const user_reposiroty_1 = require("../Users/user/user.reposiroty");
const cms_repository_1 = require("./cms.repository");
const comment_entity_1 = require("../Entity/comment.entity");
const reply_entity_1 = require("../Entity/reply.entity");
const upload_service_1 = require("../helpers/upload.service");
const notification_entity_1 = require("../Entity/notification.entity");
const general_enum_1 = require("../Enum/general.enum");
const common_repository_1 = require("../common/common.repository");
const idea_entity_1 = require("../Entity/idea.entity");
let CmsService = class CmsService {
    constructor(adminrepo, userrepo, blogrepo, commentrepo, repliesrepo, noticicationrepo, fileuploadservice) {
        this.adminrepo = adminrepo;
        this.userrepo = userrepo;
        this.blogrepo = blogrepo;
        this.commentrepo = commentrepo;
        this.repliesrepo = repliesrepo;
        this.noticicationrepo = noticicationrepo;
        this.fileuploadservice = fileuploadservice;
    }
    async createIdea(id, dto, mediafiles) {
        const blogger = await this.userrepo.findOne({ where: { id: id } });
        if (!blogger)
            throw new common_1.NotFoundException('this user isnt found in our system');
        const medialfileUrls = [];
        for (const file of mediafiles) {
            const medialurl = await this.fileuploadservice.uploadFile(file);
            medialfileUrls.push(`http:localhost:3000/api/v1/blogpost/blog-post/uploadfile/public/${medialurl}`);
        }
        const newblog = await this.blogrepo.create({
            idea: dto.idea,
            media: medialfileUrls,
            tags: dto.tag,
            createdAt: new Date(),
            blogger: blogger,
        });
        await this.blogrepo.save(newblog);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'New BlogPost Created!';
        notification.notification_type = general_enum_1.NotificationType.BLOGPOST_CREATED;
        notification.message = `new blog created successfully `;
        await this.noticicationrepo.save(notification);
        const blogPostResponse = {
            idea: newblog.idea,
            tags: newblog.tags,
            media: newblog.media,
            likes: newblog.likes,
            createdAt: newblog.createdAt,
            blogger: {
                fullname: newblog.blogger.fullname,
                profilepicture: newblog.blogger.profilePicture,
            },
        };
        return blogPostResponse;
    }
    async EditIdea(postid, dto, userid, mediafiles) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('this user isnt found in our system');
        const blog = await this.blogrepo.findOne({ where: { id: postid } });
        if (!blog)
            throw new common_1.NotFoundException('post not found');
        const medialfileUrls = [];
        for (const file of mediafiles) {
            const medialurl = await this.fileuploadservice.uploadFile(file);
            medialfileUrls.push(`http:localhost:3000/api/v1/blogpost/blog-post/uploadfile/public/${medialurl}`);
        }
        const newblog = new idea_entity_1.IdeaEntity();
        newblog.idea = dto.idea,
            newblog.media = medialfileUrls,
            newblog.createdAt = new Date(),
            newblog.blogger = blogger,
            await this.blogrepo.save(newblog);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'BlogPost Updated !';
        notification.notification_type = general_enum_1.NotificationType.BLOGPOST_EDITED;
        notification.message = `existing blogpost updated successfully `;
        await this.noticicationrepo.save(notification);
        const blogPostResponse = {
            idea: newblog.idea,
            tags: newblog.tags,
            media: newblog.media,
            likes: newblog.likes,
            createdAt: newblog.createdAt,
            blogger: {
                fullname: newblog.blogger.fullname,
                profilepicture: newblog.blogger.profilePicture,
            },
        };
        return blogPostResponse;
    }
    async getAllIdeas(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [blogPosts, total] = await this.blogrepo.findAndCount({
            relations: ['blogger', 'comments_made', 'comments_made.made_by', 'comments_made.replies', 'comments_made.replies.replied_by'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: skip
        });
        const formattedBlogPosts = blogPosts.map(blog => ({
            id: blog.id,
            idea: blog.idea,
            tags: blog.tags,
            media: blog.media,
            likes: blog.likes,
            createdAt: blog.createdAt,
            blogger: {
                fullname: blog.blogger.fullname,
                profilepicture: blog.blogger.profilePicture
            },
            comments: blog.comments_made.map(comment => ({
                comment: comment.comment,
                likes: comment.likes,
                madeAT: comment.madeAT,
                made_by: {
                    fullname: comment.made_by.fullname,
                    profilepicture: comment.made_by.profilePicture
                },
                replies: comment.replies.map(reply => ({
                    reply: reply.reply,
                    likes: reply.likes,
                    repliedAt: reply.repliedAt,
                    replied_by: {
                        fullname: reply.replied_by.fullname,
                        profilepicture: reply.replied_by.profilePicture
                    }
                }))
            }))
        }));
        return { blogPosts: formattedBlogPosts, total };
    }
    async getOneIdea(id) {
        const blog = await this.blogrepo.findOne({ where: { id: id }, relations: ['blogger', 'comments_made', 'comments_made.made_by', 'comments_made.replies', 'comments_made.replies.replied_by'] });
        if (!blog)
            throw new common_1.NotFoundException('this blogpost does not exist in the system');
        const response = {
            id: blog.id,
            idea: blog.idea,
            tags: blog.tags,
            media: blog.media,
            likes: blog.likes,
            createdAt: blog.createdAt,
            blogger: {
                fullname: blog.blogger.fullname,
                profilepicture: blog.blogger.profilePicture
            },
            comments: blog.comments_made.map(comment => ({
                comment: comment.comment,
                likes: comment.likes,
                madeAT: comment.madeAT,
                made_by: {
                    fullname: comment.made_by.fullname,
                    profilepicture: comment.made_by.profilePicture
                },
                replies: comment.replies.map(reply => ({
                    reply: reply.reply,
                    likes: reply.likes,
                    repliedAt: reply.repliedAt,
                    replied_by: {
                        fullname: reply.replied_by.fullname,
                        profilepicture: reply.replied_by.profilePicture
                    }
                }))
            }))
        };
        return response;
    }
    async deleteIdea(id, userid) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const blog = await this.blogrepo.findOne({ where: { id: id }, relations: ['blogger', 'comments_made', 'comments_made.made_by', 'comments_made.replies', 'comments_made.replies.replied_by'] });
        if (!blog)
            throw new common_1.NotFoundException('post not found');
        if (blogger.id !== blog.blogger.id) {
            throw new common_1.UnauthorizedException('You are not authorized to delete a post you did not create');
        }
        await this.blogrepo.remove(blog);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'BlogPost deleted !';
        notification.notification_type = general_enum_1.NotificationType.BLOGPOST_DELETED;
        notification.message = `existing blogpost deleted successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'the idea has been deleted ' };
    }
    async MakeAComment(postid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const blog = await this.blogrepo.findOne({ where: { id: postid } });
        if (!blog)
            throw new common_1.NotFoundException('post not found');
        const comment = new comment_entity_1.CommentsEntity();
        comment.comment = dto.comment;
        comment.madeAT = new Date();
        comment.made_by = blogger;
        comment.idea = blog;
        await this.commentrepo.save(comment);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'comment made !';
        notification.notification_type = general_enum_1.NotificationType.COMMENT_MADE;
        notification.message = `a comment has been made on a post successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'a comment has been made successfully' };
    }
    async deleteCommentPost(commentid, userid) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const comment = await this.commentrepo.findOne({ where: { id: commentid } });
        if (!comment)
            throw new common_1.NotFoundException('post not found');
        await this.commentrepo.remove(comment);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'comment deleted !';
        notification.notification_type = general_enum_1.NotificationType.COMMENT_DELETED;
        notification.message = `existing comment deleted successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'the comment has been deleted ' };
    }
    async EditAComment(commentid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const blog = await this.commentrepo.findOne({ where: { id: commentid } });
        if (!blog)
            throw new common_1.NotFoundException('comment not found');
        const comment = new comment_entity_1.CommentsEntity();
        comment.comment = dto.comment;
        comment.madeAT = new Date();
        comment.made_by = blogger;
        await this.commentrepo.save(comment);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'comment edited !';
        notification.notification_type = general_enum_1.NotificationType.COMMENT_EDITED;
        notification.message = `a comment has been edited successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'a comment has been edited successfully' };
    }
    async ReplyAComment(commentid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const comment = await this.commentrepo.findOne({ where: { id: commentid } });
        if (!comment)
            throw new common_1.NotFoundException('comment not found');
        const reply = new reply_entity_1.RepliesEntity();
        reply.reply = dto.reply;
        reply.comment_replied = comment,
            reply.repliedAt = new Date();
        reply.replied_by = blogger,
            await this.repliesrepo.save(reply);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'Replied A Comment !';
        notification.notification_type = general_enum_1.NotificationType.REPLIED_A_COMMENT;
        notification.message = `a reply as been made to a comment successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'a reply has been made to a comment' };
    }
    async deleteReply(commentid, userid) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const reply = await this.repliesrepo.findOne({ where: { id: commentid } });
        if (!reply)
            throw new common_1.NotFoundException('post not found');
        await this.repliesrepo.remove(reply);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'reply deleted !';
        notification.notification_type = general_enum_1.NotificationType.REPLY_DELETED;
        notification.message = `existing reply to a comment deleted successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'the reply has been deleted ' };
    }
    async EditAReply(replyid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const replycomment = await this.repliesrepo.findOne({ where: { id: replyid } });
        if (!replycomment)
            throw new common_1.NotFoundException('post not found');
        const reply = new reply_entity_1.RepliesEntity();
        reply.reply = dto.reply;
        reply.repliedAt = new Date();
        reply.replied_by = blogger,
            await this.repliesrepo.save(reply);
        const notification = new notification_entity_1.Notifications();
        notification.account = blogger.fullname;
        notification.subject = 'reply edited !';
        notification.notification_type = general_enum_1.NotificationType.COMMENT_EDITED;
        notification.message = `a reply has been edited successfully `;
        await this.noticicationrepo.save(notification);
        return { msg: 'a reply has been edited successfully' };
    }
    async LikeAPost(postid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const blog = await this.blogrepo.findOne({ where: { id: postid } });
        if (!blog)
            throw new common_1.NotFoundException('post not found');
        if (dto.like && dto.like === general_enum_1.LikeAction.LIKE) {
            blog.likes += 1;
            await this.blogrepo.save(blog);
            const notification = new notification_entity_1.Notifications();
            notification.account = blogger.fullname;
            notification.subject = 'Liked A Post !';
            notification.notification_type = general_enum_1.NotificationType.LIKED_A_POST;
            notification.message = `liked a post `;
            await this.noticicationrepo.save(notification);
        }
        return { msg: 'you have liked a post' };
    }
    async LikeAComment(commentid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const blog = await this.commentrepo.findOne({ where: { id: commentid } });
        if (!blog)
            throw new common_1.NotFoundException('comment not found');
        if (dto.like && dto.like === general_enum_1.LikeAction.LIKE) {
            blog.likes += 1;
            await this.commentrepo.save(blog);
            const notification = new notification_entity_1.Notifications();
            notification.account = blogger.fullname;
            notification.subject = 'Liked A comment !';
            notification.notification_type = general_enum_1.NotificationType.LIKED_A_COMMENT;
            notification.message = `liked a comment successfully `;
            await this.noticicationrepo.save(notification);
        }
        return { msg: 'you have liked a comment' };
    }
    async LikeAReply(replyid, userid, dto) {
        const blogger = await this.userrepo.findOne({ where: { id: userid } });
        if (!blogger)
            throw new common_1.NotFoundException('user not found');
        const blog = await this.repliesrepo.findOne({ where: { id: replyid } });
        if (!blog)
            throw new common_1.NotFoundException('reply not found');
        if (dto.like && dto.like === general_enum_1.LikeAction.LIKE) {
            blog.likes += 1;
            await this.repliesrepo.save(blog);
            const notification = new notification_entity_1.Notifications();
            notification.account = blogger.fullname;
            notification.subject = 'Liked A Reply !';
            notification.notification_type = general_enum_1.NotificationType.LIKED_A_REPLY;
            notification.message = `liked a Reply `;
            await this.noticicationrepo.save(notification);
        }
        return { msg: 'you have liked a reply' };
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(idea_entity_1.IdeaEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentsEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(reply_entity_1.RepliesEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(notification_entity_1.Notifications)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        user_reposiroty_1.UserRepository,
        cms_repository_1.CmsRepository,
        cms_repository_1.CommentRepository,
        cms_repository_1.RepliesRepository,
        common_repository_1.NotificationRepository,
        upload_service_1.UploadService])
], CmsService);
//# sourceMappingURL=cms.service.js.map