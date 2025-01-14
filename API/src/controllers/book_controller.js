import * as bookService from '../services/book_service.js';


export const getAllBooks = async (req, reply) => {
    const books = await bookService.getAllBooks();
    reply.send(books);
};

export const createBook = async (req, reply) => {
    try {
        const book = await bookService.createBook(req.body);
        reply.status(201).send(book);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
};

export const updateBook = async (req, reply) => {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) {
        return reply.status(404).send({ message: 'Livro não encontrado' });
    }
    reply.send(book);
};

export const deleteBook = async (req, reply) => {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) {
        return reply.status(404).send({ message: 'Livro não encontrado' });
    }
    reply.send({ message: 'Livro removido com sucesso' });
};
