import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { UserEntity } from "src/users/entity/user.entity";


interface ClassConstructor{
    new(...args: any[]): {}
}

//  this is a decorator
export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
     
    constructor(private dto: any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        return next.handle().pipe(
            
            map((data: any) => {

     
                return plainToClass(this.dto, data, {
                    // share to response onlyu property with @Expose
                    excludeExtraneousValues: true 
                })


            })

        )

    }

}