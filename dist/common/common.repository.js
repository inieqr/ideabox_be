"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = exports.NotificationRepository = void 0;
const notification_entity_1 = require("../Entity/notification.entity");
const otp_entity_1 = require("../Entity/otp.entity");
const typeorm_1 = require("typeorm");
let NotificationRepository = class NotificationRepository extends typeorm_1.Repository {
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(notification_entity_1.Notifications)
], NotificationRepository);
let OtpRepository = class OtpRepository extends typeorm_1.Repository {
};
exports.OtpRepository = OtpRepository;
exports.OtpRepository = OtpRepository = __decorate([
    (0, typeorm_1.EntityRepository)(otp_entity_1.UserOtp)
], OtpRepository);
//# sourceMappingURL=common.repository.js.map