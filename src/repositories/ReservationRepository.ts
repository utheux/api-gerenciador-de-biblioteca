import { Repository } from "typeorm";
import User from "../database/models/User";
import Reservation from "../database/models/Reservation";
import Book from "../database/models/Book";


export default class ReservationRepository {
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
}