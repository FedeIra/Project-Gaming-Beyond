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

          <h1>{'GAMING & BEYOND'}</h1>
        </div>
        <Link to={'/videogames/create'}>
          <button>Create Videogame</button>
        </Link>
      </div>
      <div className={style.filters}>
        <SearchBar />
        {/* A-Z: */}
        <select
          onChange={(e) => {
            handleOrderAZ(e);
          }}
        >
          <option value="All">Alphabetical Sort</option>
          <option value="A">A-Z</option>
          <option value="Z">Z-A</option>
        </select>
        {/* Rating: */}
        <select
          onChange={(e) => {
            handleOrderRating(e);
          }}
        >
          <option value="All">Rating Sort</option>
          <option value="asc">Higher-Lower</option>
          <option value="desc">Lower-Higher</option>
        </select>
        {/* Genres: */}
        <select
          onChange={(e) => {
            handleFilterGenre(e);
          }}
        >
          <option value="All">Filter by Genre</option>
          {genres.map((genre) => (
            <option value={genre}>{genre}</option>
          ))}
        </select>
        {/* Created or existing: */}
        <select
          onChange={(e) => {
            handleFilterCreation(e);
          }}
        >
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
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
                  <Link to={`/videogames/${game.id}`}>
                    <Card
                      name={game.name}
                      image={game.image}
                      genre={game.genre}
                      id={game.id}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div>
              <h1>Searching for videogames...</h1>
              <button
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
