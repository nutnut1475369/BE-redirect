import {MongoClient} from 'mongodb';
import DB_config from './config'
export default class {
    constructor() {
        this.connectDB()
    }
    async connectDB() {
        console.log(DB_config.DB_config.connectString)
        this.DB = await MongoClient.connect(DB_config.DB_config.connectString, {
            useNewUrlParser: true
        })
    }
    async closeDB() {
        this.DB.close()
    }
}