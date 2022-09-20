import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

// transform a call bask js normal fn 
// to promise fn

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async signUp(email: string, password: string) {


        // See if email is in use
        const users = await this.usersService.find(email)

        if (users.length) {
            throw new BadRequestException("Email already in use")
        }

        // Hashing the user password

        // - generate a salt 
        const salt = randomBytes(8).toString("hex")

        // - hash the salt and psw toghether
        const hash = (await scrypt(password, salt, 32)) as Buffer

        // - join them
        const hashedPassword = salt + "." + hash.toString("hex")

        // - save user on db and return it

        return this.usersService.create(email, hashedPassword)

    }

    async checkAuth(email: string, password: string) {
        const [user] = await this.usersService.find(email)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        const [salt, storedHash] = user.password.split(".")

        const hash = await scrypt(password, salt, 32) as Buffer

        if (storedHash != hash.toString("hex")) {
            throw new BadRequestException("Bad password")

        }

        return user;

    }
}
