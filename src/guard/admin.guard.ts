import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity } from "src/users/entity/user.entity";

export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const user: UserEntity = request.currentUser

        console.log(user);
        
        if (user && user.admin){
            return true
        }

        return false
        
    }
}


// middleware -> guard -> interceptor (request) -> request handler -> interceptor (response)

// session -> adminguard -> currentUser Ibterceptor -> req 

// admin guard cannot know the value of currentUser becouse comew after itself

// so the solution is to make the CurrentUserInterceptor 

// a CurrentUserMiddleware to be before the AdminGuard and pass al the stuff to that