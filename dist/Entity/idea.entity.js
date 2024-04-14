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
exports.IdeaEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const comment_entity_1 = require("./comment.entity");
const general_enum_1 = require("../Enum/general.enum");
let IdeaEntity = class IdeaEntity {
};
exports.IdeaEntity = IdeaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IdeaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IdeaEntity.prototype, "idea", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: general_enum_1.IdeaTags, nullable: false }),
    __metadata("design:type", String)
], IdeaEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, }),
    __metadata("design:type", Array)
], IdeaEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], IdeaEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IdeaEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.my_blogs),
    __metadata("design:type", user_entity_1.UserEntity)
], IdeaEntity.prototype, "blogger", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentsEntity, comments => comments.idea),
    __metadata("design:type", Array)
], IdeaEntity.prototype, "comments_made", void 0);
exports.IdeaEntity = IdeaEntity = __decorate([
    (0, typeorm_1.Entity)()
], IdeaEntity);
//# sourceMappingURL=idea.entity.js.map