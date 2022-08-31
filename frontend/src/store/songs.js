import { csrfFetch } from "./csrf";

const SET_SONGS = "display/SET_SONGS";
const RESET_SONGS = "display/RESET_SONGS";


export const setSongs = (songs) => ({
  type: SET_SONGS,
  songs
});

export const resetSongs = () => ({
  type: RESET_SONGS
});


export const getSongs = () => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSongs(data.songs));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

const initialState = [];

export default function display (state = initialState, action) {
  let newState = [...state];
  switch(action.type){
    case SET_SONGS:
      newState = action.songs;
      return newState;
      case RESET_SONGS:
        newState = [];
        return newState;
    default:
      return state;
  }
}
