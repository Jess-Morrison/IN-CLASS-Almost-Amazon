import { getSingleAuthor } from '../../api/authorData';
import { deleteBook, getSingleBook } from '../../api/bookData';
import { deleteAuthBooks, viewAuthorDetails, viewBookDetails } from '../../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
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
        const [firebaseKey, uid] = e.target.id.split('--');
        deleteBook(firebaseKey, uid).then((booksArray) => showBooks(booksArray));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      const [firebaseKey, uid] = e.target.id.split('--');
      addBookForm(firebaseKey, uid).then(showBooks);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('EDIT BOOK', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then(addBookForm);
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
        deleteAuthBooks(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
      }
    }
    // Viewing Author event
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((authBook) => viewAuth(authBook));
    }
    // Fav Author
    // if (e.target.id.includes('fav-author')) {
    //   const [, firebaseKey] = e.target.id.split('--');
    //   favAuthors(firebaseKey).then((authorArray) => showAuthors(authorArray));
    //   console.warn(firebaseKey);
    //   favAuthors.favorite = !favAuthors.favorite;
    // }
    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
      const [, uid] = e.target.id.split('--');
      addAuthorForm(uid);
      // .then((authorsObject) => showAuthors(authorsObject));
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('EDIT AUTHOR', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then(addAuthorForm);
    }
  });
};

export default domEvents;
