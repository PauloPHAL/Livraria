import axios from "axios";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_BOOKS_API_KEY = process.env.API_KEY_GOOGLE; 

export async function fetchBookFromGoogleBooks(query) {
    try {
        const response = await axios.get(GOOGLE_BOOKS_API_URL, {
            params: {
                q: query,
                maxResults: 1, 
                key: GOOGLE_BOOKS_API_KEY,
            },
        });

        if (response.data.items && response.data.items.length > 0) {
            const bookData = response.data.items[0].volumeInfo;
            return {
                title: bookData.title,
                author: bookData.authors?.join(", ") || "Autor desconhecido",
                year: bookData.publishedDate?.split("-")[0] || "0000",
                genre: bookData.categories?.join(", ") || "Gênero desconhecido",
            };
        } else {
            throw new Error("Nenhum resultado encontrado na API do Google Books");
        }
    } catch (error) {
        console.error("Erro ao buscar livro no Google Books:", error.message);
        throw error;
    }
}
