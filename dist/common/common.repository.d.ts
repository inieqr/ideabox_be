import { Notifications } from "src/Entity/notification.entity";
import { UserOtp } from "src/Entity/otp.entity";
import { Repository } from "typeorm";
export declare class NotificationRepository extends Repository<Notifications> {
}
export declare class OtpRepository extends Repository<UserOtp> {
}
