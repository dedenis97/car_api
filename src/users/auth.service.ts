import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UserEntity } from "./entity/user.entity";
import { UsersService } from "./users.service";

import * as bcrypt from "bcrypt";

// transform a call bask js normal fn 
// to promise fn

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async signUp(email: string, password: string){


        // See if email is in use
        const users = await this.usersService.find(email)

        if (users.length) {
            throw new BadRequestException("Email already in use")
        }

        // - join them
        const hashedPassword = await bcrypt.hash(password, 12)


        return this.usersService.create(email, hashedPassword)

    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException("Bad password")
        }

        return user;

    }
}
