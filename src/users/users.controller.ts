import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password)
    }

    @UseInterceptors(ClassSerializerInterceptor)
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
