import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail";
import { getSong } from "../../store/display";




import './SongPage.css';

function SongPage () {
  const dispatch = useDispatch();
  const {songId} = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const displaySong = useSelector(state => state.display.song);
  // const comments = useSelector(state => state.comments);

  const [owned, setOwned] = useState(false);
  const [details, setDetails] = useState([]);


  useEffect(() => {
    return () => dispatch(resetSong());
  }, []);

  useEffect(() => {
    dispatch(getSong(songId));
    // dispatch(getSongComments(songId));
  }, [songId]);

  useEffect(() => {

    if(sessionUser && displaySong && sessionUser.id === displaySong.userId) {
      setOwned(true);
    } else {
      setOwned(false);
    }
  }, [sessionUser, displaySong]);

  useEffect(() => {
    if(displaySong) {
      // setDetails([`Albums: ${displayUser.totalAlbums}`, `Songs: ${displayUser.totalSongs}`]);
    }
    return () => {
      setDetails([]);
    }
  }, [displaySong]);


  return (
    <div className="song-page">
      <div className="top-song-page">
      {displaySong && <ItemDetail title={displayUser.username} details={details} image={displayUser.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} />}
      {owned && <CreateEdit />}
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
