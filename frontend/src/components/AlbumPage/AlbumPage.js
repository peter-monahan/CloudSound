import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail";
import ItemEdit from "../ItemEdit";
import MiniShow from "../MiniShow";
// import { getAlbum, resetAlbum } from "../../store/display";
import { getAlbum } from "../../store/albums";




import './AlbumPage.css';
import SongMiniShow from "../SongMiniShow";

function AlbumPage ({type, iconName}) {
  const dispatch = useDispatch();
  const {id} = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const displayItem = useSelector(state => state[type][id]);


  const [owned, setOwned] = useState(false);
  const [details, setDetails] = useState([]);


  // useEffect(() => {
  //       return () => dispatch(resetItem());
  // }, []);

  useEffect(  () => {
    dispatch(getAlbum(id));
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
      <div className="item-detail">
          <div className='image-box'>
            <img src={displayItem?.previewImage} className='item-image'/>
          </div>
          <div className='item-details'>
            <h2>{displayItem?.title}</h2>
            <div>Album • <Link to={`/users/${displayItem?.userId}`}>{displayItem?.Artist?.username}</Link> • {'2023'}</div>
            <div className="song-description">{displayItem?.description}</div>
          </div>
        </div>
      {/* {displayItem && <ItemDetail title={displayItem.title} details={details} image={displayItem.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} />} */}
      {/* {owned && <ItemEdit itemName={iconName} to={`/${type}/${id}/edit`} />} */}
      </div>
      <div className="song-list-items">
        {displayItem && displayItem.Songs && displayItem.Songs.map((song, i) => {
          return (
            <div key={song.id} className="song-list-item">
             {i+1}: <SongMiniShow className={'user-song'} song={song}/>
            </div>
          );
        })}
        </div>
    </div>
  );
}

export default AlbumPage;
