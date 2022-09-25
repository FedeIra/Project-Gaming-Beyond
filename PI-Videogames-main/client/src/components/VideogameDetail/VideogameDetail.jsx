import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogamesDetail } from '../../actions/index.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import style from './VideogameDetail.module.css';
import icon1 from '../../assets/landing-page/main-icon.ico';

const VideogameDetail = (gameProps) => {
  const dispatch = useDispatch();
  const id = gameProps.match.params.id;

  useEffect(() => {
    dispatch(getVideogamesDetail(id));
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.videogameDetail);

  return (
    <div className={style.container_all}>
      <div className={style.navBar}>
        <div className={style.logo}>
          <img className={style.icon} src={icon1} alt="icon" />
          <h2>{`Gaming & Beyond`}</h2>
        </div>
        <Link to="/videogames">
          <button className={style.button}>{`Back`}</button>
        </Link>
      </div>

      {videogame ? (
        <div className={style.first_container}>
          <div className={style.title}>
            <h1>{videogame.name}</h1>
          </div>
          <div className={style.second_container}>
            <div className={style.left_column}>
              <img
                className={style.image}
                src={videogame.image}
                alt="img"
                width="200px"
                height="200px"
              />
            </div>
            <div className={style.card}>
              <p>
                <b>Genres: </b>
                {`${videogame.genre}.`}
              </p>
              <p>
                {/* convert number of rating to stars: */}
                <b>Rating: </b>
                {videogame.rating ? (
                  <span className={style.star_rating}>
                    {Array.from({ length: videogame.rating }, (v, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span
                      className={style.no_orange}
                    >{` (${videogame.rating})`}</span>
                  </span>
                ) : (
                  <p>Not rated.</p>
                )}
              </p>
              <p>
                <b>Released: </b> {videogame.released}
              </p>
              <p>
                <b>Platforms: </b> {`${videogame.platforms}.`}
              </p>
              <br />
              <p className={style.text}>
                <p>
                  <b>Description: </b>
                </p>
                {videogame.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default VideogameDetail;

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getVideogamesDetail } from '../../actions/index.js';
// import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import style from './VideogameDetail.module.css';
// import icon1 from '../../assets/landing-page/main-icon.ico';

// const VideogameDetail = (gameProps) => {
//   const dispatch = useDispatch();
//   const id = gameProps.match.params.id;

//   useEffect(() => {
//     dispatch(getVideogamesDetail(id));
//   }, [dispatch, id]);

//   const videogame = useSelector((state) => state.videogameDetail);

//   return (
//     <div className={style.container_all}>
//       <div className={style.navBar}>
//         <div className={style.logo}>
//           <img className={style.icon} src={icon1} alt="icon" />
//           <h2>{`Gaming & Beyond`}</h2>
//         </div>
//         <Link to="/videogames">
//           <button className={style.button}>{`Back`}</button>
//         </Link>
//       </div>

//       {videogame ? (
//         <div className={style.first_container}>
//           <div className={style.title}>
//             <h1>{videogame.name}</h1>
//           </div>
//           <div className={style.second_container}>
//             <div className={style.left_column}>
//               <img
//                 className={style.image}
//                 src={videogame.image}
//                 alt="img"
//                 width="200px"
//                 height="200px"
//               />
//             </div>
//             <div className={style.card}>
//               <p>
//                 <b>Genres: </b>
//                 {`${videogame.genre}.`}
//               </p>
//               <p>
//                 <b>Rating: </b> {videogame.rating}
//               </p>
//               <p>
//                 <b>Released: </b> {videogame.released}
//               </p>
//               <p>
//                 <b>Platforms: </b> {`${videogame.platforms}.`}
//               </p>
//               <br />
//               <p className={style.text}>
//                 <p>
//                   <b>Description: </b>
//                 </p>
//                 {videogame.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <h1>Loading...</h1>
//       )}
//     </div>
//   );
// };

// export default VideogameDetail;
