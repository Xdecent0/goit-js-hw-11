import * as notification from './notification.js';

export const hideLoadMoreBtn = function () {
  document.querySelector('.load-more').classList.add('is-hidden');
};

export const showLoadMoreBtn = function () {
  document.querySelector('.load-more').classList.remove('is-hidden');
};

export const imagesMarkup = function (images) {
  let markup = '';

  if (images.data.hits.length === 0) {
    notification.endOfResult();
    hideLoadMoreBtn();
    return markup;
  }

  images.data.hits
    .map(
      image =>
        (markup += ` <div class="photo-card">
        <a href="${image.largeImageURL}">
           <img class="img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="250" height="150"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${image.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${image.downloads}
      </p>
    </div></a>
  </div>`)
    )
    .join(' ');
  return markup;
};
