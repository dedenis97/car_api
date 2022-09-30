import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ReportEntity } from "src/reports/entity/report.entity";
import { UserEntity } from "src/users/entity/user.entity";
 /**
  * Migration
  * 
  * - npm install ts-node --save-dev
  * 
  * in package.json ADD:
    "scripts": {
        ...
        "typeorm": "typeorm-ts-node-commonjs"
    }
  */



const settings = require('../../ormconfig.js');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "src/env/.env." + process.env.NODE_ENV,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],

            useFactory: (config: ConfigService) => {
                return {
                    type: "mysql",
                    host: config.get<string>("DB_HOST"),
                    port: config.get("DB_PORT"),
                    username: config.get<string>("DB_USERNAME"),
                    password: config.get<string>("DB_PASSWORD"),
                    database: config.get<string>("DB_NAME"),
                    entities: [UserEntity, ReportEntity],

                    // map the entity to the database
                    // is is 'true'

                    // NOT USE this in production!!!!!!
                    // use ONLY in development!!!!!


                    synchronize: false,

                    // Dangerous :

                    // if i remove a prop in an entity
                    // typeorm will remove the column and the data inside
                    // from the entity table
                    // so i will lost all the data from the table in that column

                }
            }

        }),


    ],

})


export class DatabaseModule {
    constructor() {
        console.log(settings)
    }
}


