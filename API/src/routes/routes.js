import { createBook, deleteBook, getAllBooks, updateBook } from "../controllers/book_controller.js";

function bookRoutes(server){
    server.get('/books', getAllBooks);
    server.post('/books', createBook);
    server.put('/books/:id', updateBook);
    server.delete('/books/:id', deleteBook);
}

export default bookRoutes;