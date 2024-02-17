import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  const error = document.querySelector('.error');

  try {
    // Fetch breeds
    loader.classList.add('loader--spinning-circles'); // Add the loader class
    loader.style.display = 'block';
    breedSelect.style.display = 'none';

    const breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    // Initialize SlimSelect
    const slimSelect = new SlimSelect('.breed-select', {
      placeholder: 'Select a breed',
    });

    loader.style.display = 'none';
    breedSelect.style.display = 'block';

    // Handle breed selection
    breedSelect.addEventListener('change', async () => {
      const selectedBreedId = breedSelect.value;
      loader.style.display = 'block';
      catInfo.style.display = 'none';
      error.style.display = 'none';

      try {
        const catData = await fetchCatByBreed(selectedBreedId);

        // Display cat information
        const img = document.createElement('img');
        img.src = catData.url;
        catInfo.innerHTML = `
          <p>Breed: ${catData.breeds[0].name}</p>
          <p>Description: ${catData.breeds[0].description}</p>
          <p>Temperament: ${catData.breeds[0].temperament}</p>
        `;
        catInfo.appendChild(img);

        catInfo.style.display = 'block';
      } catch (error) {
        console.error(error.message);
        Notiflix.Report.Failure(
          'Error',
          'Failed to fetch cat information',
          'OK'
        );
      } finally {
        loader.style.display = 'none';
      }
    });
  } catch (error) {
    console.error(error.message);
    Notiflix.Report.Failure('Error', 'Failed to fetch breeds', 'OK');
    loader.style.display = 'none';
  }
});
