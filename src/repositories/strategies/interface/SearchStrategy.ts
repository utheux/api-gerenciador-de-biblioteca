import Book from "../../../database/models/Book";

export interface SearchStrategy {
    search(querry: string, books: Book[]): Book[];
}