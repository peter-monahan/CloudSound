import { csrfFetch } from "./csrf";

const SET_SONGS = "display/SET_SONGS";
const RESET_SONGS = "display/RESET_SONGS";
const SET_SONG = "display/SET_SONG";

export const setSongs = (songs) => ({
  type: SET_SONGS,
  songs
});

export const setSong = (song) => ({
  type: SET_SONG,
  song
});

export const removeSong = (songId) => ({
  type: SET_SONG,
  songId
});


export const resetSongs = () => ({
  type: RESET_SONGS
});

export const createSong = ({albumId, payload}) => async (dispatch) => {
  let response;

  const { title, description, previewImage, audio } = payload;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("previewImage", previewImage);

  // for multiple files
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  // for single file
  if (audio) formData.append("audio", audio);

  // const res = await csrfFetch(`/api/users/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: formData,
  // });



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
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
    } catch (err) {
      response = err;
    }
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSong(data.song));
    return data.song;
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const editSong = ({songId, payload}) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs/${songId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSong(data.song));
    return data.song;
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const deleteSong = (songId) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs/${songId}`, {
      method: 'DELETE'
    });
  } catch (err) {
    response = err;
  }

  if(response.ok) {

    dispatch(removeSong());

  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const getSongs = () => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSongs(data));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const getSong = (songId) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/songs/${songId}`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSong(data));
    return data.song;
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

export const getUserSongs = (id) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/users/${id}/songs`);
  } catch (err) {
    response = err;
  }

  if(response.ok) {
    const data = await response.json();
    dispatch(setSongs(data));
  } else {
    const error = await response.json();
    console.error(error)
    return error;
  }
}

const initialState = {};

export default function songs (state = initialState, action) {
  let newState = {...state};
  switch(action.type){
    case SET_SONGS:
      newState = action.songs;
      return newState;
    case SET_SONG:
      newState[action.song.id] = action.song;
      return newState;
    case RESET_SONGS:
       newState = {};
      return newState;
    default:
      return state;
  }
}
