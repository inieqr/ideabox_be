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
exports.RepliesEntity = void 0;
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const user_entity_1 = require("./user.entity");
let RepliesEntity = class RepliesEntity {
};
exports.RepliesEntity = RepliesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RepliesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RepliesEntity.prototype, "reply", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], RepliesEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RepliesEntity.prototype, "repliedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.comment_replies),
    __metadata("design:type", user_entity_1.UserEntity)
], RepliesEntity.prototype, "replied_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.CommentsEntity, comment => comment.replies, { onDelete: "CASCADE" }),
    __metadata("design:type", comment_entity_1.CommentsEntity)
], RepliesEntity.prototype, "comment_replied", void 0);
exports.RepliesEntity = RepliesEntity = __decorate([
    (0, typeorm_1.Entity)()
], RepliesEntity);
//# sourceMappingURL=reply.entity.js.map