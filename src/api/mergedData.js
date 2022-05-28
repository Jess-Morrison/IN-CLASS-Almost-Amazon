import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getBooks, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id).then((authorObject) => {
        resolve({ authorObject, ...bookObject });
      });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(authorFirebaseKey)
    .then((authorObject) => {
      getBooks(authorObject.author_id)
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject });
        });
    }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails };
