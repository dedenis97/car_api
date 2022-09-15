import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(body: CreateUserDto): void;
    findUser(id: string): Promise<import("./entity/user.entity").UserEntity>;
    findAllUsers(email: string): Promise<import("./entity/user.entity").UserEntity[]>;
    removeUser(id: string): Promise<import("./entity/user.entity").UserEntity[]>;
    updateUser(body: Partial<UpdateUserDto>, id: string): Promise<import("./entity/user.entity").UserEntity>;
}
