const books = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310 },
  { title: "Harry Potter", author: "J.K. Rowling", pages: 450 },
  { title: "1984", author: "George Orwell", pages: 328 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 277 },
  { title: "Animal Farm", author: "George Orwell", pages: 144 },
];

function getBookTitles(books) {
  return books.map((book) => book.title);
}

const getBooksByAuthor = function (books, author) {
  return books.filter((book) => {
    return book.author === author;
    
  });
};

const getTotalPages = (books) =>
  books.reduce((total, book) => total + book.pages, 0);

console.log("Book Titles:", getBookTitles(books));
console.log(
  "Books by George Orwell:",
  getBooksByAuthor(books, "George Orwell")
);
console.log("Total Pages:", getTotalPages(books));
