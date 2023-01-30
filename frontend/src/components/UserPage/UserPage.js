import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUser, resetUser } from "../../store/display";
import CreateEdit from "../CreateEdit";
import ItemDetail from "../ItemDetail";
import MiniShow from "../MiniShow/MiniShow";
import SongMiniShow from "../SongMiniShow";
import AlbumMiniShow from "../AlbumMiniShow";
import { getUserSongs, resetSongs } from "../../store/songs";
import { getUserAlbums, resetAlbums } from "../../store/albums";

import './UserPage.css';

function UserPage ({isLoaded}) {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const displayUser = useSelector(state => state.display.user);
  const songs = useSelector(state => state.songs);
  const albums = useSelector(state => state.albums);

  const [owned, setOwned] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
      dispatch(resetSongs());
      dispatch(resetAlbums());
    }
  }, [])

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getUserSongs(userId));
    dispatch(getUserAlbums(userId));
  }, [userId]);

  useEffect(() => {

    if(sessionUser && sessionUser.id === Number(userId)) {
      setOwned(true);
    } else {
      setOwned(false);
    }



  }, [sessionUser, userId, displayUser]);

  useEffect(() => {
    if(displayUser) {
      setDetails([`Albums: ${displayUser.totalAlbums}`, `Songs: ${displayUser.totalSongs}`]);
    }
    return () => {
      setDetails([]);
    }
  }, [displayUser]);


  return (
    <div className="user-page">
      <div className="top-user-page">
      {displayUser && <ItemDetail title={displayUser.username} details={details} image={displayUser.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} />}
      {owned && <CreateEdit />}
      </div>
      <div className="songs-area">
        <h3>Songs</h3>
        <div className="user-display-items">
        {Object.values(songs).map(song => {
          return <SongMiniShow song={song} className={'user-song'} key={song.id} />
        })}
        </div>
      </div>
      <div className="albums-area">
        <h3>Albums</h3>
        <div className="user-display-items">
        {Object.values(albums).map(album => {
          return <AlbumMiniShow album={album} key={album.id} />
        })}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
