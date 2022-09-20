import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize,  } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signUp(body.email, body.password)
    }

    @Post('/signin')
    signup(@Body() body: CreateUserDto) {
        return this.authService.checkAuth(body.email, body.password)
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
