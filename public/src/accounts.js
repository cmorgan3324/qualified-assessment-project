function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    for (let i = 0; i < book.borrows.length; i++) {
      if (account.id === book.borrows[i].id) {
        total++;
      }
    }
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = [];

  books.forEach((book) => {
    const borrow = book.borrows[0];
    if (borrow.id === account.id && !borrow.returned) {
      const bookWithAuthor = { ...book };
      const author = authors.find((author) => author.id === book.authorId);
      bookWithAuthor.author = author;
      result.push(bookWithAuthor);
    }
  });

  return result;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
