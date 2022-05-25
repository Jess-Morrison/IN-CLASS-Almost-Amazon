import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import { getAuthors } from '../../api/authorData';
import { showAuthors } from '../components/pages/authors';

const startApp = () => {
  domBuilder(); // BUILD THE DOM
  domEvents(); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // TODO: Put all books on the DOM on App load
  getAuthors().then((authorArray) => showAuthors(authorArray));
  getBooks().then((booksArray) => showBooks(booksArray));
};

export default startApp;
