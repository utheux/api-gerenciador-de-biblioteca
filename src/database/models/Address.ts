import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('addresses')
export default class Address{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    constructor(city: string, state: string, street: string, number: string, neighborhood: string){
        this.city = city;
        this.state = state;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
    }

}