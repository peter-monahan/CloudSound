import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setUser, getUser, resetUser } from "../../store/display";
import ItemDetail from "../ItemDetail";
import MiniShow from "../MiniShow/MiniShow";
import { getUserSongs } from "../../store/songs";

import './UserPage.css';

function UserPage ({isLoaded}) {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const displayUser = useSelector(state => state.display.user);
  const songs = useSelector(state => state.songs);

  const [owned, setOwned] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    dispatch(getUserSongs(userId))
  }, [userId])
  useEffect(() => {
    if(isLoaded) {
      if(sessionUser && sessionUser.id === Number(userId)) {
        dispatch(setUser(sessionUser));
        setOwned(true);
      } else {
        dispatch(getUser(userId));
      }
    }

    return () => {
      dispatch(resetUser());
      setOwned(false);
    }
  }, [sessionUser, userId, isLoaded]);

  useEffect(() => {
    if(isLoaded) {

      if(owned && displayUser) {
        setDetails([displayUser.email]);
      } else if (displayUser) {
        setDetails([`Albums: ${displayUser.totalAlbums}`, `Songs: ${displayUser.totalSongs}`])
      }
    }
      return () => {
      setDetails([]);
    }
  }, [displayUser]);


  return (
    <div className="user-page">
      {isLoaded && displayUser && <ItemDetail title={displayUser.username} details={details} image={displayUser.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} />}
      <div className="user-songs">
        {songs.map(song => {
          return <MiniShow title={song.title} image={song.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'}/>
        })}
      </div>
    </div>
  );
}

export default UserPage;
