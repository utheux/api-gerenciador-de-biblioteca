import { DataSource } from 'typeorm';
import User from './models/User';
import {CreateUser1734824564301} from './migrations/1734824564301-createUser'

export const myDataSource = new DataSource({
    type: 'sqlite',
    database: 'src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities:[User],
    migrations:[CreateUser1734824564301]

})