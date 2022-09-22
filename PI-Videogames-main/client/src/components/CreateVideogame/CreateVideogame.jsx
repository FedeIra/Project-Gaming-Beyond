import React, { useState, useEffect } from 'react';
import {
  createVideogame,
  getGenres,
  getVideogames,
} from '../../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';

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

export default function CreateVideogame() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);

  // set a platform array taking all platforms from videogames only from api:
  const videogames = useSelector((state) => state.allVideogames);
  let allPlatforms = useSelector((state) => state.allVideogames);

  allPlatforms = allPlatforms
    .filter((p) => typeof p.id === 'number')
    .map((videogame) => videogame.platforms)
    .flat();

  allPlatforms = [...new Set(allPlatforms)];

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    description: '',
    released: new Date().toISOString().slice(0, 10),
    rating: 0,
    platforms: [],
    image: '',
    genre: [],
  });

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenres());
    }
    if (videogames.length === 0) {
      dispatch(getVideogames());
    }
  }, [dispatch]);

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
    dispatch(createVideogame(input));
    setTimeout(() => {
      dispatch(getVideogames());
    }, 1000);
    alert('Videogame created successfully');
    setInput({
      name: '',
      description: '',
      released: '',
      rating: '',
      platforms: '',
      image: '',
      genre: '',
    });
  }

  function handleSelectGenres(e) {
    setInput({
      ...input,
      // only concat new genre if value is not already in array and if value is not empty:
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
      // only concat new platform if value is not already in array and if value is not empty:
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

  return (
    <div>
      <h1>Create a new videogame</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Description: </label>
          <textarea
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Released: </label>
          <input
            type="date"
            name="released"
            value={input.released}
            onChange={handleChange}
          />
          {errors.released && <p>{errors.released}</p>}
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="number"
            name="rating"
            value={input.rating}
            onChange={handleChange}
          />
          {errors.rating && <p>{errors.rating}</p>}
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            placeholder="Image link..."
            value={input.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genres: </label>
          <select onChange={(e) => handleSelectGenres(e)}>
            <option>-</option>
            {genres.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
          <div>
            {input.genre.length > 0 &&
              input.genre.map((genre) => (
                <button
                  type="button"
                  onClick={handleDelete}
                  value={genre}
                >{`${genre}  x`}</button>
              ))}
          </div>
        </div>
        <div>
          <label>Platforms: </label>
          <select onChange={handleSelectPlatforms}>
            <option>-</option>
            {allPlatforms.map((platform) => (
              <option value={platform}>{platform}</option>
            ))}
          </select>
          <div>
            {input.platforms.length > 0 ? (
              input.platforms.map((platform) => (
                <button
                  type="button"
                  onClick={handleDelete}
                  value={platform}
                >{`${platform}  x`}</button>
              ))
            ) : (
              <span>Select at least one platform</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={
            errors.name ||
            errors.description ||
            errors.release ||
            input.platforms.length === 0
          }
        >
          Create
        </button>
      </form>
      <Link to="/videogames">
        <button>Back</button>
      </Link>
    </div>
  );
}

/* // TODO: use api route to get all platforms:
1) get all platforms from api through back using Route get all platforms given by api;
2) get platforms in landing page using useEffect and, if not in store at home, dispatch again action, as well in videogame component;

Platforms:
["PC","PlayStation 5","PlayStation 4","Xbox One","Xbox Series S/X","Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"]
*/
