import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto): Promise<void>;
    signup(body: CreateUserDto): Promise<void>;
    findUser(id: string): Promise<import("./entity/user.entity").UserEntity>;
    findAllUsers(email: string): Promise<import("./entity/user.entity").UserEntity[]>;
    removeUser(id: string): Promise<import("./entity/user.entity").UserEntity[]>;
    updateUser(body: Partial<UpdateUserDto>, id: string): Promise<import("./entity/user.entity").UserEntity>;
}
