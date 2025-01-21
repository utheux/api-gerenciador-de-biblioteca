import Book from "../../database/models/Book";
import { SearchStrategy } from "./interface/SearchStrategy";


export class TitleSearchStrategy implements SearchStrategy{
    search(querry: string, books: Book[]): Book[] {
        return books.filter(book => book.name.toLowerCase().includes(querry.toLowerCase()));
    }
}