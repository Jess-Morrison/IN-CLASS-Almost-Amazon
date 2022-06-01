import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id).then((authorObject) => {
        resolve({ authorObject, ...bookObject });
      });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorsObject) => {
      console.warn(authorsObject);
      getAuthorBooks(authorsObject.firebaseKey).then((authBooks) => {
        // console.warn(authBooks);
        resolve({ authorsObject, authBooks });
      });
    }).catch((error) => reject(error));
});

const deleteAuthBooks = (authorID) => new Promise((resolve, reject) => {
  getAuthorBooks(authorID).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));
    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorID).then((response) => resolve(response));
    });
  }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails, deleteAuthBooks };
