import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_10laspEi2ZEXyFSRfFD07NZz9OTBXVKyVqqQZteg9qtiBurGmGC2Kmf7DRzcq1fY';

export function fetchBreeds() {
  document.querySelector('.breed-select').style.display = 'none';
  document.querySelector('.cat-info').style.display = 'none';
  document.querySelector('.loader').style.display = 'block';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      document.querySelector('.loader').style.display = 'none';
      const breeds = response.data;
      const breedSelect = document.querySelector('.breed-select');
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
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.error').style.display = 'block';
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  document.querySelector('.cat-info').style.display = 'none';
  document.querySelector('.loader').style.display = 'block';

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      document.querySelector('.loader').style.display = 'none';
      const catInfo = response.data[0];
      const catImage = document.querySelector('.cat-image');
      const catName = document.querySelector('.cat-name');
      const catDescription = document.querySelector('.cat-description');
      const catTemperament = document.querySelector('.cat-temperament');
      catImage.src = catInfo.url;
      catName.textContent = catInfo.breeds[0].name;
      catDescription.textContent = catInfo.breeds[0].description;
      catTemperament.textContent = catInfo.breeds[0].temperament;
      document.querySelector('.cat-info').style.display = 'block';

      return catInfo;
    })
    .catch(error => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.error').style.display = 'block';
      throw error;
    });
}
