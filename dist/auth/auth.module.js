"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../Entity/admin.entity");
const user_entity_1 = require("../Entity/user.entity");
const role_guard_1 = require("./guard/role.guard");
const jwt_guard_1 = require("./guard/jwt.guard");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService, role_guard_1.RoleGuard, jwt_guard_1.JwtGuard, jwt_strategy_1.JwtStrategy],
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, user_entity_1.UserEntity]),
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.SECRETKEY,
                    signOptions: { expiresIn: process.env.EXPIRESIN }
                })
            })],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map