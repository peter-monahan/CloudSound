import { csrfFetch } from "./csrf";

const SET_COMMENTS = "display/SET_COMMENTS";
const RESET_COMMENTS = "display/RESET_COMMENTS";


export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
});

export const resetComments = () => ({
  type: RESET_COMMENTS
});

export const getSongComments = (songId) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs/${songId}/comments`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const comments = await response.json();

    dispatch(setComments(comments));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const updateComment = ({commentId, payload}) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();

    dispatch(getSongComments(data.comment.songId));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const createComment = ({songId, payload}) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs/${songId}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();

    dispatch(getSongComments(songId));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const deleteComment = ({commentId, songId}) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    });
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    // const data = await response.json();

    dispatch(getSongComments(songId));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}


const initialState = [];

export default function comments (state = initialState, action) {
  let newState = [...state];
  switch(action.type){
    case SET_COMMENTS:
      newState = action.comments;
      return newState;
      case RESET_COMMENTS:
        newState = [];
        return newState;
    default:
      return state;
  }
}
