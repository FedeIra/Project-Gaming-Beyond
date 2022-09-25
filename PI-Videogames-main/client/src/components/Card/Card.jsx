import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ id, name, image, genre }) => {
  return (
    <div className={style.card}>
      <Link to={`/videogame/${id}`}>
        <h1 className={style.card_title}>{name}</h1>
        <img
          className={style.card_image}
          src={image}
          alt="img"
          width="200px"
          height="200px"
        />
        <div className={style.genres}>
          {genre.split(',').map((genre) => (
            <button className={style.button_genre}>{genre}</button>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Card;
