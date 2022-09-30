import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

const cookieSession = require('cookie-session')

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		ReportsModule,
	],

	controllers: [AppController],
	providers: [AppService],
})


export class AppModule {

	constructor(private configService: ConfigService) { }

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				cookieSession({
					keys: [this.configService.get("COOKIE_KEY")]
				}),).forRoutes('*')

	}




}
