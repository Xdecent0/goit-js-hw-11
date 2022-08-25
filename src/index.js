import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesAPIService from './scripts/photo.js';
import {
  imagesMarkup,
  hideLoadMoreBtn,
  showLoadMoreBtn,
} from './scripts/markup.js';
import * as notification from './scripts/notification.js';

const PER_PAGE = 40;
const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreButton: document.querySelector('.load-more'),
  imagesContainer: document.querySelector('.gallery'),
};

hideLoadMoreBtn();

const imagesAPIService = new ImagesAPIService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  hideLoadMoreBtn();
  imagesAPIService.query = event.currentTarget.elements.searchQuery.value;
  imagesAPIService.resetPage();
  if (imagesAPIService.query === '' || imagesAPIService.query === ' ') {
    // Notiflix.Notify.info('Enter your query to search images.');
    renderImages('');
    return;
  }
  imagesAPIService
    .getImages()
    .then(imagesMarkup)
    .then(renderImages)
    .then(onFound);
  imagesAPIService.incrementPage();
}

function onLoadMore(event) {
  imagesAPIService.getImages().then(imagesMarkup).then(renderMoreImages);
  imagesAPIService.incrementPage();
}

function renderImages(markup) {
  refs.imagesContainer.innerHTML = markup;
  imagesAPIService.createGallery();
  return imagesAPIService.totalHits;
}

function renderMoreImages(markup) {
  if (imagesAPIService.totalHits <= PER_PAGE * (imagesAPIService.page - 1)) {
    hideLoadMoreBtn();
    notification.endOfResult();
  }
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
  imagesAPIService.updateGallery();
}

function onFound(total) {
  if (total > 0) {
    notification.imagesCount(total);
  }
  if (total > PER_PAGE && imagesAPIService.page > 1) {
    showLoadMoreBtn();
  }
}
