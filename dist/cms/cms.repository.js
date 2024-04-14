"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesRepository = exports.CommentRepository = exports.CmsRepository = void 0;
const comment_entity_1 = require("../Entity/comment.entity");
const idea_entity_1 = require("../Entity/idea.entity");
const reply_entity_1 = require("../Entity/reply.entity");
const typeorm_1 = require("typeorm");
let CmsRepository = class CmsRepository extends typeorm_1.Repository {
};
exports.CmsRepository = CmsRepository;
exports.CmsRepository = CmsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(idea_entity_1.IdeaEntity)
], CmsRepository);
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
};
exports.CommentRepository = CommentRepository;
exports.CommentRepository = CommentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(comment_entity_1.CommentsEntity)
], CommentRepository);
let RepliesRepository = class RepliesRepository extends typeorm_1.Repository {
};
exports.RepliesRepository = RepliesRepository;
exports.RepliesRepository = RepliesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(reply_entity_1.RepliesEntity)
], RepliesRepository);
//# sourceMappingURL=cms.repository.js.map