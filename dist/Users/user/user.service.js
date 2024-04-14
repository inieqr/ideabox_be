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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("../../Entity/notification.entity");
const common_repository_1 = require("../../common/common.repository");
const otp_entity_1 = require("../../Entity/otp.entity");
const bcrypt = require("bcrypt");
const general_enum_1 = require("../../Enum/general.enum");
const nanoid_1 = require("nanoid");
const mailer_service_1 = require("../../Mailer/mailer.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../Entity/user.entity");
const user_reposiroty_1 = require("./user.reposiroty");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepo, noticicationrepo, otprepo, mailerservice, configservice, jwt) {
        this.userRepo = userRepo;
        this.noticicationrepo = noticicationrepo;
        this.otprepo = otprepo;
        this.mailerservice = mailerservice;
        this.configservice = configservice;
        this.jwt = jwt;
    }
    async hashpassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async comaprePassword(userpassword, dbpassword) {
        return await bcrypt.compare(userpassword, dbpassword);
    }
    generateEmailToken() {
        const gen = (0, nanoid_1.customAlphabet)('12345678990', 6);
        return gen();
    }
    async signToken(id, email, role) {
        const payload = {
            sub: id,
            email,
            role,
        };
        const secret = this.configservice.get('SECRETKEY');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: this.configservice.get('EXPIRESIN'),
            secret: secret,
        });
        return { token: token };
    }
    async getProfile(userId) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async createUser(dto) {
        const checkemail = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (checkemail)
            throw new common_1.HttpException('this user already exists', common_1.HttpStatus.FOUND);
        const hashedpassword = await this.hashpassword(dto.password);
        const dob = new Date(dto.dob);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const admin = new user_entity_1.UserEntity();
        admin.email = dto.email;
        admin.password = hashedpassword;
        admin.fullname = dto.fullname;
        admin.role = general_enum_1.Role.USER;
        admin.createdAt = new Date();
        (admin.gender = dto.gender),
            admin.isVerified = true;
        await this.userRepo.save(admin);
        const emiailverificationcode = await this.generateEmailToken();
        await this.mailerservice.SendVerificationeMail(dto.email, dto.fullname);
        const otp = new otp_entity_1.UserOtp();
        otp.email = dto.email;
        otp.otp = emiailverificationcode;
        otp.role = admin.role;
        const fiveminuteslater = new Date();
        await fiveminuteslater.setMinutes(fiveminuteslater.getMinutes() + 60);
        otp.expiration_time = fiveminuteslater;
        await this.otprepo.save(otp);
        const notification = new notification_entity_1.Notifications();
        notification.account = admin.fullname;
        notification.subject = 'New User Created!';
        notification.notification_type = general_enum_1.NotificationType.ADMIN_CREATED;
        notification.message = `new admin created successfully `;
        await this.noticicationrepo.save(notification);
        return {
            message: 'you have successfully registered as a user, please check your mail for the otp verification',
        };
    }
    async verifyEmail(dto) {
        const findemail = await this.otprepo.findOne({
            where: { email: dto.email },
        });
        if (!findemail)
            throw new common_1.HttpException('the user does not match the owner of the otp', common_1.HttpStatus.NOT_FOUND);
        const findotp = await this.otprepo.findOne({ where: { otp: dto.otp } });
        if (!findotp)
            throw new common_1.HttpException('you provided an invalid otp,please go back to your mail and confirm the OTP sent to you', common_1.HttpStatus.BAD_REQUEST);
        if (findotp.expiration_time <= new Date())
            throw new common_1.HttpException('otp is expired please request for another one', common_1.HttpStatus.REQUEST_TIMEOUT);
        const admin = await this.userRepo.findOne({ where: { email: dto.email } });
        if (admin.email !== findemail.email)
            throw new common_1.HttpException('this email does not match the customer record we have ', common_1.HttpStatus.NOT_FOUND);
        else {
            admin.isVerified = true;
            admin.isLoggedIn = true;
            admin.isRegistered = true;
            const notification = new notification_entity_1.Notifications();
            (notification.account = admin.fullname),
                (notification.subject = 'Super Admin Verified!');
            notification.notification_type = general_enum_1.NotificationType.EMAIL_VERIFICATION;
            notification.message = `Hello ${admin.fullname}, your email has been successfully verified `;
            await this.noticicationrepo.save(notification);
            await this.userRepo.save(admin);
            const accessToken = await this.signToken(admin.id, admin.email, admin.role);
            return { isValid: true, accessToken };
        }
    }
    async ResendExpiredOtp(dto) {
        const emailexsist = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (!emailexsist)
            throw new common_1.HttpException(`user with email: ${dto.email}doesn't exists, please use an already registered email`, common_1.HttpStatus.CONFLICT);
        const expiredOtp = await this.otprepo.findOne({
            where: { email: dto.email, expiration_time: (0, typeorm_2.LessThan)(new Date()) },
        });
        if (!expiredOtp) {
            throw new common_1.HttpException('No expired OTP found for this user.', common_1.HttpStatus.NOT_FOUND);
        }
        const emiailverificationcode = await this.generateEmailToken();
        const fiveminuteslater = new Date();
        await fiveminuteslater.setMinutes(fiveminuteslater.getMinutes() + 60);
        const newOtp = this.otprepo.create({
            email: dto.email,
            otp: emiailverificationcode,
            expiration_time: fiveminuteslater,
            role: emailexsist.role,
        });
        await this.otprepo.save(newOtp);
        const notification = new notification_entity_1.Notifications();
        notification.account = emailexsist.fullname;
        notification.subject = 'Otp Resent!';
        notification.notification_type = general_enum_1.NotificationType.EMAIL_VERIFICATION;
        notification.message = `Hello ${emailexsist.fullname}, a new verification Link has been resent to your mail `;
        await this.noticicationrepo.save(notification);
        await this.mailerservice.SendVerificationeMail(newOtp.email, emailexsist.fullname);
        return { message: 'New Otp verification code has been sent successfully' };
    }
    async sendPasswordResetLink(dto) {
        const isEmailReistered = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (!isEmailReistered)
            throw new common_1.HttpException(`this email ${dto.email} does not exist in our system, please try another email address`, common_1.HttpStatus.NOT_FOUND);
        const resetlink = await this.generateEmailToken();
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        await this.mailerservice.SendPasswordResetLinkMail(dto.email, resetlink, isEmailReistered.fullname);
        isEmailReistered.password_reset_link = resetlink;
        isEmailReistered.reset_link_exptime = expirationTime;
        await this.userRepo.save(isEmailReistered);
        const notification = new notification_entity_1.Notifications();
        (notification.account = isEmailReistered.fullname),
            (notification.subject = 'password Reset link!');
        notification.notification_type = general_enum_1.NotificationType.EMAIL_VERIFICATION;
        notification.message = `Hello ${isEmailReistered.fullname}, password resent link sent `;
        await this.noticicationrepo.save(notification);
        return { message: 'the password reset link has been sent successfully' };
    }
    async finallyResetPassword(dto) {
        const verifyuser = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (!verifyuser)
            throw new common_1.HttpException('this user is not registered with elfevents', common_1.HttpStatus.NOT_FOUND);
        if (verifyuser.password_reset_link !== dto.otp)
            throw new common_1.HttpException('the link is incorrect please retry or request for another link', common_1.HttpStatus.NOT_ACCEPTABLE);
        const newpassword = await this.hashpassword(dto.password);
        verifyuser.password = newpassword;
        await this.userRepo.save(verifyuser);
        const notification = new notification_entity_1.Notifications();
        (notification.account = verifyuser.fullname),
            (notification.subject = 'New Customer!');
        notification.notification_type = general_enum_1.NotificationType.EMAIL_VERIFICATION;
        notification.message = `Hello ${verifyuser.fullname}, password reset link verified and the password has been recently reseted `;
        await this.noticicationrepo.save(notification);
        return { message: 'your password has been reset susscessfully' };
    }
    async login(logindto) {
        const findadmin = await this.userRepo.findOne({
            where: { email: logindto.email },
        });
        if (!findadmin)
            throw new common_1.HttpException(`invalid credential`, common_1.HttpStatus.NOT_FOUND);
        const comparepass = await this.comaprePassword(logindto.password, findadmin.password);
        if (!comparepass) {
            findadmin.loginCount += 1;
            if (findadmin.loginCount >= 5) {
                findadmin.isLocked = true;
                findadmin.locked_until = new Date(Date.now() + 24 * 60 * 60 * 1000);
                await this.userRepo.save(findadmin);
                throw new common_1.HttpException(`invalid password`, common_1.HttpStatus.UNAUTHORIZED);
            }
            const attemptsleft = 5 - findadmin.loginCount;
            await this.userRepo.save(findadmin);
            throw new common_1.HttpException(`invalid credentials ${attemptsleft} attempts left before your account is locked.`, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!findadmin.isVerified) {
            throw new common_1.ForbiddenException(`Your account has not been verified. Please verify your account by requesting a verification code.`);
        }
        findadmin.loginCount = 0;
        findadmin.isLoggedIn = true;
        await this.userRepo.save(findadmin);
        const notification = new notification_entity_1.Notifications();
        notification.account = findadmin.fullname;
        notification.subject = 'Photographer just logged in!';
        notification.notification_type = general_enum_1.NotificationType.LOGGED_IN;
        notification.message = `Hello ${findadmin.fullname}, just logged in `;
        await this.noticicationrepo.save(notification);
        return await this.signToken(findadmin.id, findadmin.email, findadmin.role);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_entity_1.Notifications)),
    __param(2, (0, typeorm_1.InjectRepository)(otp_entity_1.UserOtp)),
    __metadata("design:paramtypes", [user_reposiroty_1.UserRepository,
        common_repository_1.NotificationRepository,
        common_repository_1.OtpRepository,
        mailer_service_1.Mailer,
        config_1.ConfigService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map