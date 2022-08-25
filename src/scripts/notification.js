import Notiflix from 'notiflix';

export function notFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function endOfResult() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

export function imagesCount(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
