import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<UserEntity>);
    create(email: string, password: string): void;
    findOne(id: number): Promise<UserEntity>;
    find(email: string): Promise<UserEntity[]>;
    update(id: number, attrs: Partial<UserEntity>): Promise<UserEntity>;
    remove(id: number): Promise<UserEntity[]>;
}
