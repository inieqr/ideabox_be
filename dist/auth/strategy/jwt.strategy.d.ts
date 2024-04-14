import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authservice;
    constructor(configservice: ConfigService, authservice: AuthService);
    validate(payload: any): Promise<import("src/Entity/admin.entity").AdminEntity | import("src/Entity/user.entity").UserEntity>;
}
export {};
