import { csrfFetch } from "./csrf";

const SET_ARTISTS = "display/SET_ARTISTS";
const RESET_ARTISTS = "display/RESET_ARTISTS";


export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists
});

export const resetArtists = () => ({
  type: RESET_ARTISTS
});


export const getArtists = () => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/artists`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setArtists(data.artists));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}


const initialState = [];

export default function artists(state = initialState, action) {
  let newState = [...state];
  switch(action.type){
    case SET_ARTISTS:
      newState = action.artists;
      return newState;
      case RESET_ARTISTS:
        newState = [];
        return newState;
    default:
      return state;
  }
}
