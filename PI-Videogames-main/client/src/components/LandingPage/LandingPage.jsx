import React, { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getVideogames, getGenres } from '../../actions/index.js';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import image1 from '../../assets/landing-page/image1.jpg';
import image2 from '../../assets/landing-page/image2.jpg';
import icon1 from '../../assets/landing-page/main-icon.ico';

const LandingPage = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(getVideogames());
    }
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch]);

  return (
    <div className={style.landing}>
      <div className={style.header}>
        <h1>Let's search for videogames!</h1>
        <img className={style.icon} src={icon1} alt="icon" />
      </div>
      <div className={style.intro}>
        <Link to="/videogames">
          <button className={style.button}>{'Get started! >'}</button>
        </Link>
        <p>I am a gamer not because i don't have A life... </p>
      </div>

      <div className={style.landing_images}>
        <img alt="first" src={image1} />
        <img
          src={'https://media.giphy.com/media/blCBQtdRUklrIp7AX1/giphy.gif'}
          alt="gif"
        />
        <img alt="second" src={image2} />
        <img
          src="https://media.giphy.com/media/GXz3BtvHUzkWMGdlMN/giphy.gif"
          alt="gif"
        />
        <img
          alt="second"
          src="https://cdn.wallpapersafari.com/63/60/Ch6jLa.jpg"
        />
        <img
          src="https://media.giphy.com/media/4abnMEeZG5eulTqQsN/giphy.gif"
          alt="gif"
        />
        <p /* send to left: */ style={{ position: 'absolute', right: '2%' }}>
          ... but because i choose to have MANY.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
