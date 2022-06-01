import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

// const authorName =first_name.concat(last_name)
const viewAuth = (obj) => {
  clearDom();
  const domString = `
  <div class="text-white ms-5 details">
  <h5>${obj.title} by ${obj.authorObject.first_name} ${obj.authorObject.last_name} ${obj.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
  Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>
    `;

  // if (obj.length) {
  let domStringb = '';
  obj.bookObject.forEach((item) => {
    domStringb += `
        <div class="card">
          <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
          <div class="card-body" style="height: 180px;">
            <h5 class="card-title">${item.title}</h5>
              <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
              <hr>
              <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
              <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
              <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
        </div>`;
  });
  renderToDOM('#view', domString);
  renderToDOM('#store', domStringb);
  // }
};
export default viewAuth;
