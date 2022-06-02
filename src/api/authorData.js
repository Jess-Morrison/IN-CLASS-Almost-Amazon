import axios from 'axios';
// import { showBooks } from '../scripts/components/pages/books';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  // axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
  axios.get(`${dbUrl}/authors.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// FIXME: CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = {
        firebaseKey: response.data
          .name
      };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(() => {
          getAuthors(authorObj.uid).then(resolve);
        });
    }).catch(reject);
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
const deleteSingleAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors(uid).then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (authObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authObj.firebaseKey}.json`, authObj, uid)
    .then(() => getAuthors().then(resolve))
    .catch(reject);
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
// eslint-disable-next-line camelcase
const getAuthorBooks = (author_id) => new Promise((resolve, reject) => {
  // eslint-disable-next-line camelcase
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${author_id}"`)
    .then((response) => resolve(Object.values(response.data)))
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
