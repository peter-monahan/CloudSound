import MiniShow from "../MiniShow/MiniShow";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs, resetSongs } from "../../store/songs";
import { getAlbums, resetAlbums } from "../../store/albums";
import './SplashPage.css';
import { Link } from "react-router-dom";
import SongMiniShow from "../SongMiniShow";
import AlbumMiniShow from "../AlbumMiniShow";


function SplashPage ({isLoaded}) {
  const dispatch = useDispatch();

  const songs = useSelector(state => state.songs);
  const albums = useSelector(state => state.albums);
  const sessionUser = useSelector(state => state.session.user);

  // useEffect(() => {
  //   return () => {
  //     // dispatch(resetArtists());
  //     dispatch(resetSongs());
  //     dispatch(resetAlbums());
  //   }
  // }, [])

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getAlbums());
    // dispatch(getArtists());
  }, []);
  return (
    <div className="splash-page">
      {/* { isLoaded && ( (!sessionUser && <div className="welcome-message">
        <h2>Welcome to CloudSound!</h2>
        <p>For the best user experience and to post your own music please login <Link className="splash-link" to={'/login'}>here.</Link></p>
        <p>Not signed up yet? Go <Link className="splash-link" to={'/signup'}>here.</Link></p>
      </div>) || (sessionUser && <div className="welcome-message">
        <h2>Welcome to CloudSound!</h2>
        <p>To get started creating your own music go <Link className="splash-link" to={`/users/${sessionUser.id}`}>here.</Link></p>
      </div>) )} */}
        <div className="songs-area">
          <h3>Songs</h3>
          <div className="all-songs display-items">
          {Object.values(songs).map(song => {
            return <SongMiniShow className={'splash-song'} key={song.id} song={song}/>
          })}
          </div>
        </div>

        <div className="albums-area">
          <h3>Albums</h3>
          <div className="all-albums display-items">
          {Object.values(albums).map(album => {
            return <AlbumMiniShow className={'splash-album'} key={album.id} album={album}/>
          })}
          </div>
        </div>
    </div>
);
}

export default SplashPage;
