import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nome!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;






}

export default User;