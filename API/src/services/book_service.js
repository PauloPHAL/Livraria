import Book from "../models/Book.js";
import { fetchBookFromGoogleBooks } from "./google_service.js";

export async function getAllBooks() {
    return await Book.find();
}

export async function createBook(pesq) {
    try {
        const book = await fetchBookFromGoogleBooks(pesq.pesq);

        return await Book.create({
            title: book.title,
            author: book.author,
            year: book.year,
            genre: book.genre
        });
    } catch (error) {
        throw new Error("Erro ao criar livro: " + error.message);
    }
}

export async function updateBook(id, book) {
    return await Book.findByIdAndUpdate(id, {
        title: book.title,
        author: book.author,
        year: book.year,
        genre: book.genre
    });
}

export async function deleteBook(id) {
    return await Book.findByIdAndDelete(id);
}