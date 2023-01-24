import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSong } from '../../store/queue';
import './SongMiniShow.css';


function SongMiniShow ({song, size='medium'}) {
  const dispatch = useDispatch()
  const [display1, setDisplay1] = useState(false);

  function handleClick(e) {
    setDisplay1(false);
  }

  useEffect(() => {
    if(display1) {
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }

  }, [display1])

  return (
  <div className='cloud'>
      {display1 && <div  className="message-options-container"><div  className="message-options"><button  onClick={() => dispatch(addSong(song, 'END'))}>Add to queue</button><button  onClick={() => dispatch(addSong(song, 'NEXT'))}>Play next</button></div></div>}
    <div className={`mini-show-song`} >

      <div className='song-img-title'>
        <img src={song.previewImage} className={`mini-image-${size}`} onClick={() => dispatch(addSong(song, 'CURRENT'))}/>
        <Link to={`/songs/${song.id}`}>
        <p>{song.title}</p>
        </Link>
      </div>
      <div className="message-settings-button"  onClick={() => setDisplay1(!display1)}>⋮</div>

    </div>
  </div>
  );
}

export default SongMiniShow;
