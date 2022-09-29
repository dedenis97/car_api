import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { ReportEntity } from './reports/entity/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
					port: 3307,
					username: 'root',
					password: 'root',
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
export class AppModule { }
