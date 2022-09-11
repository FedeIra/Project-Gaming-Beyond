const { Router } = require('express');
// Import functions from apiFunctions:
const {
  getVideogamesApi,
  getVideogamesByNameApi,
  getVideogamesByIdApi,
  getGenresApi,
} = require('./apiFunctions');

const { Videogame, Genre } = require('../db.js');

// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

// GET GENRES FROM DB (IF NO GENRES, GET THEM FROM API AND SAVE IT TO DB):
router.get('/videogames/genres', async (req, res) => {
  const genres = await Genre.findAll();
  if (genres.length) {
    return res.json(genres.map((genre) => genre.name));
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

  try {
    const videogame = await getVideogamesByIdApi(id);
    res.json(videogame);
  } catch (error) {
    res.status(404).send('error');
  }
});

// GET ALL VIDEOGAMES OR BY NAME:
router.get('/videogames', async (req, res) => {
  const { search } = req.query;

  if (search) {
    try {
      const videogames = await getVideogamesByNameApi(search);
      console.log('videogames:', videogames);
      res.json(videogames);
    } catch (error) {
      res.status(404).send('No videogames found by than name');
    }
  } else {
    try {
      const videogames = await getVideogamesApi();
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
    genre, // ! REPASAR: minuto 1:15:00 del video 1 de repaso.
    createdByUser,
  } = req.body;

  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
      createdByUser,
    });
    const genderDb = await Genre.findAll({
      where: {
        name: genre,
      },
    });
    newVideogame.addGenres(genderDb);

    res.json(genderDb);
  } catch (error) {
    res.status(404).send('incorrect data');
  }
});

// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
