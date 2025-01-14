angular.module("LivrariaApp", [])
    .controller("LivrariaController", function ($http) {
        var livraria = this;

        livraria.books = [];
        livraria.newBook = {};
        livraria.pesq = "";
        livraria.editingIndex = null;

        // Função para carregar os livros da API
        livraria.loadBooks = function () {
            $http.get("http://localhost:3000/books")
                .then(function (response) {
                    livraria.books = response.data;
                })
                .catch(function (error) {
                    console.error("Erro ao carregar os livros:", error);
                });
        };

        // Função para adicionar livro
        livraria.addBook = function () {
            if (livraria.pesq !== "") {
                const requestData = { pesq: livraria.pesq };
                $http.post("http://localhost:3000/books", requestData)
                    .then(function (response) {
                        livraria.books.push(response.data); 
                        livraria.newBook = {};
                        livraria.pesq = "";
                    })
                    .catch(function (error) {
                        console.error("Erro ao adicionar o livro:", error);
                    });
            }
        };

        // Função para remover livro
        livraria.removeBook = function (bookId, index) {
            $http.delete(`http://localhost:3000/books/${bookId}`)
                .then(function () {
                    livraria.books.splice(index, 1); 
                })
                .catch(function (error) {
                    console.error("Erro ao remover o livro:", error);
                });
        };

        // Função para editar livro
        livraria.editBook = function (index) {
            livraria.newBook = angular.copy(livraria.books[index]);
            livraria.editingIndex = index;
        };

        // Função para salvar edição
        livraria.saveEdit = function () {
            if (livraria.editingIndex != null) {
                const bookId = livraria.books[livraria.editingIndex]._id;
                $http.put(`http://localhost:3000/books/${bookId}`, livraria.newBook)
                    .then(function (response) {
                        livraria.books[livraria.editingIndex] = response.data; 
                        livraria.newBook = {};
                        livraria.editingIndex = null;
                    })
                    .catch(function (error) {
                        console.error("Erro ao salvar a edição do livro:", error);
                    });
            }
        };

        // Carrega os livros ao iniciar
        livraria.loadBooks();
    });
