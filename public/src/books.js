function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const { borrows } = book;
    const isReturned = borrows[0].returned;

    if (isReturned) {
      returnedBooks.push(book);
    } else {
      borrowedBooks.push(book);
    }
  }

  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrowed) => {
    const account = accounts.find((acc) => acc.id === borrowed.id);
    return { ...account, returned: borrowed.returned };
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
