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
} from '../../actions/index.js';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import Paginate from '../Paginate/Paginate.jsx';

const Home = () => {
  const dispatch = useDispatch(); // function to dispatch actions
  const videogames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState('');

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
    dispatch(getVideogames());
  }, [dispatch]); // dispatch is a dependency. If dispatch changes, useEffect will run again.

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
    <div>
      <h1>Home</h1>
      <Link to="/videogame"> Create videogame</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Refresh
      </button>
      <div>
        {/* A-Z: */}
        <select
          onChange={(e) => {
            handleOrderAZ(e);
          }}
        >
          <option value="A">A-Z</option>
          <option value="Z">Z-A</option>
        </select>
        {/* Rating: */}
        <select
          onChange={(e) => {
            handleOrderRating(e);
          }}
        >
          <option value="asc">Higher-Lower</option>
          <option value="desc">Lower-Higher</option>
        </select>
        {/* Genres: */}
        <select
          onChange={(e) => {
            handleFilterGenre(e);
          }}
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Arcade">Arcade</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Platformer">Platformer</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Board Games">Board Games</option>
          <option value="Family">Family</option>
          <option value="Card">Card</option>
          <option value="Educational">Educational</option>
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
        <Paginate videogames={videogames.length} paginate={paginate} />
        {currentVideogames &&
          currentVideogames.map((game) => {
            return (
              <div>
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
          })}
      </div>
    </div>
  );
};

export default Home;
