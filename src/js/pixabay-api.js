import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43896740-362a21d10e9d41ec216c05f15';

export const fetchPhotosByQuery = async (query, page = 1, perPage = 15) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    // if (response.status !== 200) {
    //   throw new Error(response.statusText);
    // }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
