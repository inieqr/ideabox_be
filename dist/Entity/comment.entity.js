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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const reply_entity_1 = require("./reply.entity");
const idea_entity_1 = require("./idea.entity");
let CommentsEntity = class CommentsEntity {
};
exports.CommentsEntity = CommentsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CommentsEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentsEntity.prototype, "madeAT", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.my_comment),
    __metadata("design:type", user_entity_1.UserEntity)
], CommentsEntity.prototype, "made_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => idea_entity_1.IdeaEntity, blogpost => blogpost.idea),
    __metadata("design:type", idea_entity_1.IdeaEntity)
], CommentsEntity.prototype, "idea", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reply_entity_1.RepliesEntity, reply => reply.comment_replied, { cascade: true }),
    __metadata("design:type", Array)
], CommentsEntity.prototype, "replies", void 0);
exports.CommentsEntity = CommentsEntity = __decorate([
    (0, typeorm_1.Entity)()
], CommentsEntity);
//# sourceMappingURL=comment.entity.js.map