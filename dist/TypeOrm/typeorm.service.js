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
exports.TypeOrmService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin_entity_1 = require("../Entity/admin.entity");
const comment_entity_1 = require("../Entity/comment.entity");
const idea_entity_1 = require("../Entity/idea.entity");
const notification_entity_1 = require("../Entity/notification.entity");
const otp_entity_1 = require("../Entity/otp.entity");
const reply_entity_1 = require("../Entity/reply.entity");
const user_entity_1 = require("../Entity/user.entity");
let TypeOrmService = class TypeOrmService {
    constructor(configservice) {
        this.configservice = configservice;
    }
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: this.configservice.get('DATABASE_HOST'),
            port: this.configservice.get('DATABASE_PORT'),
            username: this.configservice.get('DATABASE_USERNAME'),
            password: String(this.configservice.get('DATABASE_PASSWORD')),
            database: this.configservice.get('DATABASE_NAME'),
            synchronize: true,
            logging: false,
            entities: [
                admin_entity_1.AdminEntity,
                user_entity_1.UserEntity,
                idea_entity_1.IdeaEntity,
                comment_entity_1.CommentsEntity,
                reply_entity_1.RepliesEntity,
                notification_entity_1.Notifications,
                otp_entity_1.UserOtp,
            ],
            migrations: [],
            subscribers: [],
        };
    }
};
exports.TypeOrmService = TypeOrmService;
exports.TypeOrmService = TypeOrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmService);
//# sourceMappingURL=typeorm.service.js.map