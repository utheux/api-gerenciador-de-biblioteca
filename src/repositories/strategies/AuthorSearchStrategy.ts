import Book from "../../database/models/Book";
import { SearchStrategy } from "./interface/SearchStrategy";

export class AuthorSearchStrategy implements SearchStrategy {
    search (querry: string, book: Book[]): Book[]{
        return book.filter(book => book.author.toLowerCase().includes(querry.toLowerCase()));    
    }
}