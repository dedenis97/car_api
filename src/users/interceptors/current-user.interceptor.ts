import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService: UsersService) { }

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest()

        const { userId } = request.session || {}

        if (userId) {
            const user = await this.userService.findOne(userId)
            // send this to request to let it be get by @CurrentUser             
            request.currentUser =  user
        }

        return handler.handle()
    }
}
