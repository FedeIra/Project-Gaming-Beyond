import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../../actions/index.js';
import style from './SearchBar.module.css';
import search from '../../assets/search-bar/search.png';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [game, setGame] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setGame(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(game));
    setGame('');
  }

  return (
    <form className={style.search_form} onSubmit={handleSubmit}>
      <input
        className={style.search_bar}
        type="text"
        placeholder="Search..."
        value={game}
        onChange={handleInputChange}
      />
      <button className={style.button} type="submit" onClick={handleSubmit}>
        {/* set icon search: */}
        <img className={style.icon} alt="search" src={search} />
      </button>
    </form>
  );
};

export default SearchBar;
