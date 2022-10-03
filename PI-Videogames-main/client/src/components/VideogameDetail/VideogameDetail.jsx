// Import React utilities:
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import actions:
import { getVideogamesDetail, deleteVideogame } from '../../actions/index.js';

//Import styles and images:
import style from './VideogameDetail.module.css';
import icon1 from '../../assets/landing-page/main-icon.ico';
import * as images from '../../assets/home/home_images.js';
import {
  arrow,
  cart,
  trash,
  edit,
  youtube,
} from '../../assets/videogame-details/detailsImages.js';

// Component:
const VideogameDetail = (gameProps) => {
  const dispatch = useDispatch();
  const id = gameProps.match.params.id;

  // Global state:
  const videogame = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogamesDetail(id));
  }, [dispatch, id]);

  // Function to delete:
  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to delete the videogame ${videogame.name}?`
      )
    ) {
      dispatch(deleteVideogame(id))
        .then((res) => {
          alert('Videogame deleted');
        })
        .catch((err) => {
          alert('Apologies! We have encountered an error. Try again.');
        });
    }
  }

  // Function for gameplay:
  function handleGamePlay(e) {
    window.open(
      `https://www.youtube.com/results?search_query=${videogame.name}+gameplay`,
      'blank',
      '_self',
      'noreferrer'
    );
  }

  // Function to buy:
  function handleBuyOption(e) {
    window.open(`https://${e.target.value}`, 'blank', '_self');
    document.getElementById('buyOptions').value = 'buy';
  }

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
          <div className={style.header_buttons}>
            {/*Edit button: */}
            <Link to={`/videogames/edit`}>
              {isNaN(id) ? (
                <button className={`${style.button} ${style.button_edit}`}>
                  <img src={edit} alt="edit" />
                </button>
              ) : null}
            </Link>
            <Link to="/videogames">
              {/* Delete button: */}
              {isNaN(id) ? (
                <button
                  className={`${style.button} ${style.button_delete}`}
                  onClick={handleDelete}
                >
                  <img src={trash} alt="delete" />
                </button>
              ) : null}
            </Link>
          </div>
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
              {/* Option to see gameplay: */}
              <div className={style.gameplayAndBuy}>
                <div>
                  <button
                    className={`${style.button} ${style.button_gameplay}`}
                    onClick={handleGamePlay}
                  >
                    <img
                      className={style.youtube_image}
                      src={youtube}
                      alt="youtube"
                    />
                    Go Youtube GamePlay
                    <img
                      className={style.arrow_image}
                      src={arrow}
                      alt="youtube"
                    />
                  </button>
                </div>
                {/* Option to buy. */}
                {videogame.stores ? (
                  <div className={style.buy}>
                    <img className={style.cart_image} src={cart} alt="cart" />
                    <select
                      className={style.select}
                      onChange={(e) => handleBuyOption(e)}
                      id="buyOptions"
                    >
                      <option
                        disabled
                        selected
                        className={style.select_options}
                        value="buy"
                      >
                        Buy Now via...
                      </option>
                      {videogame.stores.map((store) => {
                        return (
                          <option
                            key={store}
                            value={store}
                            className={style.select_options}
                          >
                            {store}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}
              </div>
              {/* Option to buy and gameplay end */}
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
                    >{` (${videogame.rating}) `}</span>
                    {videogame.reviews_count ? (
                      <span className={style.no_orange}>
                        {` | ${videogame.reviews_count
                          .toString()
                          .replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            '.'
                          )} User reviews.`}
                      </span>
                    ) : null}
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
