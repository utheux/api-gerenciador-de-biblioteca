import Book from "../../database/models/Book";


export class TitleSearchStrategy {
    search(querry: string, books: Book[]): Book[] {
        return books.filter(book => book.name.toLowerCase().includes(querry.toLowerCase()));
    }
}