//TODO : 1) make function for building game to be used by all api functions instead of repeating itself.
// API functions to be exported to index:
require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Genre, Videogame } = require('../db');

// Get all videogames from API:
const getVideogamesApi = async () => {
  const apiResponse = await axios.get(
    `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=100`
  );

  const videoGames = apiResponse.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      genre: game.genres.map((element) => element.name),
    };
  });
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
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((platform) => platform.platform.name),
        image: game.background_image,
        genre: game.genres.map((element) => element.name),
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
    id: apiResponse.data.id,
    name: apiResponse.data.name,
    description: apiResponse.data.description,
    released: apiResponse.data.released,
    rating: apiResponse.data.rating,
    platforms: apiResponse.data.platforms.map(
      (element) => element.platform.name
    ),
    image: apiResponse.data.background_image,
    genre: apiResponse.data.genres.map((element) => element.name),
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
