import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogamesDetail } from '../../actions/index.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const VideogameDetail = (gameProps) => {
  const dispatch = useDispatch();
  const id = gameProps.match.params.id;

  useEffect(() => {
    dispatch(getVideogamesDetail(id));
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.videogameDetail);

  return (
    <div>
      {videogame ? (
        <div>
          <h1>{videogame.name}</h1>
          <img src={videogame.image} alt="img" width="200px" height="200px" />
          <p> Description: {videogame.description}</p>
          <p> Released: {videogame.released}</p>
          <p> Rating: {videogame.rating}</p>
          <p> Platforms: {videogame.platforms}</p>
          <p> Genres: {videogame.genre}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Link to="/videogames">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default VideogameDetail;

//TODO: Without loading
//   return (
//     <div>
//       <h1>{videogame.name}</h1>
//       <img src={videogame.image} alt="img" width="200px" height="200px" />
//       <p> Description: {videogame.description}</p>
//       <p> Released: {videogame.released}</p>
//       <p> Rating: {videogame.rating}</p>
//       <p> Platforms: {videogame.platforms}</p>
//       <p> Genres: {videogame.genre}</p>
//       <Link to="/videogames">
//         <button>Back</button>
//       </Link>
//     </div>
//   );
// };
