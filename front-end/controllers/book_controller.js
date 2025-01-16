angular.module("LivrariaApp", [])
    .controller("LivrariaController", function ($scope, $http, $window) {

        $scope.books = [];
        $scope.newBook = {};
        $scope.pesq = "";
        $scope.editingIndex = null;

        $scope.loadBooks = function () {
            $http.get("http://localhost:3000/books")
                .then(function (response) {
                    $scope.books = response.data;
                })
                .catch(function (error) {
                    console.error("Erro ao carregar os livros:", error);
                });
        };

        $scope.addBook = function () {
            if ($scope.pesq !== "") {
                const requestData = { pesq: $scope.pesq };
                $http.post("http://localhost:3000/books", requestData)
                    .then(function (response) {
                        $scope.books.push(response.data);
                        $scope.newBook = {};
                        $scope.pesq = "";
                    })
                    .catch(function (error) {
                        console.error("Erro ao adicionar o livro:", error);
                    });
            }
        };

        $scope.removeBook = function (bookId, index) {
            $http.delete(`http://localhost:3000/books/${bookId}`)
                .then(function () {
                    $scope.books.splice(index, 1);
                })
                .catch(function (error) {
                    console.error("Erro ao remover o livro:", error);
                });
        };

        $scope.editBook = function (index) {
            $scope.newBook = angular.copy($scope.books[index]);
            $scope.editingIndex = index;
        };

        $scope.saveEdit = function () {
            if ($scope.editingIndex != null) {
                const bookId = $scope.books[$scope.editingIndex]._id;
                $http.put(`http://localhost:3000/books/${bookId}`, $scope.newBook)
                    .then(function (response) {
                        $scope.books[$scope.editingIndex] = response.data;
                        $scope.newBook = {};
                        $scope.editingIndex = null;
                        $window.location.reload();
                    })
                    .catch(function (error) {
                        console.error("Erro ao salvar a edição do livro:", error);
                    });
            }
        };

        $scope.loadBooks();
    });