import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserEntity } from './entity/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // add an interceptor globally, not only in this module
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }]
})
export class UsersModule { }
