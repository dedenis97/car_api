import { UsersService } from "./users.service";
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signUp(email: string, password: string): Promise<void>;
    checkAuth(email: string, password: string): Promise<void>;
}
