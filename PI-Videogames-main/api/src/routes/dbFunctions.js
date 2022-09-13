const { Genre, Videogame } = require('../db');
const { Op } = require('sequelize');

// Get all videogames from db:
const getVideogamesDb = async () => {
  const videogames = await Videogame.findAll({
    attributes: {
      exclude: [
        'id',
        'createdByUser',
        'released',
        'platforms',
        'description',
        'rating',
      ],
    },
    include: {
      model: Genre, // to include genre.name from model genre
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  const finalVideogames = videogames.map((game) => {
    return {
      image: game.image,
      name: game.name,
      genres: game.genres.map((g) => g.name).join(', '),
    };
  });
  return finalVideogames;
};

// Get videogames from db by ID:
const getVideogamesByIdDb = async (id) => {
  let videogame = await Videogame.findByPk(id, {
    // exclude attributes id and createdByUser:
    attributes: {
      exclude: ['id', 'createdByUser'],
    },
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  // order attributes as requested on readme and adjust genres to obtain string instead of array with objects:
  videogame = {
    image: videogame.image,
    name: videogame.name,
    genres: videogame.genres.map((g) => g.name).join(', '),
    description: videogame.description,
    released: videogame.released,
    rating: videogame.rating,
    platforms: videogame.platforms,
  };
  return videogame;
};

// Get videogames from db by name through query:
const getVideogamesByNameDb = async (name) => {
  const videogames = await Videogame.findAll({
    where: {
      // for case insensitive search:
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: {
      exclude: ['id', 'createdByUser'],
    },
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  const finalVideogames = videogames.map((game) => {
    return {
      image: game.image,
      name: game.name,
      genres: game.genres.map((g) => g.name).join(', '),
      description: game.description,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms,
    };
  });
  return finalVideogames;
};

module.exports = {
  getVideogamesDb,
  getVideogamesByIdDb,
  getVideogamesByNameDb,
};
