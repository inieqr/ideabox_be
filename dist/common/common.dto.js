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
exports.LikeDto = exports.ReplyDto = exports.CommentDto = exports.Logindto = exports.FinallyResetPasswordDto = exports.VerifyOtpDto = exports.SendPasswordResetLinkDto = exports.RequestOtpResendDto = exports.ChangePassword = void 0;
const class_validator_1 = require("class-validator");
const general_enum_1 = require("../Enum/general.enum");
const match_decorator_1 = require("../helpers/match.decorator");
class ChangePassword {
}
exports.ChangePassword = ChangePassword;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    }),
    __metadata("design:type", String)
], ChangePassword.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    }),
    __metadata("design:type", String)
], ChangePassword.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, match_decorator_1.Match)('newPassword', { message: "confirmPassword does not match the newPassword " }),
    __metadata("design:type", String)
], ChangePassword.prototype, "confirmNewPassword", void 0);
class RequestOtpResendDto {
}
exports.RequestOtpResendDto = RequestOtpResendDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RequestOtpResendDto.prototype, "email", void 0);
class SendPasswordResetLinkDto {
}
exports.SendPasswordResetLinkDto = SendPasswordResetLinkDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendPasswordResetLinkDto.prototype, "email", void 0);
class VerifyOtpDto {
}
exports.VerifyOtpDto = VerifyOtpDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "otp", void 0);
class FinallyResetPasswordDto {
}
exports.FinallyResetPasswordDto = FinallyResetPasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinallyResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinallyResetPasswordDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    }),
    __metadata("design:type", String)
], FinallyResetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, match_decorator_1.Match)('password', { message: 'ConfirmPassword does not match the new password.' }),
    __metadata("design:type", String)
], FinallyResetPasswordDto.prototype, "confirmPassword", void 0);
class Logindto {
}
exports.Logindto = Logindto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Logindto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Logindto.prototype, "password", void 0);
class CommentDto {
}
exports.CommentDto = CommentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentDto.prototype, "comment", void 0);
class ReplyDto {
}
exports.ReplyDto = ReplyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplyDto.prototype, "reply", void 0);
class LikeDto {
}
exports.LikeDto = LikeDto;
__decorate([
    (0, class_validator_1.IsEnum)(general_enum_1.LikeAction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LikeDto.prototype, "like", void 0);
//# sourceMappingURL=common.dto.js.map