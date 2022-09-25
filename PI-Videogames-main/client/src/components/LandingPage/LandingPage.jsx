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
        <div className={style.logo}>
          <img className={style.icon} src={icon1} alt="icon" />
          <h2>{`Gaming & Beyond`}</h2>
        </div>
        <Link to="/videogames">
          <button className={style.button}>{'Get started!'}</button>
        </Link>
      </div>
      <div className={style.intro}>
        <h1>Let's search for videogames!</h1>
        <h2 className={style.subtitle}>
          Find games any day. Add games any time.
        </h2>
        <Link to="/videogames">
          <button className={style.button}>{'Get started!'}</button>
        </Link>
      </div>
      <div className={style.landing_images}>
        <img alt="first" src={image1} />
        <img
          src={'https://media.giphy.com/media/blCBQtdRUklrIp7AX1/giphy.gif'}
          alt="gif"
        />
        <img alt="second" src={image2} />

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
