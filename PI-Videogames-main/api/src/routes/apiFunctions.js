// API functions to be exported to index:
require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Genre } = require('../db');

// Get all videogames from API:
const getVideogamesApi = async () => {
  let videoGames = [],
    page = 1;
  const totalPages = 7; // total of 120 games (20 games per page). For spare space in pagination, so i have room to create more games in the future. //! Set in 2 for developing purposes.

  while (page < totalPages) {
    const apiResponse = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${page}`
    );
    videoGames = videoGames.concat(apiResponse.data.results);
    page++;
  }

  const videoGamesApi = videoGames.map((game) => {
    return {
      id: game.id,
      image: game.background_image,
      name: game.name,
      genre: game.genres.map((element) => element.name).join(', '),
      rating: game.rating,
      platforms: game.platforms.map((element) => element.platform.name),
    };
  });
  return videoGamesApi;
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
        image: game.background_image,
        name: game.name,
        genre: game.genres.map((element) => element.name).join(', '),
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
    description: apiResponse.data.description
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/&#39;/g, ''),
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
