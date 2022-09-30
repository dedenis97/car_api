// DEPRECATO :(
    
var dbConfig = {
    type: 'mysql',
    synchronize: false
}

switch (process.env.NODE_ENV) {
    case "development":
        Object.assign(dbConfig, {
            database: 'car',
            entities: ['**/*.entity.js'],
            username: "root",
            password: "helloworld",
            host: "127.0.0.1",
            port: 3308
        })

        break
    case "test":
        Object.assign(dbConfig, {
            database: 'test',
            enitities: ['**/*.enitity.ts'],
        })

        break
    case "production":
        break
    default: throw new Error(process.env.NODE_ENV + " is unknow environment");
}


module.exports = dbConfig