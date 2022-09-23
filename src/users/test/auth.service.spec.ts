import { Test } from "@nestjs/testing";
import { async } from "rxjs";
import { AuthService } from "../auth.service";
import { UserEntity } from "../entity/user.entity";
import { UsersService } from "../users.service";



it("can create an instance of auth service", async () => {

    // fakje copy of userService

    const fakeUserService: Partial<UsersService> = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => Promise.resolve({
            id: 1,
            email,
            password
        } as UserEntity)
    }


    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: UsersService,
                // class to inect in dipendency inj container
                // but i use as vaule the fake one
                useValue: fakeUserService
            }
        ]
    }).compile()

    const service = module.get(AuthService);

    expect(service).toBeDefined()


})