// Import React utilities:
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//Import actions:
import {
  getVideogames,
  getVideogamesRefresh,
  filterVideogamesByGenre,
  filterVideogamesAPIorDB,
  orderVideogamesByAZ,
  orderVideogamesByRating,
  getGenres,
  setCurrentPage,
} from '../../actions/index.js';

//Import components:
import Card from '../Card/Card.jsx';
import Paginate from '../Paginate/Paginate.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

//Import styles and images:
import style from './Home.module.css';
import icon1 from '../../assets/landing-page/main-icon.ico';
import * as images from '../../assets/home/home_images.js';

// Component:
const Home = () => {
  const dispatch = useDispatch();

  // Global states:
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(getVideogames());
    }
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  }, []);

  //Pagination:
  const indexOfLastVideogame = currentPage * 15;
  const indexOfFirstVideogame = indexOfLastVideogame - 15;
  const currentVideogames = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // Functions for filter and sorts:
  function handleOrderAZ(e) {
    dispatch(setCurrentPage(1));
    dispatch(orderVideogamesByAZ(e.target.value));
  }

  function handleOrderRating(e) {
    dispatch(orderVideogamesByRating(e.target.value));
    dispatch(setCurrentPage(1));
  }

  function handleFilterGenre(e) {
    dispatch(setCurrentPage(1));
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  function handleFilterCreation(e) {
    dispatch(setCurrentPage(1));
    dispatch(filterVideogamesAPIorDB(e.target.value));
  }

  // Function for refresh:
  function handleClick(e) {
    dispatch(setCurrentPage(1));
    dispatch(getVideogamesRefresh());
    document.getElementById('sortAZ').value = 'All';
    document.getElementById('sortRating').value = 'All';
    document.getElementById('filterGenre').value = 'All';
    document.getElementById('filterCreation').value = 'All';
  }

  // Render:
  return (
    <div className={style.home}>
      {/* Header: */}
      <div className={style.header}>
        <div className={style.header_title}>
          <img src={icon1} alt="icon" />
          <h1>{'Gaming & Beyond'}</h1>
        </div>
        <Link to={'/videogames/create'}>
          <button className={style.button}> {'Add game!'}</button>
        </Link>
      </div>
      <div className={style.filters}>
        {/* Component SearchBar: */}
        <SearchBar />
        {/* Sort by A-Z: */}
        <select
          id="sortAZ"
          className={style.select}
          onChange={(e) => {
            handleOrderAZ(e);
          }}
        >
          <option className={style.select_options} value="All">
            Alphabetical Sort
          </option>
          <option className={style.select_options} value="A">
            A-Z
          </option>
          <option className={style.select_options} value="Z">
            Z-A
          </option>
        </select>
        {/* Sort by rating: */}
        <select
          id="sortRating"
          className={style.select}
          onChange={(e) => {
            handleOrderRating(e);
          }}
        >
          <option className={style.select_options} value="All">
            Rating Sort
          </option>
          <option className={style.select_options} value="asc">
            Higher-Lower
          </option>
          <option className={style.select_options} value="desc">
            Lower-Higher
          </option>
        </select>
        {/* Filter by genres: */}
        <select
          id="filterGenre"
          className={style.select}
          onChange={(e) => {
            handleFilterGenre(e);
          }}
        >
          <option className={style.select_options} value="All">
            Filter by Genre
          </option>
          {genres.map((genre) => (
            <option key={genre} className={style.select_options} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {/* Filter by created or existing: */}
        <select
          id="filterCreation"
          className={style.select}
          onChange={(e) => {
            handleFilterCreation(e);
          }}
        >
          <option className={style.select_options} value="All">
            All
          </option>
          <option className={style.select_options} value="created">
            Created
          </option>
          <option className={style.select_options} value="api">
            Existing
          </option>
        </select>
        <button
          className={`${style.button} ${style.button_refresh}`}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <img
            className={style.image_refresh}
            src={images.refresh}
            alt="refresh"
          />
        </button>
      </div>
      <div>
        {/* Component Paginate: */}
        <div>
          <Paginate videogames={videogames.length} paginate={paginate} />
        </div>

        {/* Component card: */}
        <div className={style.cards}>
          {currentVideogames.length > 0 ? (
            currentVideogames.map((game) => {
              return (
                <div key={game.id} className={style.cards}>
                  <Card
                    name={game.name}
                    image={game.image}
                    genre={game.genre}
                    id={game.id}
                  />
                </div>
              );
            })
          ) : (
            /* Loader: */
            <div className={style.loader}>
              <button
                className={style.button}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Back
              </button>
              <h1>Searching for videogames...</h1>
              <img className={style.image_loader} src={icon1} alt="gif" />
            </div>
          )}
        </div>
        {/* Component Paginate: */}
        <span className={style.buttons_footer}>
          <Paginate videogames={videogames.length} paginate={paginate} />
        </span>
        {/* Footer: */}
        <div className={style.footer}>
          <span>Contact Federico Irarrazaval: </span>
          <a
            href="https://www.linkedin.com/in/federico-irarr%C3%A1zaval-314b89a1/"
            target="blank"
            rel="nofollow"
          >
            <img
              className={style.footer_icons}
              alt="linkedin"
              src={images.linkedin}
            />
          </a>
          <a
            href="https://github.com/search?q=FedeIra&type=users"
            target="blank"
            rel="nofollow"
          >
            <img
              className={style.footer_icons}
              alt="github"
              src={images.github}
            />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5491167887879&text=Hey"
            target="blank"
            rel="nofollow"
          >
            <img
              className={style.footer_icons}
              alt="whatsapp"
              src={images.whatsapp}
            />
          </a>
          <a href="mailto: fedeirar@gmail.com" target="blank" rel="nofollow">
            <img
              className={style.footer_icons}
              alt="email"
              src={images.email}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
