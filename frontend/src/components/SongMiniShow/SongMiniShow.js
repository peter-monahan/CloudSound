import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSong } from '../../store/queue';
import './SongMiniShow.css';


function SongMiniShow ({song, size='medium'}) {
  const dispatch = useDispatch()

  return (
    <div className={`mini-show-${size}`} >

      <img src={song.previewImage} className={`mini-image-${size}`} onClick={() => dispatch(addSong(song, 'CURRENT'))}/>
      <div>
        <Link to={`/songs/${song.id}`}>
        <p>{song.title}</p>
        </Link>
        <button onClick={() => dispatch(addSong(song, 'END'))}>addToQueue</button>
        <button onClick={() => dispatch(addSong(song, 'NEXT'))}>PlayNext</button>

      </div>
    </div>
  );
}

export default SongMiniShow;
