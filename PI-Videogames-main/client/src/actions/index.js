import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const GET_VIDEOGAMES_REFRESH = 'GET_VIDEOGAMES_REFRESH';
export const GET_VIDEOGAMES_DETAIL = 'GET_VIDEOGAMES_DETAIL';
export const ORDER_BY_AZ = 'ORDER_BY_AZ';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';

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

// GET VIDEOGAMES BY GENRE:
export const filterVideogamesByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
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

// GET VIDEOGAMES API OR DB:
export const filterVideogamesAPIorDB = (payload) => {
  return {
    type: FILTER_BY_CREATION,
    payload,
  };
};
