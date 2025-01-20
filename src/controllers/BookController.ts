import Book from "../database/models/Book";
import BookNotifier from "../observer/BookNotifier";
import BookRepository from "../repositories/BookRepository";
import { Request, Response } from "express";

export default class BookController {
    private bookRepository;
    private notifier:BookNotifier;

    constructor(bookRepository: BookRepository, notifier: BookNotifier){
        this.bookRepository = bookRepository;
        this.notifier = notifier;
    }

    async createBook(req: Request, res: Response){
        const {name, description, author} = req.body;
        const newBook = new Book(name, description, author);

        try {
            await this.bookRepository.createBook(newBook);
            await this.notifier.notify("BookCreated", newBook);
            return res.status(201).json({id: newBook.id, name, description});           
        } catch (error) {
            return res.status(500).json({message: error});
        }


    }

    async bookList(req: Request, res: Response){
        try {
            const bookList = await this.bookRepository.bookList();
    
            return res.status(200).json(bookList);
            
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async updateBook(req: Request, res: Response){
        const {bookId} = req.params;
        const newBook = req.body as Book;
        const {success, message} = await this.bookRepository.updateBook(Number(bookId), newBook);

        if(!success){
            return res.status(404).json({message: message});
        }

        return res.sendStatus(204)
    }

    async deleteBook(req: Request, res: Response){
        const {bookId} = req.params;
        
        const {success, message} = await this.bookRepository.deleteBook(Number(bookId));

        if(!success){
            return res.status(404).json({message: message});
        }

        return res.sendStatus(204);
    }



    
}