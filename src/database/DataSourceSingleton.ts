import { DataSource } from 'typeorm';
import Address from './models/Address';
import Book from './models/Book';
import User from './models/User';
import Role from './models/Role';


// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class DataSourceSingleton {
    private static instance: DataSource;

    public static getInstance(): DataSource{
        if (!DataSourceSingleton.instance){
            DataSourceSingleton.instance = new DataSource({
                type: 'sqlite',
                database: 'src/database/database.sqlite',
                logging: true,
                synchronize: true,
                entities: [User, Address, Book, Role],
            });
        }

        return DataSourceSingleton.instance;
    }
}