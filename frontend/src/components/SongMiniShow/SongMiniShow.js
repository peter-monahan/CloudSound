import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSong } from '../../store/queue';
import './SongMiniShow.css';


function SongMiniShow ({song, size='medium'}) {
  const dispatch = useDispatch()

  return (
    <div className={`mini-show-${size}`} >

      <img src={song.previewImage} className={`mini-image-${size}`}/>
      <div>
        <Link to={`/songs/${song.id}`}>
        <p>{song.title}</p>
        </Link>
        <button onClick={() => dispatch(addSong(song, 'NEXT'))}>addToQueue</button>
      </div>
    </div>
  );
}

export default SongMiniShow;
