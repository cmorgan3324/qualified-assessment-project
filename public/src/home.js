function getTotalBooksCount(books) {
  return books.reduce((total, book) => {
    if (book) {
      total++;
    }
    return total;
  }, 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((total, account) => {
    if (account) {
      total++;
    }
    return total;
  }, 0);
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    if (book.borrows[0].returned === false) {
      total++;
    }
    return total;
  }, 0);
}

function sortTopFive(arr) {
  return arr
    .sort((a, b) => {
      return b.count - a.count;
    })
    .slice(0, 5);
}

function getMostCommonGenres(books) {
  const genreCounts = {}; // {genre: 1, genre2: 1, ...}

  for (let i = 0; i < books.length; i++) {
    const genre = books[i].genre;
    if (genreCounts[genre]) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  }

  const sortedGenres = []; // [{name: genre, count: genreCounts[genre]}]
  for (let genre in genreCounts) {
    sortedGenres.push({ name: genre, count: genreCounts[genre] });
  }

  return sortTopFive(sortedGenres);
}
// sortedGenres.sort(function (a, b) {
//   return b.count - a.count;
// });
// return sortedGenres.slice(0, 5);

function getMostPopularBooks(books) {
  const borrowCounts = {};

  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;
    borrowCounts[books[i].title] = borrows.length;
  }

  const sortedBooks = [];
  for (let book in borrowCounts) {
    sortedBooks.push({ name: book, count: borrowCounts[book] });
  }

  return sortTopFive(sortedBooks);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const author = authors.find((author) => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;

    if (!authorBorrowCounts.hasOwnProperty(authorName)) {
      authorBorrowCounts[authorName] = book.borrows.length;
    } else {
      authorBorrowCounts[authorName] += book.borrows.length;
    }
  }

  const sortedAuthors = [];
  for (let authorName in authorBorrowCounts) {
    sortedAuthors.push({
      name: authorName,
      count: authorBorrowCounts[authorName],
    });
  }

  return sortTopFive(sortedAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
