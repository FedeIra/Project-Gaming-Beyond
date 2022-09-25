import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVideogames,
  getVideogamesRefresh,
  filterVideogamesByGenre,
  filterVideogamesAPIorDB,
  orderVideogamesByAZ,
  orderVideogamesByRating,
  getGenres,
} from '../../actions/index.js';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import Paginate from '../Paginate/Paginate.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import icon1 from '../../assets/landing-page/main-icon.ico';
import loader from '../../assets/home/loader.gif';
import refresh from '../../assets/home/refresh4.png';
import style from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch(); // function to dispatch actions
  const videogames = useSelector((state) => state.videogames);

  const [orden, setOrden] = useState('');

  // Get genres for createvideogames:
  const genres = useSelector((state) => state.genres);
  // PAGINATION:
  const [currentPage, setCurrentPage] = useState(1); // local states. Initial page is 1

  const indexOfLastVideogame = currentPage * 15; // 1 * 15 = 14
  const indexOfFirstVideogame = indexOfLastVideogame - 15; // 15 - 15 = 0
  const currentVideogames = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  ); // slice the array of videogames

  // 1 ----- 0 ------ 14
  // 2 ----- 15 ------ 29
  // ...

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; // function to change the page

  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(getVideogames());
    }
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getVideogamesRefresh());
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  function handleFilterCreation(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterVideogamesAPIorDB(e.target.value));
  }

  function handleOrderAZ(e) {
    e.preventDefault();
    dispatch(orderVideogamesByAZ(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleOrderRating(e) {
    e.preventDefault();
    dispatch(orderVideogamesByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div className={style.home}>
      <div className={style.header}>
        <div className={style.header_title}>
          <img src={icon1} alt="icon" />
          <h1>{'Gaming & Beyond'}</h1>
        </div>
        <Link to={'/videogames/create'}>
          <button className={style.button}> {'Add game!'}</button>
        </Link>
      </div>
      <div className={style.filters}>
        <SearchBar /> {/* A-Z: */}
        <select
          className={style.select}
          onChange={(e) => {
            handleOrderAZ(e);
          }}
        >
          <option className={style.select_options} value="All">
            Alphabetical Sort
          </option>
          <option className={style.select_options} value="A">
            A-Z
          </option>
          <option className={style.select_options} value="Z">
            Z-A
          </option>
        </select>
        {/* Rating: */}
        <select
          className={style.select}
          onChange={(e) => {
            handleOrderRating(e);
          }}
        >
          <option className={style.select_options} value="All">
            Rating Sort
          </option>
          <option className={style.select_options} value="asc">
            Higher-Lower
          </option>
          <option className={style.select_options} value="desc">
            Lower-Higher
          </option>
        </select>
        {/* Genres: */}
        <select
          className={style.select}
          onChange={(e) => {
            handleFilterGenre(e);
          }}
        >
          <option className={style.select_options} value="All">
            Filter by Genre
          </option>
          {genres.map((genre) => (
            <option className={style.select_options} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {/* Created or existing: */}
        <select
          className={style.select}
          onChange={(e) => {
            handleFilterCreation(e);
          }}
        >
          <option className={style.select_options} value="All">
            All
          </option>
          <option className={style.select_options} value="created">
            Created
          </option>
          <option className={style.select_options} value="api">
            Existing
          </option>
        </select>
        <button
          /* add two classes to button: */
          className={`${style.button} ${style.button_refresh}`}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <img className={style.image_refresh} src={refresh} alt="refresh" />
        </button>
      </div>
      <div>
        <div>
          <Paginate videogames={videogames.length} paginate={paginate} />
        </div>
        <div className={style.cards}>
          {currentVideogames.length > 0 ? (
            currentVideogames.map((game) => {
              return (
                <div className={style.cards}>
                  <Card
                    name={game.name}
                    image={game.image}
                    genre={game.genre}
                    id={game.id}
                  />
                </div>
              );
            })
          ) : (
            <div className={style.loader}>
              <button
                className={style.button}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Back
              </button>
              <h1>Searching for videogames...</h1>
              <img className={style.image_loader} src={icon1} alt="gif" />
            </div>
          )}
        </div>
        <div className={style.footer}>
          <Paginate videogames={videogames.length} paginate={paginate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
