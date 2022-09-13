//TODO : 1) make function for building game to be used by all api functions instead of repeating itself.
// API functions to be exported to index:
require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Genre } = require('../db');

// Get all videogames from API:
const getVideogamesApi = async () => {
  let videoGames = [];
  const apiResponse = await axios.get(
    `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
  );
  for (let i = 0; videoGames.length < 100; i++) {
    games = apiResponse.data.results.map((game) => {
      return {
        image: game.background_image,
        name: game.name,
        genre: game.genres.map((element) => element.name).join(', '),
      };
    });
    videoGames = [...videoGames, ...games];
  }
  return videoGames;
};

// Get videogames from API by name by query:
const getVideogamesByNameApi = async (name) => {
  const apiResponse = await axios.get(
    `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`
  );

  const videoGames = apiResponse.data.results
    .map((game) => {
      return {
        image: game.background_image,
        name: game.name,
        genre: game.genres.map((element) => element.name).join(', '),
        description: game.description, //First 100 games do not have description. I have requested it anyway.
        released: game.released.replace(/-/g, '/'),
        rating: game.rating,
        platforms: game.platforms
          .map((platform) => platform.platform.name)
          .join(', '),
      };
    })
    .slice(0, 15);
  return videoGames;
};

// Get videogames from API by ID:
const getVideogamesByIdApi = async (id) => {
  const apiResponse = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
  );

  const videoGame = {
    image: apiResponse.data.background_image,
    name: apiResponse.data.name,
    genre: apiResponse.data.genres.map((element) => element.name).join(', '),
    description: apiResponse.data.description,
    released: apiResponse.data.released.replace(/-/g, '/'),
    rating: apiResponse.data.rating,
    platforms: apiResponse.data.platforms
      .map((element) => element.platform.name)
      .join(`, `),
  };
  return videoGame;
};

// Get all genres from API and save in DB:
const getGenresApi = async () => {
  const apiResponse = await axios.get(
    `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
  );

  const videoGamesGenres = apiResponse.data.results;

  videoGamesGenres.forEach(async (genre) => {
    await Genre.findOrCreate({
      where: {
        name: genre.name,
      },
    });
  });
};

module.exports = {
  getVideogamesApi,
  getVideogamesByNameApi,
  getVideogamesByIdApi,
  getGenresApi,
};
