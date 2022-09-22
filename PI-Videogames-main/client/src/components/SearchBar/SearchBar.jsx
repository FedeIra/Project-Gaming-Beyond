import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../../actions/index.js';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={game}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
