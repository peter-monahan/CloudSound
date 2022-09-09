import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail";
import ItemEdit from "../ItemEdit";
import MiniShow from "../MiniShow";
// import { getAlbum, resetAlbum } from "../../store/display";




import './SongListPage.css';

function SongListPage ({type, getItem, resetItem, iconName}) {
  const dispatch = useDispatch();
  const {id} = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const displayItem = useSelector(state => state.display[type]);


  const [owned, setOwned] = useState(false);
  const [details, setDetails] = useState([]);


  useEffect(() => {
        return () => dispatch(resetItem());
  }, []);

  useEffect(  () => {
    dispatch(getItem(id));
  }, [id]);

  useEffect(() => {
    if(sessionUser && displayItem && sessionUser.id === displayItem.userId) {
      setOwned(true);
    } else {
      setOwned(false);
    }
  }, [sessionUser, displayItem]);

  useEffect(() => {
    let tmpDetails = []
    console.log(displayItem);
    if(displayItem && displayItem.Artist) {
    console.log(displayItem.Artist);

      tmpDetails.push(<div className="song-list-detail">Artist: <MiniShow size="small" to={`/users/${displayItem.userId}`} title={displayItem.Artist.username} image={displayItem.Artist.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} /></div>);

      if(displayItem.description) {
        tmpDetails.push(<div className="song-detail">Description: <p>{displayItem.description}</p></div>)
      }
    }
    setDetails(tmpDetails);
    return () => {
      setDetails([]);
    }
  }, [displayItem]);


  return (
    <div className="song-list-page">
      <div className="top-song-list-page">
      {displayItem && <ItemDetail title={displayItem.title} details={details} image={displayItem.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} />}
      {/* {owned && <ItemEdit itemName={iconName} to={`/${type}/${id}/edit`} />} */}
      </div>
      <div className="song-list-items">
        {displayItem && displayItem.Songs && displayItem.Songs.map((song, i) => {
          return (
            <div key={song.id} className="song-list-item">
             {i+1}: <MiniShow className={'user-song'} to={`/songs/${song.id}`} title={song.title} image={song.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'}/>
            </div>
          );
        })}
        </div>
    </div>
  );
}

export default SongListPage;
