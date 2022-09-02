import { csrfFetch } from "./csrf";

const SET_USER = "display/SET_USER";
const RESET_USER = "display/RESET_USER";

const SET_PLAYLIST = "display/SET_PLAYLIST";
const RESET_PLAYLIST = "display/RESET_PLAYLIST";

const SET_SONG = "display/SET_SONG";
const RESET_SONG = "display/RESET_SONG";

const SET_ALBUM = "display/SET_ALBUM";
const RESET_ALBUM = "display/RESET_ALBUM";

const RESET = "display/RESET";

export const setUser = (user) => ({
  type: SET_USER,
  user
});

export const resetUser = () => ({
  type: RESET_USER
});


export const setSong = (song) => ({
  type: SET_SONG,
  song
});

export const resetSong = () => ({
  type: RESET_SONG
});

export const getUser = (userId) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/users/${userId}`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const createSong = ({albumId, payload}) => async (dispatch) => {
  let response;
  if(albumId) {
    try {
      response = await csrfFetch(`/api/albums/${albumId}/songs`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      response = err;
    }
  } else {
    try {
      response = await csrfFetch(`/api/songs`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      response = err;
    }
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSong(data.song));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

const initialState = {user:null, song:null, album:null, playlist:null};

export default function display (state = initialState, action) {
  let newState = {...state};
  switch(action.type){
    case SET_USER:
      newState.user = action.user;
      return newState;
    case RESET_USER:
      newState.user = null;
      return newState;
      case SET_SONG:
        newState.song = action.song;
        return newState;
      case RESET_SONG:
        newState.song = null;
        return newState;
    default:
      return state;
  }
}
