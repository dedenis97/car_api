import { createParamDecorator, ExecutionContext, Session } from "@nestjs/common"
import { UserEntity } from "../users/entity/user.entity"

export const CurrentUser = createParamDecorator(

    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.currentUser
    }

)