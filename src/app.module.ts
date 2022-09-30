import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { ReportEntity } from './reports/entity/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

const cookieSession = require('cookie-session')

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: "env/.env." + process.env.NODE_ENV,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],

			useFactory: (config: ConfigService) => {
				return {
					type: "mysql",
					host: '127.0.0.1',
					port: 3308,
					username: 'root',
					password: 'helloworld',
					database: config.get("DB_NAME"),
					entities: [UserEntity, ReportEntity],
					synchronize: true,

				}
			}

		}),

		UsersModule,
		ReportsModule,
	],

	controllers: [AppController],
	providers: [AppService],
})


export class AppModule {

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				cookieSession({
					keys: ['asdasdasd']
				}),).forRoutes('*')

	}




}
