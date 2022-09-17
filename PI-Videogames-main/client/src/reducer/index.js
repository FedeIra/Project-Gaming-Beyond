import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_REFRESH,
  GET_VIDEOGAMES_DETAIL,
  FILTER_BY_GENRE,
  FILTER_BY_CREATION,
  ORDER_BY_AZ,
  ORDER_BY_RATING,
} from '../actions/index.js';

const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: [],
  // genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
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
      const orderAZ =
        action.payload === 'A'
          ? state.videogames.sort((a, b) => (a.name > b.name ? 1 : -1))
          : state.videogames.sort((a, b) => (a.name > b.name ? -1 : 1));
      return {
        ...state,
        videogames: orderAZ,
      };
    case ORDER_BY_RATING:
      const videogames3 = state.allVideogames;
      const orderByRating =
        action.payload === 'asc'
          ? videogames3.sort((a, b) => (a.rating > b.rating ? -1 : 1))
          : videogames3.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      return {
        ...state,
        videogames: orderByRating,
      };
    default:
      return state;
  }
};

export default rootReducer;
