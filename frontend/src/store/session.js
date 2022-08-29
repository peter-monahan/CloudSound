import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const setUser = ({id, firstName, lastName, email, token}) => ({
  type: SET_USER,
  user: {
    id,
    firstName,
    lastName,
    email,
    token
  }
});

export const removeUser = () => ({
  type: REMOVE_USER
});

export const loginUser = (payload) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/session`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
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

export const restoreUser = () => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch('/api/session');
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
  }
}

export const signupUser = (payload) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
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

export const logoutUser = () => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/session`, {
      method: 'DELETE',
    });
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    dispatch(removeUser());
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

const initialState = {user: null};

export default function session (state = initialState, action) {
  let newState = {...state};
  switch(action.type){
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return state;
  }
}
