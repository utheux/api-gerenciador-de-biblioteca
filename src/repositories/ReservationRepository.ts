import { Repository } from "typeorm";
import User from "../database/models/User";
import Reservation from "../database/models/Reservation";
import Book from "../database/models/Book";
import InterfaceReservationRepository from "./interfaces/InterfaceReservationRepository";


export default class ReservationRepository implements InterfaceReservationRepository {
    private userRepository;
    private bookRepository;
    private reservationRepository;

    constructor(userRepository: Repository<User>, bookRepository: Repository<Book>, reservationRepository: Repository<Reservation>){
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.reservationRepository = reservationRepository;
    }

    async createReservation(userId: number, bookId: number, date: Date): Promise<{ success: boolean; message?: string; reservation?: Reservation}>{
        const book = await this.bookRepository.findOne({where: {id: bookId}});

        if (!book) {
            return {success: false, message: "Book not found"};
        }

        book.status = false;

        const user = await this.userRepository.findOne({where: {id: userId}});

        console.log(book)

        if(!user) {
            return {success: false, message: "User not found"};
        }

        const reservation = new Reservation(date)

        console.log(user);

        if (!reservation.books) {
            reservation.books = [];
        }

        reservation.books.push(book);
        reservation.user = user;

        await this.reservationRepository.save(reservation);

        return {success: true, message: "Reservation Created", reservation}
    }

    async listReversation(userId: number): Promise<{ success: boolean; message?: string; reservations?: Reservation[]}> {
        const user = await this.userRepository.findOne({where: {id: userId}});

        if(!user) {
            return {success: false, message: "User not found"};
        }

        const reservations =  await this.reservationRepository.find({where: {user}});

        return {success: true, reservations}

    }

    async updateReservation(id: number, date: Date): Promise<{ success: boolean; message?: string; reservation?: Reservation}> {
        const reservation = await this.reservationRepository.findOne({where: {id}});

        if(!reservation) {
            return {success: false, message: "Reservation not found!"};
        }

        reservation.reservationDate = date;

        this.reservationRepository.save(reservation);

        return {success: true, message: "Reservation updated"};


    }

    async deleteReservation(id: number, userId: number): Promise<{success: boolean; message?: string}> {
        
        const user = await this.userRepository.findOne({where: {id: userId}});
        
        if(!user) {
            return {success: false, message: "User not found"};
        }

        const reservations = await this.reservationRepository.find({ where: { user: { id: userId } } });

        console.log(reservations);

        const reservation = reservations.find((user) => user.id === id);

        console.log(reservation)

        if(!reservation){
            return {success: false, message: "Reservation not found!"};
        }
        

        await this.reservationRepository.remove(reservation);

        return {success: true};
    }
}