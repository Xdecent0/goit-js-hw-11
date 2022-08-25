import axios from 'axios';
import SimpleLightbox from 'simplelightbox';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29459076-7b0904589e5cd507ddf684d97';

export default class imagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = 'true';
    this.per_page = 40;
  }

  async getImages() {
    const images = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`
    );

    this.totalHits = images.data.totalHits;

    return images;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  createGallery() {
    this.gallery = new SimpleLightbox('.gallery a');
  }

  updateGallery() {
    this.gallery.refresh();
  }
}
