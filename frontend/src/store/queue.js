//all actions specific to QUEUE Resource

//imports
// import { csrfFetch } from "./csrf";

//constants
const ADD_SONG_TO_QUEUE = 'queue/ADD_SONG_TO_QUEUE';
const ADD_LIST_TO_QUEUE = 'queue/ADD_LIST_TO_QUEUE';
const REMOVE_FROM_QUEUE = 'queue/REMOVE_FROM_QUEUE';
const CLEAR_QUEUE = 'queue/CLEAR_QUEUE';
const NEXT_SONG = 'queue/NEXT_SONG';
const PREV_SONG = 'queue/PREV_SONG';
const TOGGLE_REPEAT = 'queue/TOGGLE_REPEAT';
const TOGGLE_PLAYBACK = 'queue/TOGGLE_PLAYBACK';

const SET_CURRENT =  'queue/SET_CURRENT';



//ACTION CREATORS
export const addSong = (song, position) => {
  //position should be either "NEXT", "END" or CURRENT
  return {
    type: ADD_SONG_TO_QUEUE,
    song,
    position
  }
};


export const addSongList = (songs, position) => {
  //position should be either "NEXT", "END" or CURRENT
  return {
    type: ADD_LIST_TO_QUEUE,
    songs,
    position
  }
};


export const removeSong = (songId) => {
  return {
    type: REMOVE_FROM_QUEUE,
    songId,
  }
};

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE,
  }
};

export const nextSong = () => {
  return {
    type: NEXT_SONG,
  }
};

export const prevSong = () => {
  return {
    type: PREV_SONG,
  }
};

const initialState = {head: null, tail: null, current: null, nodes: {}, repeat: false, isPlaying: false};

//music REDUCER
export default function reducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case ADD_SONG_TO_QUEUE: {

      let next = null;
      let prev = null;
      if(newState.current === null) {
        newState.head = action.song.id;
        newState.tail = action.song.id;
        newState.current = action.song.id;
      } else if(newState.current === newState.tail || action.position.toUpperCase() === "END") {
        prev = newState.tail;
        newState.nodes[newState.tail].next = action.song.id;
        newState.tail = action.song.id;
      } else {
        const curr = newState.nodes[newState.current];
        prev = curr.id;
        next = curr.next;
        curr.next = action.song.id;
        newState.nodes[next].prev = action.song.id;
      }
      if(action.position.toUpperCase() === "CURRENT") {
        newState.current = action.song.id;
      }
      newState.nodes[action.song.id] = {song: action.song, id: action.song.id, next, prev}

      return newState;
    } case ADD_LIST_TO_QUEUE: {

      console.log(ADD_LIST_TO_QUEUE + " <--------------------  NOT YET ADDED")
      return newState;
    } case REMOVE_FROM_QUEUE: {

      console.log(REMOVE_FROM_QUEUE + " <--------------------  NOT YET ADDED")
      return newState;
    } case CLEAR_QUEUE: {

      return {...initialState, repeat: newState.repeat};
    } case NEXT_SONG: {

      let next = newState.nodes[newState.current].next;
      if(next === null) {
        if(newState.repeat) {
          newState.current = newState.head;
        } else {
          newState.isPlaying = false;
        }
      } else {
        newState.current = next.id;
      }
      return newState;
    } case PREV_SONG: {

      let prev = newState.nodes[newState.current].prev;
      if(prev === null) {
        newState.current = newState.tail;
      } else {
        newState.current = prev.id;
      }
      return newState;
    } case TOGGLE_REPEAT: {

      newState.repeat = !newState.repeat;
      return newState;
    }
    default:
      return state;
  };
};
