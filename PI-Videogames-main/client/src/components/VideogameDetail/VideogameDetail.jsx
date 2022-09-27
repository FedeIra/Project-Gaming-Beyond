// Import React utilities:
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import actions:
import { getVideogamesDetail } from '../../actions/index.js';

//Import styles and images:
import style from './VideogameDetail.module.css';
import icon1 from '../../assets/landing-page/main-icon.ico';
import * as images from '../../assets/home/home_images.js';

// Component:
const VideogameDetail = (gameProps) => {
  const dispatch = useDispatch();
  const id = gameProps.match.params.id;

  // Global state:
  const videogame = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogamesDetail(id));
  }, [dispatch, id]);

  // Render:
  return (
    <div className={style.container_all}>
      {/* Header: */}
      <div className={style.navBar}>
        <div className={style.logo}>
          <img className={style.icon} src={icon1} alt="icon" />
          <h2>{`Gaming & Beyond`}</h2>
        </div>
        <Link to="/videogames">
          <button className={style.button}>{`Back`}</button>
        </Link>
      </div>
      {/* Card: */}
      {videogame ? (
        <div className={style.first_container}>
          <div className={style.title}>
            <h1>{videogame.name}</h1>
          </div>
          <div className={style.second_container}>
            <div className={style.left_column}>
              {videogame.image === '' ? (
                <img
                  className={style.image}
                  src={images.default_image}
                  alt="default_image"
                  width="200px"
                  height="200px"
                />
              ) : (
                <img
                  className={style.image}
                  src={videogame.image}
                  alt="img"
                  width="200px"
                  height="200px"
                />
              )}
            </div>
            <div className={style.card}>
              <p>
                <b>Genres: </b>
                {`${videogame.genre}.`}
              </p>
              <div>
                <b>Rating: </b>
                {videogame.rating ? (
                  <span className={style.star_rating}>
                    {Array.from({ length: videogame.rating }, (star, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span
                      className={style.no_orange}
                    >{` (${videogame.rating})`}</span>
                  </span>
                ) : (
                  <p>Not rated.</p>
                )}
              </div>
              <p>
                <b>Released: </b> {videogame.released}
              </p>
              <p>
                <b>Platforms: </b> {`${videogame.platforms}.`}
              </p>
              <br />
              <div className={style.text}>
                <p>
                  <b>Description: </b>
                </p>
                {videogame.description}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Loader: */
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default VideogameDetail;

// // Import React utilities:
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // Import actions:
// import { getVideogamesDetail } from '../../actions/index.js';

// //Import styles and images:
// import style from './VideogameDetail.module.css';
// import icon1 from '../../assets/landing-page/main-icon.ico';

// // Component:
// const VideogameDetail = (gameProps) => {
//   const dispatch = useDispatch();
//   const id = gameProps.match.params.id;

//   // Global state:
//   const videogame = useSelector((state) => state.videogameDetail);

//   useEffect(() => {
//     dispatch(getVideogamesDetail(id));
//   }, [dispatch, id]);

//   // Render:
//   return (
//     <div className={style.container_all}>
//       {/* Header: */}
//       <div className={style.navBar}>
//         <div className={style.logo}>
//           <img className={style.icon} src={icon1} alt="icon" />
//           <h2>{`Gaming & Beyond`}</h2>
//         </div>
//         <Link to="/videogames">
//           <button className={style.button}>{`Back`}</button>
//         </Link>
//       </div>
//       {/* Card: */}
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
//                 <b>Rating: </b>
//                 {videogame.rating ? (
//                   <span className={style.star_rating}>
//                     {Array.from({ length: videogame.rating }, (star, i) => (
//                       <span key={i}>★</span>
//                     ))}
//                     <span
//                       className={style.no_orange}
//                     >{` (${videogame.rating})`}</span>
//                   </span>
//                 ) : (
//                   <p>Not rated.</p>
//                 )}
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
//         /* Loader: */
//         <h1>Loading...</h1>
//       )}
//     </div>
//   );
// };

// export default VideogameDetail;
