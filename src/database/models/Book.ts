import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Reservation from "./Reservation";

@Entity('books')
export default class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    author: string

    @Column()
    status: boolean;

    @ManyToOne(() => Reservation, (reservation) => reservation.books)
    reservation!: Reservation;

    constructor(name: string, description: string, author: string){
        this.name = name;
        this.description = description;
        this.status = true;
        this.author = author;
    }

}