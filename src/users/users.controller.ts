import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseInterceptors } from '@nestjs/common';
import { Serialize, } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    @Get("whoami") 
    who(@CurrentUser() user: UserEntity) {
        return user
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session) {
        const user = await this.authService.signUp(body.email, body.password)

        session.userId = user.id
        return user;
    }

    @Post('/signin')
    async signup(@Body() body: CreateUserDto, @Session() session) {
        const user = await this.authService.checkAuth(body.email, body.password)

        session.userId = user.id
        return user;
    }

    @Post('/signout')
    signout(@Session() session) {
        session.userId = null
    }

    @Get("/:id")
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id))

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return user;
    }
    @Get()
    async findAllUsers(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Delete("/:id")
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    // if i omit return the exeption in not returned as response
    // infact will throw only the error on console blocking the server
    @Patch('/:id')
    updateUser(@Body() body: Partial<UpdateUserDto>, @Param('id') id: string) {
        return this.userService.update(parseInt(id), body)
    } 

}
