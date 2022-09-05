import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUser, resetUser } from "../../store/display";
import CreateEdit from "../CreateEdit";
import ItemDetail from "../ItemDetail";
import MiniShow from "../MiniShow/MiniShow";
import { getUserSongs } from "../../store/songs";
import { getUserAlbums } from "../../store/albums";

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
    return () => dispatch(resetUser());
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
        <div className="user-songs">
        {songs.map(song => {
          return <MiniShow key={song.id} to={`/songs/${song.id}`} title={song.title} image={song.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'}/>
        })}
        </div>
      </div>
      <div className="albums-area">
        <h3>Albums</h3>
        {albums.map(album => {
          return <MiniShow key={album.id} to={`/albums/${album.id}`} title={album.title} image={album.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'}/>
        })}
      </div>
    </div>
  );
}

export default UserPage;