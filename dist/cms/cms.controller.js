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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("./cms.service");
const platform_express_1 = require("@nestjs/platform-express");
const cms_dto_1 = require("./cms.dto");
const common_dto_1 = require("../common/common.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const role_guard_1 = require("../auth/guard/role.guard");
const role_decorator_1 = require("../auth/decorators/role.decorator");
const general_enum_1 = require("../Enum/general.enum");
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async createIdea(id, dto, mediafiles) {
        try {
            return await this.cmsService.createIdea(id, dto, mediafiles);
        }
        catch (error) {
            throw error;
        }
    }
    async editIdea(postid, userid, dto, mediafiles) {
        try {
            return await this.cmsService.EditIdea(postid, dto, userid, mediafiles);
        }
        catch (error) {
            throw error;
        }
    }
    async DeleteIdea(ideaid, userid, req) {
        try {
            const userfromreq = req.user.id;
            console.log(req.user);
            return await this.cmsService.deleteIdea(ideaid, userid);
        }
        catch (error) {
            throw error;
        }
    }
    async getBlogPosts(page, limit) {
        try {
            const { blogPosts, total } = await this.cmsService.getAllIdeas(page, limit);
            return {
                data: blogPosts,
                total: total,
                page: page,
                limit: limit
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getoneIdea(id) {
        try {
            return await this.cmsService.getOneIdea(id);
        }
        catch (error) {
            throw error;
        }
    }
    async LikePost(postid, userid, dto) {
        try {
            return await this.cmsService.LikeAPost(postid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
    async Makecomment(postid, userid, dto) {
        try {
            return await this.cmsService.MakeAComment(postid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
    async editComment(commentid, userid, dto) {
        try {
            return await this.cmsService.EditAComment(commentid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
    async DeleteComment(commentid, userid) {
        try {
            return await this.cmsService.deleteCommentPost(commentid, userid);
        }
        catch (error) {
            throw error;
        }
    }
    async LikeComment(postid, userid, dto) {
        try {
            return await this.cmsService.LikeAComment(postid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
    async ReplyAComment(replyid, userid, dto) {
        try {
            return await this.cmsService.ReplyAComment(replyid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
    async editReply(replyid, userid, dto) {
        try {
            return await this.cmsService.EditAReply(replyid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
    async DeleteReply(replyid, userid) {
        try {
            return await this.cmsService.deleteReply(replyid, userid);
        }
        catch (error) {
            throw error;
        }
    }
    async LikeAReply(userid, replyid, dto) {
        try {
            return await this.cmsService.LikeAReply(replyid, userid, dto);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Post)('create-idea/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media', 10)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cms_dto_1.MakeblogPostDto, Array]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createIdea", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Patch)('edit-idea/:postid/:userid'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media', 10)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, cms_dto_1.MakeblogPostDto, Array]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "editIdea", null);
__decorate([
    (0, common_1.Delete)('delete-idea/:ideaId/:userId'),
    __param(0, (0, common_1.Param)('ideaId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "DeleteIdea", null);
__decorate([
    (0, common_1.Get)('all-ideas'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBlogPosts", null);
__decorate([
    (0, common_1.Get)('one-idea/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getoneIdea", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Patch)('like-an-idea/:postid/:userid'),
    __param(0, (0, common_1.Param)('postid')),
    __param(1, (0, common_1.Param)('userid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.LikeDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "LikePost", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Post)('make-comment/:postid/:userid'),
    __param(0, (0, common_1.Param)('postid')),
    __param(1, (0, common_1.Param)('userid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "Makecomment", null);
__decorate([
    (0, common_1.Patch)('edit-comment/:commentid/:userid'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "editComment", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER, general_enum_1.Role.ADMIN),
    (0, common_1.Delete)('delete-comment/:commentid/:userid'),
    __param(0, (0, common_1.Param)('commentid')),
    __param(1, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "DeleteComment", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Patch)('like-a-comment/:commentid/:userid'),
    __param(0, (0, common_1.Param)('commentid')),
    __param(1, (0, common_1.Param)('userid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.LikeDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "LikeComment", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Post)('make-reply/:replyid/:userid'),
    __param(0, (0, common_1.Param)('replyid')),
    __param(1, (0, common_1.Param)('userid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.ReplyDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "ReplyAComment", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Patch)('edit-reply/:replyid/:userid'),
    __param(0, (0, common_1.Param)('replyid')),
    __param(1, (0, common_1.Param)('iuserd')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.ReplyDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "editReply", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER, general_enum_1.Role.ADMIN),
    (0, common_1.Delete)('delete-reply/:replyid/:userid'),
    __param(0, (0, common_1.Param)('replyid')),
    __param(1, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "DeleteReply", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(general_enum_1.Role.USER),
    (0, common_1.Patch)('like-a-reply/:replyid/:userid'),
    __param(0, (0, common_1.Param)('userid')),
    __param(1, (0, common_1.Param)('replyid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, common_dto_1.LikeDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "LikeAReply", null);
exports.CmsController = CmsController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('idea'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map