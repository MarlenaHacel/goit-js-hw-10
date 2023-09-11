import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_10laspEi2ZEXyFSRfFD07NZz9OTBXVKyVqqQZteg9qtiBurGmGC2Kmf7DRzcq1fY';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

export function fetchBreeds() {
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
  loader.style.display = 'block';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      loader.style.display = 'none';
      const breeds = response.data;
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      breedSelect.style.display = 'block';

      return breeds;
    })
    .catch(error => {
      loader.style.display = 'none';
      error.style.display = 'block';
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  catInfo.style.display = 'none';
  loader.style.display = 'block';

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      loader.style.display = 'none';
      const catInfo = response.data[0];
      const catData = {
        url: catInfo.url,
        name: catInfo.breeds[0].name,
        description: catInfo.breeds[0].description,
        temperament: catInfo.breeds[0].temperament,
      };

      // Zwracamy dane kota zamiast aktualizować nieistniejące elementy
      return catData;
    })
    .catch(error => {
      loader.style.display = 'none';
      error.style.display = 'block';
      throw error;
    });
}
