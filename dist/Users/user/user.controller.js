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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const common_dto_1 = require("../../common/common.dto");
const jwt_guard_1 = require("../../auth/guard/jwt.guard");
let UserController = class UserController {
    constructor(userservice) {
        this.userservice = userservice;
    }
    async getProfile(req) {
        const userId = req.user.id;
        return this.userservice.getProfile(userId);
    }
    async Registeradmin(dto) {
        return await this.userservice.createUser(dto);
    }
    async Verify_email(dto) {
        return await this.userservice.verifyEmail(dto);
    }
    async resendVerificationLink(dto) {
        return await this.userservice.ResendExpiredOtp(dto);
    }
    async sendPasswordResetLink(dto) {
        return await this.userservice.sendPasswordResetLink(dto);
    }
    async ResetPassword(dto) {
        return await this.userservice.finallyResetPassword(dto);
    }
    async Login(dto) {
        return await this.userservice.login(dto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Registeradmin", null);
__decorate([
    (0, common_1.Post)('/verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Verify_email", null);
__decorate([
    (0, common_1.Post)('/resend-verification-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.RequestOtpResendDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendVerificationLink", null);
__decorate([
    (0, common_1.Post)('/send-password-reset-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.SendPasswordResetLinkDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendPasswordResetLink", null);
__decorate([
    (0, common_1.Patch)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.FinallyResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ResetPassword", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.Logindto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map