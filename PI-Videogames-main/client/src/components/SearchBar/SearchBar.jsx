// Import React utilities:
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Import actions:
import { getVideogamesByName } from '../../actions/index.js';

//Import styles and images:
import style from './SearchBar.module.css';
import search from '../../assets/search-bar/search.png';

// Component:
const SearchBar = () => {
  const dispatch = useDispatch();
  const [game, setSearch] = useState('');

  //Functions for input and submit:
  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(game));
    setSearch('');
  }
  // Render:
  return (
    <form className={style.search_form} onSubmit={handleSubmit}>
      <input
        id="searchInput"
        className={style.search_bar}
        type="text"
        placeholder="Search..."
        value={game}
        onChange={handleInputChange}
      />
      <button className={style.button} type="submit" onClick={handleSubmit}>
        <img className={style.icon} alt="search" src={search} />
      </button>
    </form>
  );
};

export default SearchBar;
