// cat-api.js
import axios from 'axios';

const apiKey =
  'live_eTgm5gBQRpLXUYOrde2P3AlGPBuh1gPZqeTkPuv5A9C9WHocz2GIv2lehcU714mt';

axios.defaults.headers.common['x-api-key'] =
  'live_eTgm5gBQRpLXUYOrde2P3AlGPBuh1gPZqeTkPuv5A9C9WHocz2GIv2lehcU714mt';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching breeds');
  }
};

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0]; // Assuming you only want the first cat from the response
  } catch (error) {
    throw new Error('Error fetching cat information');
  }
};
