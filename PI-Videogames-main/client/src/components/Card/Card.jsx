import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ id, name, image, genre }) => {
  return (
    <div className={style.card}>
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
        <img src={image} alt="img" width="200px" height="200px" />
        <div>
          {genre.split(',').map((genre) => (
            <button>{genre}</button>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Card;
