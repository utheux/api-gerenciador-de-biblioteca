import Book from "../../database/models/Book";

export default interface InterfaceBookRepository {
    createBook(book: Book): Promise<void>;

    bookList(): Promise<Book[]>;

    updateBook(id: number, newBook: Book): Promise<{success: boolean; message?: string}>;

    deleteBook(id: number): Promise<{success: boolean; message?: string}>;

    
}