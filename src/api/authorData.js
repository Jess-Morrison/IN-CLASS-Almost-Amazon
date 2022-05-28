import axios from 'axios';
// import { showBooks } from '../scripts/components/pages/books';
import firebaseConfig from './apiKeys';
import { getBooks } from './bookData';

const dbUrl = firebaseConfig.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// FIXME: CREATE AUTHOR
const createAuthor = () => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// Favorite Author
// const favAuthors = (firebaseKey) => new Promise((resolve, reject) => {
//   axios.get(`{dbUrl}/authors/ ${firebaseKey}.json`)
//     .then(() => {
//       getAuthors().then((authorArray) => resolve(authorArray));
//     })
//     .catch((error) => reject(error));
// });

const favAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors().then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE AUTHOR
const updateAuthor = () => {};

// TODO: GET A SINGLE AUTHOR'S BOOKS
// eslint-disable-next-line camelcase
const getAuthorBooks = (author_id) => new Promise((resolve, reject) => {
  // eslint-disable-next-line camelcase
  axios.get(`${dbUrl}/books/${author_id}.json`)
    .then(() => {
      getBooks().then((authorBooks) => resolve(authorBooks));
    })
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  favAuthors,
  updateAuthor,
  getAuthorBooks,
};
