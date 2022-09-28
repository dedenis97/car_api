import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUserService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {

    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "test@test.it", password: "123" } as UserEntity)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 0, email, password: "123" }] as UserEntity[])
      },
      // remove: () => { },
      // update: () => { },
    }

    fakeAuthService = {
      // signUp: () => { },
      // signIn: () => { },
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
