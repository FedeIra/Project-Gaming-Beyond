const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db.js');

const {
  getVideogamesApi,
  getVideogamesByNameApi,
  getVideogamesByIdApi,
  getGenresApi,
} = require('./apiFunctions');

const {
  getVideogamesDb,
  getVideogamesByIdDb,
  getVideogamesByNameDb,
} = require('./dbFunctions');

// GET GENRES FROM DB (IF NO GENRES, GET THEM FROM API AND SAVE IT TO DB):
router.get('/videogames/genres', async (req, res) => {
  const genres = await Genre.findAll();
  if (genres.length) {
    return res.json(genres.map((g) => g.name));
  } else {
    try {
      const genresApi = await getGenresApi();
      return res.json(genresApi);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
});

// GET VIDEOGAME BY ID:
router.get('/videogames/:id', async (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    try {
      const videogame = await getVideogamesByIdDb(id);
      return res.json(videogame);
    } catch (error) {
      return res.status(404).send(error);
    }
  } else {
    try {
      const videogame = await getVideogamesByIdApi(id);
      return res.json(videogame);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
});

// GET ALL VIDEOGAMES OR BY NAME:
router.get('/videogames', async (req, res) => {
  const { search } = req.query;

  if (search) {
    try {
      const videogamesDB = await getVideogamesByNameDb(search);

      let videogamesAPI = await getVideogamesByNameApi(search);

      if (videogamesDB.length + videogamesAPI.length > 15) {
        videogamesAPI = videogamesAPI.slice(0, 15 - videogamesDB.length); // If there are more than 15 videogames, slice API results.
      }

      const videogames = [...videogamesDB, ...videogamesAPI];
      res.json(videogames);
    } catch (error) {
      res
        .status(404)
        .send({ message: `The videogame ${search} does not exist.` });
    }
  } else {
    try {
      const videogamesBS = await getVideogamesDb();
      const videogamesAPI = await getVideogamesApi();

      const videogames = [...videogamesAPI, ...videogamesBS];
      res.json(videogames);
    } catch (error) {
      res.status(404).send('No videogames found');
    }
  }
});

// POST VIDEOGAME:
router.post('/videogames', async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    image,
    createdByUser,
    genre, // ! REPASAR: minuto 1:15:00 del video 1 de repaso.
  } = req.body;

  try {
    let newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
      createdByUser,
    });

    let genreDB = await Genre.findAll({
      where: {
        name: genre,
      },
    });

    newVideogame.addGenres(genreDB);
    res.send('Videogame created successfully');
  } catch (error) {
    res.status(404).send('incorrect data');
  }
});

module.exports = router;
