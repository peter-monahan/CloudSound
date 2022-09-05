import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail";
import ItemEdit from "../ItemEdit";
import MiniShow from "../MiniShow/MiniShow";
import { getSong, resetSong } from "../../store/display";




import './SongPage.css';

function SongPage () {
  const dispatch = useDispatch();
  const {songId} = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const displaySong = useSelector(state => state.display.song);
  // const displayUser = useSelector(state => state.display.user);
  // const displayAlbum = useSelector(state => state.display.album);
  // const comments = useSelector(state => state.comments);

  const [owned, setOwned] = useState(false);
  const [details, setDetails] = useState([]);


  useEffect(() => {
    return () => dispatch(resetSong());
  }, []);

  useEffect(  () => {
    dispatch(getSong(songId));
  }, [songId]);

  useEffect(() => {
    if(sessionUser && displaySong && sessionUser.id === displaySong.userId) {
      setOwned(true);
    } else {
      setOwned(false);
    }
  }, [sessionUser, displaySong]);

  useEffect(() => {
    let tmpDetails = []
    if(displaySong && displaySong.Artist) {
      tmpDetails.push(<div className="song-detail">Artist: <MiniShow size="small" to={`/users/${displaySong.userId}`} title={displaySong.Artist.username} image={displaySong.Artist.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} /></div>);
      if (displaySong.albumId) {
        tmpDetails.push(<div className="song-detail">Album: <MiniShow size="small" to={`/albums/${displaySong.albumId}`} title={displaySong.Album.title} image={displaySong.Album.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} /></div>)
      }
      if(displaySong.description) {
        tmpDetails.push(<div className="song-detail">Description: <p>{displaySong.description}</p></div>)
      }
    }
    setDetails(tmpDetails);
    return () => {
      setDetails([]);
    }
  }, [displaySong]);


  return (
    <div className="song-page">
      <div className="top-song-page">
      {displaySong && <ItemDetail title={displaySong.title} details={details} image={displaySong.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} />}
      {owned && <ItemEdit itemName={'music'} to={`/songs/${songId}/edit`} />}
      </div>
      {/* <div className="song-comments">
        {comments.map(song => {
          return <MiniShow key={song.id} to={`/songs/${song.id}`} title={song.title} image={song.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'}/>
        })}
      </div> */}
    </div>
  );
}

export default SongPage;
