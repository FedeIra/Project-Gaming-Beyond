// Import react utilities:
import React, { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import actions:
import { getVideogames, getGenres, getPlatforms } from '../../actions/index.js';

// Import styles and images:
import style from './LandingPage.module.css';
import * as images from '../../assets/landing-page/landing_images.js';

// Component:
const LandingPage = () => {
  const dispatch = useDispatch();

  // Hook:
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  });

  //Render:
  return (
    <div className={style.landing}>
      {/* Header: */}
      <div className={style.header}>
        <div className={style.logo}>
          <img className={style.icon} src={images.icon1} alt="icon" />
          <h2>{`Gaming & Beyond`}</h2>
        </div>
        <Link to="/videogames">
          <button className={style.button}>{'Home'}</button>
        </Link>
      </div>
      {/* Main: */}
      <div className={style.intro}>
        <h1>Let's search for videogames!</h1>
        <h2 className={style.subtitle}>
          Find games any day. Add games any time.
        </h2>
        <Link to="/videogames">
          <button className={`${style.button} ${style.button_middle}`}>
            {'Get started!'}
          </button>
        </Link>
      </div>
      {/* Images and gifs: */}
      <div className={style.landing_images}>
        <img alt="first" src={images.image1} />
        <img
          src={'https://media.giphy.com/media/blCBQtdRUklrIp7AX1/giphy.gif'}
          alt="gif"
        />
        <img alt="second" src={images.image2} />

        <img
          src="https://media.giphy.com/media/abVzXV830cj7YTci7N/giphy.gif"
          alt="gif"
        />
        <img
          src="https://media.giphy.com/media/khEmECHScHF8cHfXks/giphy-downsized-large.gif"
          alt="gif"
        />
        <img
          alt="third"
          src="https://cdn.wallpapersafari.com/63/60/Ch6jLa.jpg"
        />
        <img
          src="https://media.giphy.com/media/4abnMEeZG5eulTqQsN/giphy.gif"
          alt="gif"
        />
        <img
          alt="fourth"
          src="https://cdn.wccftech.com/wp-content/uploads/2018/10/RDR2_Review_19-scaled.jpg"
        />
        <p
          style={{
            position: 'absolute',
            right: '2%',
          }}
        ></p>
      </div>
    </div>
  );
};

export default LandingPage;
