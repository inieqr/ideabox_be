import { AdminEntity } from "src/Entity/admin.entity";
import { UserEntity } from "src/Entity/user.entity";
import { AdminRepository } from "src/Users/admin/admin.repository";
import { UserRepository } from "src/Users/user/user.reposiroty";
export declare class AuthService {
    private readonly adminrepo;
    private readonly userrepo;
    constructor(adminrepo: AdminRepository, userrepo: UserRepository);
    ValidateuserOrAdminByIdandRole(id: number, role: string): Promise<AdminEntity | UserEntity>;
}
