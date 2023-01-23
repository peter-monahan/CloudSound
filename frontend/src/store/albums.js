import { csrfFetch } from "./csrf";

const SET_ALBUMS = "display/SET_ALBUMS";
const SET_ALBUM = "display/SET_ALBUM";
const RESET_ALBUMS = "display/RESET_ALBUMS";


export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums
});

export const setAlbum = (album) => ({
  type: SET_ALBUM,
  album
});
export const resetAlbums = () => ({
  type: RESET_ALBUMS
});

export const getAlbum = (albumId) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/albums/${albumId}`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setAlbum(data));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}


export const getAlbums = () => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/albums`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setAlbums(data));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const getUserAlbums = (id) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/users/${id}/albums`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setAlbums(data));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

const initialState = {};

export default function albums(state = initialState, action) {
  let newState = {...state};
  switch(action.type){
    case SET_ALBUMS:
      newState = action.albums;
      return newState;
    case SET_ALBUM:
      newState[action.album.id] = action.album
      return newState;
    case RESET_ALBUMS:
        newState = {};
        return newState;
    default:
      return state;
  }
}
