import Book from "../../database/models/Book";

export class AuthorSearchStrategy {
    search (querry: string, book: Book[]): Book[]{
        return book.filter(book => book.author.toLowerCase().includes(querry.toLowerCase()));    
    }
}