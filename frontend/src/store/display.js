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

const initialState = {};

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
