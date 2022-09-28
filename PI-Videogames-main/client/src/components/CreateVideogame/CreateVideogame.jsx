// Import React utilities:
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Import actions:
import {
  createVideogame,
  getGenres,
  getVideogames,
} from '../../actions/index.js';

//Import styles and images:
import style from './CreateVideogame.module.css';
import * as images from '../../assets/home/home_images.js';
import icon1 from '../../assets/landing-page/main-icon.ico';

// Function validations:
function validations(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
  }
  if (!input.description) {
    errors.description = 'Description is required';
  }
  if (input.rating > 5 || input.rating < 0) {
    errors.rating = 'Rating must be between 0 and 5';
  }
  if (input.released > new Date().toISOString().slice(0, 10)) {
    errors.released = 'You selected an incorrect date';
  }
  return errors;
}

// Component:
export default function CreateVideogame() {
  const dispatch = useDispatch();

  // Global states:
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenres());
    }
    if (videogames.length === 0) {
      dispatch(getVideogames());
    }
  }, []);

  // Local states:
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    description: '',
    released: new Date().toISOString().slice(0, 10),
    rating: '',
    platforms: [],
    image: '',
    genre: [],
  });

  // Define platforms:
  let allPlatforms = useSelector((state) => state.allVideogames);

  allPlatforms = allPlatforms
    .filter((p) => typeof p.id === 'number')
    .map((videogame) => videogame.platforms)
    .flat();

  allPlatforms = [...new Set(allPlatforms)];

  // Functions for input, errors and submit:
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(createVideogame(input))
      .then((res) => {
        alert('Videogame created');
        dispatch(getVideogames());
      })
      .catch((err) => {
        alert('Apologies! We have encountered an error. Try again.');
      });
    setInput({
      name: '',
      description: '',
      released: new Date().toISOString().slice(0, 10),
      rating: '',
      platforms: [],
      image: '',
      genre: [],
    });
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(createVideogame(input));
  //   setTimeout(() => {
  //     dispatch(getVideogames());
  //   }, 0);
  //   alert('Videogame created successfully!');
  //   setInput({
  //     name: '',
  //     description: '',
  //     released: new Date().toISOString().slice(0, 10),
  //     rating: '',
  //     platforms: [],
  //     image: '',
  //     genre: [],
  //   });
  // }

  // Functions for select and delete genres/platforms:
  function handleSelectGenres(e) {
    setInput({
      ...input,
      genre: input.genre.includes(e.target.value)
        ? input.genre
        : e.target.value !== '-'
        ? input.genre.concat(e.target.value)
        : input.genre,
    });
  }

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : e.target.value !== '-'
        ? input.platforms.concat(e.target.value)
        : input.platforms,
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genre: input.genre.filter((genre) => genre !== e.target.value),
      platforms: input.platforms.filter(
        (platform) => platform !== e.target.value
      ),
    });
  }

  // Render:
  return (
    <div className={style.container_all}>
      {/* Header: */}
      <div className={style.navBar}>
        <div className={style.logo}>
          <img className={style.icon} src={icon1} alt="icon" />
          <h2>{`Gaming & Beyond`}</h2>
        </div>
        <Link to="/videogames">
          <button className={style.button}>{`Back`}</button>
        </Link>
      </div>
      {/* Form: */}
      <div className={style.form_general}>
        <div className={style.header}>
          <h1>Add a new game</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name*: </label>
          <input
            className={style.form_inputs}
            type="text"
            name="name"
            placeholder="Name..."
            value={input.name}
            onChange={handleChange}
          />
          {errors.name && <p className={style.errors}>{errors.name}</p>}

          <label>Description*: </label>
          <textarea
            className={style.form_inputs}
            type="text"
            name="description"
            placeholder="Description..."
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className={style.errors}>{errors.description}</p>
          )}

          <div className={style.label_columns}>
            <label>Released: </label>
            <label>Rating: </label>
          </div>
          <div className={style.input_columns}>
            <input
              className={style.form_inputs}
              type="date"
              name="released"
              value={input.released}
              onChange={handleChange}
            />
            <input
              className={style.form_inputs}
              type="number"
              name="rating"
              placeholder="0-5"
              value={input.rating}
              onChange={handleChange}
            />
          </div>
          <div className={style.errorsColumns}>
            {errors.released && (
              <p className={style.errors}>{errors.released}</p>
            )}
            {errors.rating && <p className={style.errors}>{errors.rating}</p>}
          </div>
          <label>Genres: </label>
          <select
            className={style.form_inputs}
            onChange={(e) => handleSelectGenres(e)}
          >
            <option disabled selected>
              Select...
            </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {input.genre.length > 0 &&
            input.genre.map((genre) => (
              <button
                key={genre}
                className={style.button_properties}
                type="button"
                onClick={handleDelete}
                value={genre}
              >
                {genre}
              </button>
            ))}
          <br />
          <br />
          <label>Platforms*: </label>
          <select
            className={style.form_inputs}
            onChange={handleSelectPlatforms}
          >
            <option disabled selected className={style.options}>
              Select...
            </option>

            {allPlatforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>

          {input.platforms.length > 0 ? (
            input.platforms.map((platform) => (
              <button
                key={platform}
                className={style.button_properties}
                type="button"
                onClick={handleDelete}
                value={platform}
              >
                {platform}
              </button>
            ))
          ) : input.length === 0 ? null : (
            <div className={style.errors}>Select at least one platform.</div>
          )}
          <br />
          <br />
          <label>Image: </label>
          <input
            className={style.form_inputs}
            type="text"
            name="image"
            placeholder="example: https://assets1.ignimgs.com/thumbs/userUploaded/2015/8/28/bestsellinggames1280-1440779592068_1280w.jpg"
            value={input.image}
            onChange={handleChange}
          />
          <div>
            {input.image ? (
              <img className={style.image} src={input.image} alt="game" />
            ) : (
              <img
                className={style.image}
                src={images.default_image}
                alt="game"
              />
            )}
          </div>
          {/* Buttons for submit and cancel: */}
          <button
            className={style.button}
            type="submit"
            disabled={
              errors.name ||
              errors.description ||
              errors.release ||
              input.platforms.length === 0
            }
          >
            Add!
          </button>
          <Link to="/videogames">
            <button className={style.button}>{`Cancel`}</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

/* // TODO: use api route to get all platforms:
1) get all platforms from api through back using Route get all platforms given by api;
2) get platforms in landing page using useEffect and, if not in store at home, dispatch again action, as well in videogame component;

Platforms:
["PC","PlayStation 5","PlayStation 4","Xbox One","Xbox Series S/X","Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"]
*/
