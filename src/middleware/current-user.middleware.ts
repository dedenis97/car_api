import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private usersService: UsersService) { }

    async use(req: any, res: Response, next: NextFunction) {

        // console.log("request", req)
        // console.log("---------------------------");
        // console.log("response", res)


       
        
        const { userId } = req.session || undefined

        console.log(userId, userId == 5)

        if (userId != undefined) {

            const user = await this.usersService.findOne(userId)

            req.currentUser = user
           
        }

        next()
    }

}