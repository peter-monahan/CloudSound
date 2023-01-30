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

export const togglePlayback = () => {
  return {
    type: TOGGLE_PLAYBACK,
  }
};

export const toggleRepeat = () => {
  return {
    type: TOGGLE_REPEAT,
  }
};

const initialState = {head: null, tail: null, current: null, nodes: {}, repeat: false, isPlaying: false, nextId: 0};

//music REDUCER
export default function reducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case ADD_SONG_TO_QUEUE: {

      let next = null;
      let prev = null;
      let newId = newState.nextId;
      newState.nextId++;
      if(newState.current === null) {
        newState.head = newId;
        newState.tail = newId;
        newState.current = newId;
      } else if(newState.current === newState.tail || action.position.toUpperCase() === "END") {
        prev = newState.tail;
        newState.nodes[newState.tail].next = newId;
        newState.tail = newId;
      } else {
        const curr = newState.nodes[newState.current];
        prev = curr.id;
        next = curr.next;
        curr.next = newId;
        newState.nodes[next].prev = newId;
      }
      if(action.position.toUpperCase() === "CURRENT") {
        newState.current = newId;
        newState.isPlaying = true;
      }
      newState.nodes[newId] = {song: action.song, id: newId, next, prev}

      return newState;
    } case ADD_LIST_TO_QUEUE: {
      if (action.songs.length === 0) return newState;

      let next = null;
      let prev = null;
      let newId = newState.nextId;
      newState.nextId++;
      if(newState.current === null) {
        newState.head = newId;
        newState.tail = newId;
        newState.current = newId;
      } else if(newState.current === newState.tail || action.position.toUpperCase() === "END") {
        prev = newState.tail;
        newState.nodes[newState.tail].next = newId;
        newState.tail = newId;
      } else {
        const curr = newState.nodes[newState.current];
        prev = curr.id;
        next = curr.next;
        curr.next = newId;
        newState.nodes[next].prev = newId;
      }
      if(action.position.toUpperCase() === "CURRENT") {
        newState.current = newId;
        newState.isPlaying = true;
      }
      newState.nodes[newId] = {song: action.songs[0], id: newId, next, prev}

      for(let i = 1; i < action.songs.length; i++) {
        // let next = null;
        prev = newId;
        newId = newState.nextId;
        newState.nextId++;

        if(prev === newState.tail || action.position.toUpperCase() === "END") {
          prev = newState.tail;
          newState.nodes[newState.tail].next = newId;
          newState.tail = newId;
        } else {
          const curr = newState.nodes[prev];
          // prev = curr.id;
          next = curr.next;
          curr.next = newId;
          newState.nodes[next].prev = newId;
        }
        newState.nodes[newId] = {song: action.songs[i], id: newId, next, prev}
      }

      return newState;
    } case REMOVE_FROM_QUEUE: {

      console.log(REMOVE_FROM_QUEUE + " <--------------------  NOT YET ADDED")
      return newState;
    } case CLEAR_QUEUE: {

      return {head: null, tail: null, current: null, nodes: {}, repeat: newState.repeat, isPlaying: false, nextId: 0};
    } case NEXT_SONG: {

      let next = newState.nodes[newState.current].next;
      if(next === null) {
        if(newState.repeat) {
          newState.current = newState.head;
        } else {
          newState.isPlaying = false;
        }
      } else {
        newState.current = next;
      }
      return newState;
    } case PREV_SONG: {

      let prev = newState.nodes[newState.current].prev;
      if(prev === null) {
        newState.current = newState.tail;
      } else {
        newState.current = prev;
      }
      return newState;
    } case TOGGLE_REPEAT: {

      newState.repeat = !newState.repeat;
      return newState;
    } case TOGGLE_PLAYBACK: {
      newState.isPlaying = !newState.isPlaying;
      return newState
    }
    default:
      return state;
  };
};
