import { deleteSingleAuthor, favAuthors } from '../../api/authorData';
import { deleteBook } from '../../api/bookData';
import { viewAuthorDetails, viewBookDetails } from '../../api/mergedData';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';
import viewAuth from '../components/pages/viewAuthors';
import viewBook from '../components/pages/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey.uid).then((booksArray) => showBooks(booksArray));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      addBookForm(firebaseKey).then((newBook) => showBooks(newBook));
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('EDIT BOOK', e.target.id);
      console.warn(e.target.id.split('--'));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then((bookAuthObj) => viewBook(bookAuthObj));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteSingleAuthor(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
      }
    }
    // Viewing Author event
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((authBookObj) => viewAuth(authBookObj));
    }
    // Fav Author
    if (e.target.id.includes('fav-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      favAuthors(firebaseKey).then((authorArray) => showAuthors(authorArray));
      console.warn(firebaseKey);
      favAuthors.favorite = !favAuthors.favorite;
    }
    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
