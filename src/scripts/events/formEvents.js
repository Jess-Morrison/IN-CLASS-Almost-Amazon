import { createBook, getSingleBook, updateBook } from '../../api/bookData';

import { showBooks } from '../components/pages/books';

const formEvents = () => {
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
      };
      // const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      createBook(bookInput).then((submitBook) => showBooks(submitBook));
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
          firebaseKey
        };
        console.warn('CLICKED Update BOOK', e.target.id);
        updateBook(bookInput).then((submitBook) => showBooks(submitBook));
      });
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR');
    }
    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default formEvents;
