import { DataSource } from 'typeorm';
import User from './models/User';
import Endereco from './models/Endereco';
import Livro from './models/Livro';
import Role from './models/Role';

export const myDataSource = new DataSource({
    type: 'sqlite',
    database: 'src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities:[User, Endereco, Livro, Role],

})