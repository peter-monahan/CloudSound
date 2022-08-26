import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const setUSer = ({id, firstName, lastName, email, token}) => ({
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

  const response = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if(response.ok) {
    const user = await response.json();
    dispatch(setUSer(user));
    return user;
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
