import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(data => {
      const catImage = document.createElement('img');
      catImage.classList.add('cat-image');
      catImage = data.url;
      const catName = document.createElement('h2');
      catName.textContent = data.breeds[0].name;

      const catDescription = document.createElement('p');
      catDescription.textContent = data.breeds[0].description;

      const catTemperament = document.createElement('h3');
      catTemperament.textContent = data.breeds[0].temperament;
      const catInfo = document.querySelector('.cat-info');
      catInfo.innerHTML = '';
      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      catInfo.style.display = 'block';
      loader.style.display = 'none';
    })
    .catch(err => {
      error.style.display = 'block';
      loader.style.display = 'none';
    });
});

fetchBreeds()
  .then(breeds => {
    breedSelect.innerHTML = breeds
      .map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      })
      .join('');
  })
  .catch(err => {
    error.style.display = 'block';
    loader.style.display = 'none';
  });
