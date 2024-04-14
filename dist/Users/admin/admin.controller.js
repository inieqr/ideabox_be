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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
const common_dto_1 = require("../../common/common.dto");
let AdminController = class AdminController {
    constructor(adminservice) {
        this.adminservice = adminservice;
    }
    async Registeradmin(dto) {
        return await this.adminservice.createSuperAdmin(dto);
    }
    async Verify_email(dto) {
        return await this.adminservice.SuperAdminverifyEmail(dto);
    }
    async resendVerificationLink(dto) {
        return await this.adminservice.AdminResendemailVerificationLink(dto);
    }
    async sendPasswordResetLink(dto) {
        return await this.adminservice.AdminsendPasswordResetLink(dto);
    }
    async ResetPassword(dto) {
        return await this.adminservice.AdminfinallyResetPassword(dto);
    }
    async Login(dto) {
        return await this.adminservice.loginAdmin(dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Registeradmin", null);
__decorate([
    (0, common_1.Post)('/verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Verify_email", null);
__decorate([
    (0, common_1.Post)('/resend-verification-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.RequestOtpResendDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resendVerificationLink", null);
__decorate([
    (0, common_1.Post)('/send-password-reset-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.SendPasswordResetLinkDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendPasswordResetLink", null);
__decorate([
    (0, common_1.Patch)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.FinallyResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "ResetPassword", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.Logindto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Login", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map