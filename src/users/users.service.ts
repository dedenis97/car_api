import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) { }

    create(email: string, password: string): Promise<UserEntity> {

        const user = this.repo.create({
            email, password
        })

        return this.repo.save(user)
    }

    findOne(id: number) {
        if (id == null) {
            return null
        }

        return this.repo.findOneBy({id})
    }

    find(email: string) {
        return this.repo.findBy({
            email: email
        })
    }

    async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        Object.assign(user, attrs)

        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.repo.remove([user]);
    }




}
