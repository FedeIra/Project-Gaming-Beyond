import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, genre }) => {
  return (
    <div>
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
      </Link>
      <img src={image} alt="img" width="200px" height="200px" />
      <p>{genre}</p>
    </div>
  );
};

export default Card;
