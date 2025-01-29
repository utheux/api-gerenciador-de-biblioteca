import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Book from "./Book";

@Entity("reservations")
export default class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.reservations)
    user!: User;

    // Relação um para muitos (uma reserva pode ter vários livros)
    @OneToMany(() => Book, (book) => book.reservation)
    books!: Book[];

    @Column()
    reservationDate: Date; 

    constructor(reservationDate: Date) {
        this.reservationDate = reservationDate;

    }
    
}