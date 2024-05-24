import { createMarkupItem } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.js-search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const loaderEl = document.querySelector('.js-loader');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;
let lightbox = new SimpleLightbox('.js-gallery a');
let totalHits = 0;

async function onSearchFormSubmit(event) {
  event.preventDefault();
  currentQuery = event.target.elements.searchKeyword.value.trim();

  if (currentQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    iziToast.error({
      title: 'Error',
      message: 'Illegal operation',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }
  currentPage = 1;
  totalHits = 0;
  galleryEl.innerHTML = '';
  loadMoreBtnEl.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');

  try {
    const imagesData = await fetchPhotosByQuery(
      currentQuery,
      currentPage,
      perPage
    );
    totalHits = imagesData.totalHits;
    if (totalHits === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
    } else {
      galleryEl.innerHTML = createMarkupItem(imagesData.hits);
      lightbox.refresh();
      if (
        imagesData.hits.length < perPage ||
        totalHits <= currentPage * perPage
      ) {
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 2000,
          color: 'red',
        });
        loadMoreBtnEl.classList.add('is-hidden');
      } else {
        loadMoreBtnEl.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    event.target.reset();
    loaderEl.classList.add('is-hidden');
  }
}

async function onLoadMoreClick() {
  currentPage += 1;
  loaderEl.classList.remove('is-hidden');
  loadMoreBtnEl.classList.add('is-hidden');

  try {
    const imagesData = await fetchPhotosByQuery(
      currentQuery,
      currentPage,
      perPage
    );

    const newMarkup = createMarkupItem(imagesData.hits);
    galleryEl.insertAdjacentHTML('beforeend', newMarkup);
    lightbox.refresh();
    loadMoreBtnEl.classList.remove('is-hidden');

    if (imagesData.hits.length === 0 || totalHits <= currentPage * perPage) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
      loadMoreBtnEl.classList.add('is-hidden');
    }

    // Scroll page to the new images
    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
