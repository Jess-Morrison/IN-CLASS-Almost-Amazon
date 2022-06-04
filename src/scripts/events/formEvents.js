import { createAuthor, getSingleAuthor, updateAuthor } from '../../api/authorData';
import { createBook, getSingleBook, updateBook } from '../../api/bookData';
import { showAuthors } from '../components/pages/authors';

import { showBooks } from '../components/pages/books';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const bookInput = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author: document.querySelector('#author_id').value,
        uid
      };
      // const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      createBook(bookInput, uid).then((booksArray) => showBooks(booksArray));
    }

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      getSingleBook().then(() => {
        const [, firebaseKey] = e.target.id.split('--');
        const bookInput = {
          title: document.querySelector('#title').value,
          description: document.querySelector('#description').value,
          image: document.querySelector('#image').value,
          price: document.querySelector('#price').value,
          sale: document.querySelector('#sale').checked,
          author: document.querySelector('#author_id').value,
          firebaseKey,
          uid
        };
        console.warn('CLICKED Update BOOK', e.target.id);
        updateBook(bookInput, uid).then((submitBook) => showBooks(submitBook));
      });
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR');
      const authorInput = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        favorite: document.querySelector('#favorite').checked,
        uid
      };
      createAuthor(authorInput, uid).then((submitAuthor) => showAuthors(submitAuthor));
    }

    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      getSingleAuthor().then(() => {
        const [, firebaseKey] = e.target.id.split('--');
        const authorInput = {
          email: document.querySelector('#email').value,
          first_name: document.querySelector('#first_name').value,
          last_name: document.querySelector('#last_name').value,
          favorite: document.querySelector('#favorite').checked,
          uid,
          firebaseKey
        };
        updateAuthor(authorInput, uid).then(showAuthors);
      });
    }
  });
};

export default formEvents;
