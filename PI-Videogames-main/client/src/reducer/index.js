// Import action types variables:
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_REFRESH,
  GET_VIDEOGAMES_DETAIL,
  FILTER_BY_GENRE,
  FILTER_BY_CREATION,
  ORDER_BY_AZ,
  ORDER_BY_RATING,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  CREATE_VIDEOGAME,
  SET_CURRENT_PAGE,
} from '../actions/index.js';

// Set initial global state:
const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: [],
  genres: [],
  currentPage: 1,
};

// Create reducer functions:
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: [...action.payload],
        allVideogames: [...action.payload],
      };
    case GET_VIDEOGAMES_REFRESH:
      return {
        ...state,
        videogames: state.allVideogames,
      };
    case GET_VIDEOGAMES_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case FILTER_BY_GENRE:
      const videogames = state.allVideogames;
      const genreFilter =
        action.payload === 'All'
          ? videogames
          : videogames.filter((game) => game.genre.includes(action.payload));
      return {
        ...state,
        videogames: genreFilter,
      };
    case FILTER_BY_CREATION:
      const videogames2 = state.allVideogames;
      const creationFilter =
        action.payload === 'All'
          ? videogames2
          : action.payload === 'created'
          ? videogames2.filter((game) => game.createdByUser)
          : videogames2.filter((game) => !game.createdByUser);
      return {
        ...state,
        videogames: creationFilter,
      };
    case ORDER_BY_AZ:
      const videogames3 = [...state.allVideogames];
      const orderAZ =
        action.payload === 'All'
          ? videogames3
          : action.payload === 'A'
          ? videogames3.sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            )
          : videogames3.sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1
            );
      return {
        ...state,
        videogames: orderAZ,
      };
    case ORDER_BY_RATING:
      const videogames4 = [...state.allVideogames];
      const orderByRating =
        action.payload === 'All'
          ? videogames4
          : action.payload === 'asc'
          ? videogames4.sort((a, b) => (a.rating > b.rating ? -1 : 1))
          : videogames4.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      return {
        ...state,
        videogames: orderByRating,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames: [...state.videogames, action.payload],
        allVideogames: [...state.allVideogames, action.payload],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
