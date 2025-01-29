import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Role from './Role';
import Address from './Address';
import Reservation from './Reservation';

@Entity('users')
export default class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    cellphone: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo?:string;

    @OneToOne(()=> Address, {
        nullable: true,
        cascade: true,
        eager: true
    })
    @JoinColumn()
    address?: Address

    @ManyToOne(()=> Role, (role)=> role.users)
    role!: Role
    
    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations!: Reservation[]; 
    

    constructor(name: string, lastName: string, email: string, cellphone: string, password: string, photo?: string, address?: Address){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.cellphone = cellphone;
        this.password = password;
        this.photo = photo;
        this.address = address;
    }
}
