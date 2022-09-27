// Import React utilities:
import React from 'react';
import { Link } from 'react-router-dom';

// Import styles:
import style from './Card.module.css';
import * as images from '../../assets/home/home_images.js';

// Component:
const Card = ({ id, name, image, genre }) => {
  //Render:
  return (
    <Link to={`/videogame/${id}`}>
      <div className={style.card}>
        <h1 className={style.card_title}>{name}</h1>

        {image === '' ? (
          <img
            className={style.card_image}
            src={images.default_image}
            alt="default_image"
            width="200px"
            height="200px"
          />
        ) : (
          <img
            className={style.card_image}
            src={image}
            alt="img"
            width="200px"
            height="200px"
          />
        )}

        <div className={style.genres}>
          {genre.split(',').map((genre) => (
            <span key={genre} className={style.span_genre}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;
