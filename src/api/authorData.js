import axios from 'axios';
import firebaseConfig from './apiKeys';

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

// FIXME: GET SINGLE AUTHOR
// const getSingleAuthor = () => new Promise ((resolve, reject) => {
//  axios.get(`${dbUrl}/authors.json${firebaseKey}`)
//   .then((response) => resolve(Object.values(response.data)))
//   .catch((error) => reject(error));
// });

// FIXME: DELETE AUTHOR
// const deleteSingleAuthor = () => new Promise ((resolve, reject) =>{
// });

// FIXME: UPDATE AUTHOR
const updateAuthor = () => {};

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = () => {};

export {
  getAuthors,
  createAuthor,
  // getSingleAuthor,
  // deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
};
