import { Repository } from "typeorm";
import Book from "../database/models/Book";
import InterfaceBookRepository from "./interfaces/InterfaceBookRepository";


export default class BookRepository implements InterfaceBookRepository{
    private bookRepository;

    constructor(bookRepository: Repository<Book>){
        this.bookRepository = bookRepository;
    }

    async createBook(book: Book){
        await this.bookRepository.save(book);
    }

    async bookList(): Promise<Book[]>{
        const bookList = await this.bookRepository.find();
        return bookList;
    }

    async updateBook(id: number, newBook: Book): Promise<{ success: boolean; message?: string; }> {
        try {
            const bookToUpdate = await this.bookRepository.findOne({where: {id}});
            if(!bookToUpdate){
                return {
                    success: false,
                    message: "book does not exist in the system"
                };
            }

            Object.assign(bookToUpdate, newBook);
            await this.bookRepository.save(bookToUpdate);
            return {success: true};
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "There was an error updating book"
            }
            
        }
    }
    async deleteBook(id: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const bookToDelete = await this.bookRepository.findOne({where: {id}});
            if(!bookToDelete) {
                return {
                    success: false,
                    message: "book does not exist in the system"
                };
            }
            await this.bookRepository.remove(bookToDelete);

            return {success: true};
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "There was an error deleting book"
            };         
        }
        
    }

}