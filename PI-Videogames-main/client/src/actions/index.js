import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const GET_VIDEOGAMES_REFRESH = 'GET_VIDEOGAMES_REFRESH';
export const GET_VIDEOGAMES_DETAIL = 'GET_VIDEOGAMES_DETAIL';
export const ORDER_BY_AZ = 'ORDER_BY_AZ';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';
export const FILTER_BY_PLATFORM = 'FILTER_BY_PLATFORM';
export const UPDATE_VIDEOGAME = 'UPDATE_VIDEOGAME';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const ORDER_BY_RELEASED = 'ORDER_BY_RELEASED';
export const SORT_FILTER_RECOMMENDED = 'SORT_FILTER_RECOMMENDED';

//ACTIONS -- THUNK

// GET ALL VIDEOGAMES
export const getVideogames = () => {
  return async function (dispatch) {
    let videogames = await axios.get('http://localhost:3001/videogames');
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: videogames.data,
    });
  };
};

// GET VIDEOGAMES BY REFRESH:
export const getVideogamesRefresh = (payload) => {
  return {
    type: GET_VIDEOGAMES_REFRESH,
    payload,
  };
};

// GET VIDEOGAMES RECOMMENDED:
export const getVideogamesRecommended = (payload) => {
  return {
    type: SORT_FILTER_RECOMMENDED,
    payload,
  };
};

// GET VIDEOGAME BY ID:

export const getVideogamesDetail = (id) => {
  return async function (dispatch) {
    let videogame = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_VIDEOGAMES_DETAIL,
      payload: videogame.data,
    });
  };
};

// GET  VIDEOGAMES BY NAME
export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    let videogames = await axios.get(
      ` http://localhost:3001/videogames?search=${name}`
    );
    if (videogames.data.length === 0) {
      alert(
        'Apologies! No videogames were found by that name. Please try again.'
      );
    } else {
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: videogames.data,
      });
    }
  };
};

// GET VIDEOGAMES BY GENRE:
export const filterVideogamesByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
};

// GET VIDEOGAMES BY PLATFORM:
export const filterPlatforms = (platform) => {
  return {
    type: FILTER_BY_PLATFORM,
    payload: platform,
  };
};

// ORDER VIDEOGAMES BY A/Z:
export const orderVideogamesByAZ = (payload) => {
  return {
    type: ORDER_BY_AZ,
    payload,
  };
};

// ORDER VIDEOGAMES BY RATING:
export const orderVideogamesByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
};

// ORDER VIDEOGAMES BY RELEASED:
export const orderVideogamesByReleased = (payload) => {
  return {
    type: ORDER_BY_RELEASED,
    payload,
  };
};

// GET VIDEOGAMES API OR DB:
export const filterVideogamesAPIorDB = (payload) => {
  return {
    type: FILTER_BY_CREATION,
    payload,
  };
};

// GET GENRES:
export const getGenres = () => {
  return async function (dispatch) {
    let genres = await axios.get('http://localhost:3001/videogames/genres');
    return dispatch({
      type: GET_GENRES,
      payload: genres.data,
    });
  };
};

// GET PLATFORMS:
export const getPlatforms = () => {
  return async function (dispatch) {
    let platforms = await axios.get(
      'http://localhost:3001/videogames/platforms'
    );
    return dispatch({
      type: GET_PLATFORMS,
      payload: platforms.data,
    });
  };
};

// POST CREATE VIDEOGAME
export const createVideogame = (videogame) => {
  return async function (dispatch) {
    let newVideogame = await axios.post(
      'http://localhost:3001/videogames',
      videogame
    );
    return dispatch({
      type: CREATE_VIDEOGAME,
      payload: newVideogame.data,
    });
  };
};

// SET CURRENT PAGE
export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

// DELETE VIDEOGAMES
export const deleteVideogame = (id) => {
  return async function (dispatch) {
    let videogame = await axios.delete(
      `http://localhost:3001/videogames/${id}`
    );
    return dispatch({
      type: DELETE_VIDEOGAME,
      payload: videogame.data,
    });
  };
};

// UPDATE VIDEOGAME:
export const editVideogame = (videogame) => {
  return async function (dispatch) {
    let updatedVideogame = await axios.put(
      `http://localhost:3001/videogames/edit`,
      videogame
    );
    return dispatch({
      type: UPDATE_VIDEOGAME,
      payload: updatedVideogame.data,
    });
  };
};
