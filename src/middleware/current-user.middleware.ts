import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UserEntity } from "src/users/entity/user.entity";
import { UsersService } from "src/users/users.service";


interface IRequest extends Request{
    currentUser?: UserEntity
    session: any
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private usersService: UsersService) { }

    async use(req: IRequest, res: Response, next: NextFunction) {

        const { userId } = req.session || {}

        if (userId) {

            const user = await this.usersService.findOne(userId)

            req.currentUser = user

        }

        next()
    }

}