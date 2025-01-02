import { DataSource } from 'typeorm';
import Address from './models/Address';
import Book from './models/Book';
import User from './models/User';
import Role from './models/Role';


export const myDataSource = new DataSource({
    type: 'sqlite',
    database: 'src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities:[User, Address, Book, Role],

})