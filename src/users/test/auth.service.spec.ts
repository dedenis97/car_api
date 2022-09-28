import { Test } from "@nestjs/testing";
import { doesNotMatch } from "assert";
import { async } from "rxjs";
import { AuthService } from "../auth.service";
import { UserEntity } from "../entity/user.entity";
import { UsersService } from "../users.service";

const mockUser = {
    email: "mock@email.it",
    password: "123456789"
}


describe('AuthService', () => {

    let service: AuthService
    let fakeUserService: Partial<UsersService>

    beforeEach(async () => {

        fakeUserService = {
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
                    useValue: fakeUserService
                }
            ]
        }).compile()

        service = module.get(AuthService);
    })

    it("can create an instance of auth service", async () => {
        expect(service).toBeDefined()
    })

    it("can a new user with hashed password", async () => {


        const user = await service.signUp(mockUser.email, mockUser.password)

        expect(user.password).not.toEqual(mockUser.password)
        const [salt, hash] = user.password.split('.')

        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it("throws an error if user signup with an email already registered", (done) => {

        // redefine find mehod only for this test

        fakeUserService.find = () => Promise.resolve([{
            id: 0,
            email: mockUser.email,
            password: mockUser.password
        }] as UserEntity[])


        service.signUp('','')
            .then()
            .catch((e) => {
                done()
            })

    })

    it("throws if an invalid password is provided", (done) => {

        fakeUserService.find = () => Promise.resolve([{
            id: 0,
            email: mockUser.email,
            password: mockUser.password
        }] as UserEntity[])

        service.signUp('','123456789a')

        
    })

})
