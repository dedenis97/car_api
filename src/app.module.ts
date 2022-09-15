import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { ReportEntity } from './reports/entity/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      
      password: '92114610',
      database: 'car',
      entities: [UserEntity, ReportEntity],
      synchronize:true,
    }),

    UsersModule,
    ReportsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
